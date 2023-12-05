import getInput from '/get-input.ts';

const pointCount = getInput(import.meta)
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

		return Math.floor(2 ** (count - 1));
	})
	.reduce((total, count) => total + count);

console.log(pointCount);
