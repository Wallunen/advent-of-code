import getInput from '/get-input.ts';

let overlapCount = 0;

for (const line of getInput(import.meta).split('\n')) {
	const numbers = line.split(/-|,/);

	if (numbers.length !== 4) {
		continue;
	}

	const [firstStart, firstEnd, secondStart, secondEnd] = numbers.map(number =>
		Number.parseInt(number, 10),
	);

	const doesStartOverlap = firstStart <= secondEnd && firstEnd >= secondEnd;
	const doesEndOverlap = firstEnd >= secondStart && firstEnd <= secondEnd;

	if (doesStartOverlap || doesEndOverlap) {
		++overlapCount;
	}
}

console.log(overlapCount);
