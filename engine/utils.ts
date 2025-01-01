// move index 0 to the end of the array
export function cycleArray<T>(arr: T[]): T[] {
	if (arr.length === 0) return [];
	if (arr.length === 1) return arr;
	const [first, ...rest] = arr;
	return [...rest, first];
}
