import { expect } from 'jsr:@std/expect';
import { describe, it } from 'jsr:@std/testing/bdd';
import { arrToCards, strToCard } from '../../Card.ts';
import {
	type HoldemActionType,
	isDealerAction,
	isPlayerAction,
} from '../action.ts';

describe('isActions', () => {
	const preflopDealerAction: HoldemActionType = { type: 'preflop' };
	const flopDealerAction: HoldemActionType = {
		type: 'flop',
		cards: arrToCards(['As', 'Ks', 'Qs']),
	};
	const turnDealerAction: HoldemActionType = {
		type: 'turn',
		card: strToCard('Js'),
	};
	const rivberDealerAction: HoldemActionType = {
		type: 'river',
		card: strToCard('Ts'),
	};
	const showdownDealerAction: HoldemActionType = { type: 'showdown' };
	const betPlayerAction: HoldemActionType = {
		type: 'bet',
		seat: 2,
		amount: 10,
		isAllIn: false,
	};
	const antePlayerAction: HoldemActionType = {
		type: 'ante',
		seat: 2,
		amount: 10,
	};
	const foldPlayerAction: HoldemActionType = {
		type: 'fold',
		seat: 2,
	};
	const checkPlayerAction: HoldemActionType = {
		type: 'check',
		seat: 2,
	};
	const callPlayerAction: HoldemActionType = {
		type: 'call',
		seat: 2,
		amount: 10,
		isAllIn: false,
	};

	it('isDealerAction', () => {
		expect(isDealerAction(preflopDealerAction)).toBe(true);
		expect(isDealerAction(flopDealerAction)).toBe(true);
		expect(isDealerAction(turnDealerAction)).toBe(true);
		expect(isDealerAction(rivberDealerAction)).toBe(true);
		expect(isDealerAction(showdownDealerAction)).toBe(true);
		expect(isDealerAction(betPlayerAction)).toBe(false);
		expect(isDealerAction(antePlayerAction)).toBe(false);
		expect(isDealerAction(foldPlayerAction)).toBe(false);
		expect(isDealerAction(checkPlayerAction)).toBe(false);
		expect(isDealerAction(callPlayerAction)).toBe(false);
	});
	it('isPlayerAction', () => {
		expect(isPlayerAction(preflopDealerAction)).toBe(false);
		expect(isPlayerAction(flopDealerAction)).toBe(false);
		expect(isPlayerAction(turnDealerAction)).toBe(false);
		expect(isPlayerAction(rivberDealerAction)).toBe(false);
		expect(isPlayerAction(showdownDealerAction)).toBe(false);
		expect(isPlayerAction(betPlayerAction)).toBe(true);
		expect(isPlayerAction(antePlayerAction)).toBe(true);
		expect(isPlayerAction(foldPlayerAction)).toBe(true);
		expect(isPlayerAction(checkPlayerAction)).toBe(true);
		expect(isPlayerAction(callPlayerAction)).toBe(true);
	});
});
