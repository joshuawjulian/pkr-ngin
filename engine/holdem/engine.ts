import { DEALER_ACTIONS_TYPE } from './action.ts';
import type { HoldemOptionType } from './option.ts';
import { whichRound, type HoldemStateType } from './state.ts';

export function next(state: HoldemStateType): HoldemOptionType[] {
	// Get which round of poker we are in
	let round: DEALER_ACTIONS_TYPE = whichRound(state);

	// Get all players who have a viable action at the start of this round

	// Get all actions that have happened this round

	// What are the actions this round before the current player?

	// What can the current player do against these actions?

	return [];
}
