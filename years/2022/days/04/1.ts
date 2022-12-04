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

	const doesFirstContainSecond =
		firstStart <= secondStart && firstEnd >= secondEnd;

	const doesSecondContainFirst =
		secondStart <= firstStart && secondEnd >= firstEnd;

	if (doesFirstContainSecond || doesSecondContainFirst) {
		++overlapCount;
	}
}

console.log(overlapCount);
