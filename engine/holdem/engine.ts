import { DEALER_ACTIONS_TYPE } from './action.ts';
import type { HoldemOptionType } from './option.ts';
import { whichRound, type HoldemStateType } from './state.ts';

export function seatsWithActionAtStartOfRound(
	state: HoldemStateType,
): number[] {
	// Get which round of poker we are in
	const round: DEALER_ACTIONS_TYPE = whichRound(state);
	const idxRoundStart = state.actions.findIndex(
		(action) => action.type === round,
	);

	// Get all seats who haven't folded or gone all in yet
	let seats = [...Array(state.seats.length).keys()];
	state.actions.slice(0, idxRoundStart).forEach((action) => {
		if (action.type === 'fold' || ('isAllIn' in action && action.isAllIn)) {
			seats = seats.filter((seat) => seat !== action.seat);
		}
	});

	return seats;
}

export function next(state: HoldemStateType): HoldemOptionType[] {
	// Get which round of poker we are in
	let round: DEALER_ACTIONS_TYPE = whichRound(state);

	// Get all players who have a viable action at the start of this round

	// Get all actions that have happened this round

	// What are the actions this round before the current player?

	// What can the current player do against these actions?

	return [];
}
