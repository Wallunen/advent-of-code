import getInput from '/get-input.ts';

const originalCounts = getInput(import.meta)
	.trimEnd()
	.split('\n')
	.map(line => {
		const [winningNumbers, cardNumbers] = line
			.slice(line.indexOf(': '))
			.split(' | ')
			.map(numbers =>
				numbers
					.split(' ')
					.filter(Boolean)
					.map(number => Number.parseInt(number, 10)),
			);

		let count = 0;

		for (const number of cardNumbers) {
			if (winningNumbers.includes(number)) {
				count += 1;
			}
		}

		return count;
	});

const totalCounts = Array.from<number>({length: originalCounts.length}).fill(1);

for (const [i, count] of originalCounts.entries()) {
	for (let j = i + 1; j <= i + count; ++j) {
		totalCounts[j] += totalCounts[i];
	}
}

const scratchcardCount = totalCounts.reduce((total, count) => total + count);

console.log(scratchcardCount);
