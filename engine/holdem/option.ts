import { z } from 'npm:zod';

export const PLAYER_OptionS = [
	'fold',
	'check',
	'call',
	'bet',
	'ante',
	'blind',
	'straddle',
] as const;

export const BetOptionSchema = z.object({
	type: z.literal('bet'),
	seat: z.number(),
	min: z.number(),
	max: z.number(),
});

export const CallOptionSchema = z.object({
	type: z.literal('call'),
	seat: z.number(),
	amount: z.number(),
	isAllIn: z.boolean().default(false),
});

export const FoldOptionSchema = z.object({
	type: z.literal('fold'),
	seat: z.number(),
});

export const CheckOptionSchema = z.object({
	type: z.literal('check'),
	seat: z.number(),
});

export const AnteOptionSchema = z.object({
	type: z.literal('ante'),
	seat: z.number(),
	amount: z.number(),
});

export const BlindOptionSchema = z.object({
	type: z.literal('blind'),
	seat: z.number(),
	min: z.number(),
	max: z.number(),
});

export const StraddleOptionSchema = z.object({
	type: z.literal('straddle'),
	seat: z.number(),
	min: z.number(),
	max: z.number(),
});

export const PlayerOptionSchema = z.discriminatedUnion('type', [
	BetOptionSchema,
	CallOptionSchema,
	FoldOptionSchema,
	CheckOptionSchema,
	AnteOptionSchema,
	BlindOptionSchema,
	StraddleOptionSchema,
]);

export type PlayerOptionType = z.infer<typeof PlayerOptionSchema>;

export const PreflopOptionSchema = z.object({
	type: z.literal('preflop'),
	numCards: z.literal(0),
});

export const FlopOptionSchema = z.object({
	type: z.literal('flop'),
	numCards: z.literal(3),
});

export const TurnOptionSchema = z.object({
	type: z.literal('turn'),
	numCards: z.literal(1),
});

export const RiverOptionSchema = z.object({
	type: z.literal('river'),
	numCards: z.literal(1),
});

export const ShowdownOptionSchema = z.object({
	type: z.literal('showdown'),
	numCards: z.literal(0),
});

export const DealerOptionSchema = z.discriminatedUnion('type', [
	PreflopOptionSchema,
	FlopOptionSchema,
	TurnOptionSchema,
	RiverOptionSchema,
	ShowdownOptionSchema,
]);

export type DealerOptionType = z.infer<typeof DealerOptionSchema>;

export const HoldemOptionSchema = z.discriminatedUnion('type', [
	...PlayerOptionSchema.options,
	...DealerOptionSchema.options,
]);

export type HoldemOptionType = z.infer<typeof HoldemOptionSchema>;
