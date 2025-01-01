import { z } from 'npm:zod';
import { CardSchema } from '../Card.ts';

export const PLAYER_ACTIONS = [
	'fold',
	'check',
	'call',
	'bet',
	'ante',
	'blind',
	'straddle',
] as const;

export const BetActionSchema = z.object({
	type: z.literal('bet'),
	seat: z.number(),
	amount: z.number(),
	isAllIn: z.boolean().default(false),
});

export const CallActionSchema = z.object({
	type: z.literal('call'),
	seat: z.number(),
	amount: z.number(),
	isAllIn: z.boolean().default(false),
});

export const FoldActionSchema = z.object({
	type: z.literal('fold'),
	seat: z.number(),
});

export const CheckActionSchema = z.object({
	type: z.literal('check'),
	seat: z.number(),
});

export const AnteActionSchema = z.object({
	type: z.literal('ante'),
	seat: z.number(),
	amount: z.number(),
});

export const BlindActionSchema = z.object({
	type: z.literal('blind'),
	seat: z.number(),
	amount: z.number(),
	isAllIn: z.boolean().default(false),
});

export const StraddleActionSchema = z.object({
	type: z.literal('straddle'),
	seat: z.number(),
	amount: z.number(),
	isAllIn: z.boolean().default(false),
});

export const PlayerActionSchema = z.discriminatedUnion('type', [
	BetActionSchema,
	CallActionSchema,
	FoldActionSchema,
	CheckActionSchema,
	AnteActionSchema,
	BlindActionSchema,
	StraddleActionSchema,
]);

export type PlayerActionType = z.infer<typeof PlayerActionSchema>;

export const DEALER_ACTIONS = [
	'preflop',
	'flop',
	'turn',
	'river',
	'showdown',
] as const;

export type DEALER_ACTIONS_TYPE = (typeof DEALER_ACTIONS)[number];

export const PreflopActionSchema = z.object({
	type: z.literal('preflop'),
});

export const FlopActionSchema = z.object({
	type: z.literal('flop'),
	cards: z.array(CardSchema),
});

export const TurnActionSchema = z.object({
	type: z.literal('turn'),
	card: CardSchema,
});

export const RiverActionSchema = z.object({
	type: z.literal('river'),
	card: CardSchema,
});

export const ShowdownActionSchema = z.object({
	type: z.literal('showdown'),
});

export const DealerActionSchema = z.discriminatedUnion('type', [
	PreflopActionSchema,
	FlopActionSchema,
	TurnActionSchema,
	RiverActionSchema,
	ShowdownActionSchema,
]);

export type DealerActionType = z.infer<typeof DealerActionSchema>;

export const HoldemActionSchema = z.discriminatedUnion('type', [
	...PlayerActionSchema.options,
	...DealerActionSchema.options,
]);

export type HoldemActionType = z.infer<typeof HoldemActionSchema>;

// HELPER FUNCTIONS

export function isDealerAction(
	action: HoldemActionType,
): action is DealerActionType {
	const result = DealerActionSchema.safeParse(action);
	return result.success;
}

export function isPlayerAction(
	action: HoldemActionType,
): action is PlayerActionType {
	const result = PlayerActionSchema.safeParse(action);
	return result.success;
}

export function nextPokerRound(
	currentRound: DEALER_ACTIONS_TYPE,
): DEALER_ACTIONS_TYPE {
	if (currentRound === 'showdown') return currentRound;
	const roundIndex = DEALER_ACTIONS.indexOf(currentRound);
	return DEALER_ACTIONS[roundIndex + 1];
}
