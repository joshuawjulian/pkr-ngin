import { assert } from 'jsr:@std/assert';
import { describe, it } from "jsr:@std/testing/bdd";

import { HoldemStateSchema } from '../state.ts';
import { sixSameStack } from './premade_hands.ts'

Deno.test('HoldemStateType', () => {
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

Deno.test('Six Max Stuff', () => {
	const state = structuredClone(sixSameStack);

	Deno.test('test inside', () => {
		const result = HoldemStateSchema.safeParse(state);
		assert(result.success);
	});

	Deno.test('test inside 2', () => {
		const result = HoldemStateSchema.safeParse(state);
		assert(!result.success);
	});

	assert(false);
})
