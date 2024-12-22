import { z } from 'npm:zod';

export const SUITS = ['h', 'd', 'c', 's', 'x'] as const;
export const SuitSchema = z.enum(SUITS);
export type SuitType = z.infer<typeof SuitSchema>;

export const RANKS = [
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'T',
	'J',
	'Q',
	'K',
	'A',
	'X',
] as const;
export const RankSchema = z.enum(RANKS);
export type RankType = z.infer<typeof RankSchema>;

export const CardSchema = z.object({
	rank: RankSchema,
	suit: SuitSchema,
});
export type CardType = z.infer<typeof CardSchema>;

export function strToCard(str: string): CardType {
	const suit = str[1];
	const rank = str[0];
	const parsed = CardSchema.safeParse({ suit, rank });
	if (!parsed.success) return { rank: 'X', suit: 'x' };
	return parsed.data;
}

export function arrToCards(arr: string[]): CardType[] {
	const cards: CardType[] = arr.reduce<CardType[]>((acc, card) => {
		acc.push(strToCard(card));
		return acc;
	}, new Array<CardType>());
	return cards;
}
