import getInput from '/get-input.ts';

let sumOfPriorities = 0;
const lines = getInput(import.meta).split('\n');

for (let i = 0; i < lines.length; i += 3) {
	const firstRucksack = lines[i].split('');
	const otherRucksacks = [new Set(lines[i + 1]), new Set(lines[i + 2])];

	const codePoint = firstRucksack
		.find(character =>
			otherRucksacks.every(rucksack => rucksack.has(character)),
		)
		?.codePointAt(0);

	if (codePoint) {
		sumOfPriorities += codePoint < 91 ? codePoint - 38 : codePoint - 96;
	}
}

console.log(sumOfPriorities);
