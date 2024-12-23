import { arrToCards, strToCard } from '../../Card.ts';
import type { HoldemStateType } from '../state.ts';

export const sixSameStack: HoldemStateType = {
	seats: [
		{ startingStack: 200 },
		{ startingStack: 200 },
		{ startingStack: 200 },
		{ startingStack: 200 },
		{ startingStack: 200 },
		{ startingStack: 200 },
	],
	actions: [
		{ type: 'preflop' },
		{ type: 'blind', seat: 0, amount: 1, isAllIn: false },
		{ type: 'blind', seat: 1, amount: 2, isAllIn: false },
		{ type: 'bet', seat: 2, amount: 10, isAllIn: false },
		{ type: 'call', seat: 3, amount: 10, isAllIn: false },
		{ type: 'fold', seat: 4 },
		{ type: 'call', seat: 5, amount: 10, isAllIn: false },
		{ type: 'fold', seat: 0 },
		{ type: 'fold', seat: 1 },
		{ type: 'flop', cards: arrToCards(['As', 'Ks', 'Qs']) },
		{ type: 'check', seat: 2 },
		{ type: 'check', seat: 3 },
		{ type: 'check', seat: 5 },
		{ type: 'turn', card: strToCard('Js') },
		{ type: 'check', seat: 2 },
		{ type: 'check', seat: 3 },
		{ type: 'check', seat: 5 },
		{ type: 'river', card: strToCard('Ts') },
		{ type: 'check', seat: 2 },
		{ type: 'check', seat: 3 },
		{ type: 'check', seat: 5 },
	],
};
