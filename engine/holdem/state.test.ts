import { assert } from 'jsr:@std/assert';

import { HoldemStateSchema } from './state.ts';

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
