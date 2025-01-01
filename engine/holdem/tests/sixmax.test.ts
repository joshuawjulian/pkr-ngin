import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import { arrToCards, strToCard } from '../../Card.ts';
import { next, seatsWithActionAtStartOfRound } from '../engine.ts';
import { HoldemOptionType } from '../option.ts';
import {
	HoldemStateSchema,
	type HoldemStateType,
	stateAtIndex,
	whichRound,
} from '../state.ts';

describe('Six Max Testing', () => {
	const state: HoldemStateType = {
		seats: [
			{ startingStack: 200 },
			{ startingStack: 200 },
			{ startingStack: 200 },
			{ startingStack: 200 },
			{ startingStack: 200 },
			{ startingStack: 200 },
		],
		actions: [
			{ type: 'preflop' }, //0
			{ type: 'blind', seat: 0, amount: 1, isAllIn: false }, //1
			{ type: 'blind', seat: 1, amount: 2, isAllIn: false }, //2
			{ type: 'bet', seat: 2, amount: 10, isAllIn: false }, //3
			{ type: 'call', seat: 3, amount: 10, isAllIn: false }, //4
			{ type: 'fold', seat: 4 }, //5
			{ type: 'call', seat: 5, amount: 10, isAllIn: false }, //6
			{ type: 'fold', seat: 0 }, //7
			{ type: 'fold', seat: 1 }, //8
			{ type: 'flop', cards: arrToCards(['As', 'Ks', 'Qs']) }, //9
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
	it('should be a good schema', () => {
		const result = HoldemStateSchema.safeParse(state);
		expect(result.success).toBe(true);
	});

	it('at no actions, it should suggest preflop only', () => {
		const newState = stateAtIndex(state, 0);
		const options = next(newState);
		expect(options).toEqual([{ type: 'preflop', numCards: 0 }]);
	});

	describe('preflop', () => {
		it('Seats with action', () => {
			const seatsWithAction = seatsWithActionAtStartOfRound(
				stateAtIndex(state, 0),
			);
			expect(seatsWithAction).toEqual([0, 1, 2, 3, 4, 5]);
		});
		it('No actions', () => {
			const newState = stateAtIndex(state, 1);
			const options: HoldemOptionType[] = next(newState);
			expect(options).toEqual([
				{ type: 'check', seat: 0 },
				{ type: 'blind', seat: 0, min: 1, max: 200 },
				{ type: 'bet', seat: 0, min: 1, max: 200 },
				{ type: 'fold', seat: 0 },
			]);
		});

		it('One blind', () => {
			const newState = stateAtIndex(state, 2);
			const options: HoldemOptionType[] = next(newState);
			expect(options).toEqual([
				{ type: 'check', seat: 1 },
				{ type: 'blind', seat: 1, min: 2, max: 200 },
				{ type: 'bet', seat: 1, min: 2, max: 200 },
				{ type: 'fold', seat: 1 },
			]);
		});

		it('Two blinds', () => {
			const newState = stateAtIndex(state, 3);
			const options: HoldemOptionType[] = next(newState);
			expect(options).toEqual([
				{ type: 'check', seat: 2 },
				{ type: 'blind', seat: 1, min: 4, max: 200 },
				{ type: 'bet', seat: 2, min: 4, max: 200 },
				{ type: 'fold', seat: 2 },
			]);
		});
	});

	describe('flop', () => {
		it('Should offer flop', () => {
			const newState = stateAtIndex(state, 8);
			const options = next(newState);
			expect(options).toEqual([{ type: 'flop', numCards: 3 }]);
		});

		it('Should say flop', () => {
			const newState = stateAtIndex(state, 9);
			const round = whichRound(newState);
			expect(round).toEqual('flop');
		});

		it('Seats with action', () => {
			const newState = stateAtIndex(state, 9);
			const seatsWithAction = seatsWithActionAtStartOfRound(newState);
			expect(seatsWithAction).toEqual([2, 3, 5]);
		});
	});
});
