import { assert } from 'jsr:@std/assert';
import { describe, it } from 'jsr:@std/testing/bdd';

import { HoldemStateSchema } from '../state.ts';
import { sixSameStack } from './premade_hands.ts';

describe('HoldemStateType', () => {
	const state = {
		seats: [
			{ startingStack: 100 },
			{ startingStack: 100 },
			{ startingStack: 100 },
			{ startingStack: 100 },
		],
		actions: [],
	};
	const result = HoldemStateSchema.safeParse(state);
	assert(result.success);
});

describe('Six Max Stuff', () => {
	const state = structuredClone(sixSameStack);
	it('should be a good schema', () => {
		const result = HoldemStateSchema.safeParse(state);
		assert(result.success);
	});
});
