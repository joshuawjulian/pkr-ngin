import { z } from 'npm:zod';
import {
	type DEALER_ACTIONS_TYPE,
	type DealerActionType,
	HoldemActionSchema,
	isDealerAction,
	isPlayerAction,
	nextPokerRound,
	type PlayerActionType,
} from './action.ts';

export const SeatSchema = z.object({
	startingStack: z.number().min(0),
});

/**
 * seats: array of seats, seat number is the array index
 */
export const HoldemStateSchema = z.object({
	seats: z.array(SeatSchema),
	actions: z.array(HoldemActionSchema),
});

export type HoldemStateType = z.infer<typeof HoldemStateSchema>;

// HELPER FUNCTIONS

export function jsonToState(jsonStr: string): HoldemStateType {
	const parsed = HoldemStateSchema.safeParse(JSON.parse(jsonStr));
	if (!parsed.success) return { seats: [], actions: [] };
	return parsed.data;
}

export function stateToJson(state: HoldemStateType): string {
	return JSON.stringify(state);
}

export function cloneState(state: HoldemStateType): HoldemStateType {
	return JSON.parse(stateToJson(state));
}

export function cloneStateToIndex(
	state: HoldemStateType,
	index: number,
): HoldemStateType {
	const newState = cloneState(state);
	newState.actions = newState.actions.slice(0, index);
	return newState;
}

// returns the last dealer action or null if there isnt one
export function lastDealerAction(
	state: HoldemStateType,
): DealerActionType | null {
	for (let i = state.actions.length - 1; i >= 0; i--) {
		const currAction = state.actions[i];
		if (isDealerAction(currAction)) return currAction;
	}

	return null;
}

export function whichRound(state: HoldemStateType): DEALER_ACTIONS_TYPE {
	const lastAction = lastDealerAction(state);
	if (lastAction === null) return 'preflop';
	return lastAction.type;
}

export function playersWithActionAtStartOfRound(
	state: HoldemStateType,
	round: DEALER_ACTIONS_TYPE,
) {
	// Get all players who have a viable action at the start of this round
}

export function getIndexForRound(
	state: HoldemStateType,
	round: DEALER_ACTIONS_TYPE,
): number {
	return state.actions.findIndex((action) => {
		return action.type === round;
	});
}

export function actionsForRound(
	state: HoldemStateType,
	round: DEALER_ACTIONS_TYPE,
): PlayerActionType[] {
	// Get all actions that have happened this round
	const actions: PlayerActionType[] = [];
	let startIdx = getIndexForRound(state, round);
	if (startIdx === -1) return actions;
	startIdx++; // To move past the dealer action
	let endIdx = getIndexForRound(state, nextPokerRound(round));
	if (endIdx === -1) {
		endIdx = state.actions.length;
	}
	for (let i = startIdx; i < endIdx; i++) {
		const action = state.actions[i];
		if (isPlayerAction(action)) actions.push(action);
	}
	return actions;
}
