import getInput from '/get-input.ts';

const grid = getInput(import.meta)
	.split('\n')
	.map(line => line.split('').map(height => Number.parseInt(height, 10)))
	.filter(({length}) => length);

let scenicScore = 0;

for (const [row, heights] of grid.entries()) {
	for (const [column, height] of heights.entries()) {
		const directions = [
			heights.slice(0, column).reverse(),
			heights.slice(column + 1),
			grid
				.slice(0, row)
				.reverse()
				.map(row => row[column]),
			grid.slice(row + 1).map(row => row[column]),
		];

		let score = 1;

		for (const direction of directions) {
			let count = 0;

			for (const tree of direction) {
				++count;

				if (tree >= height) {
					break;
				}
			}

			score *= count;
		}

		if (score > scenicScore) {
			scenicScore = score;
		}
	}
}

console.log(scenicScore);
