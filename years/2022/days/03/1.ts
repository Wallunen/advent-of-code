import getInput from '/get-input.ts';

let sumOfPriorities = 0;

for (const line of getInput(import.meta).split('\n')) {
	const halfway = line.length / 2;

	const firstHalf = line.slice(0, halfway).split('');
	const secondHalf = new Set(line.slice(halfway));

	const codePoint = firstHalf
		.find(character => secondHalf.has(character))
		?.codePointAt(0);

	if (codePoint) {
		sumOfPriorities += codePoint < 91 ? codePoint - 38 : codePoint - 96;
	}
}

console.log(sumOfPriorities);
