import getInput from '/get-input.ts';

const grid = getInput(import.meta)
	.split('\n')
	.map(line => line.split('').map(height => Number.parseInt(height, 10)))
	.filter(({length}) => length);

let visibleCount = 0;

for (const [row, heights] of grid.entries()) {
	for (const [column, height] of heights.entries()) {
		if (
			heights.slice(0, column).every(tree => tree < height) ||
			heights.slice(column + 1).every(tree => tree < height) ||
			grid.slice(0, row).every(trees => trees[column] < height) ||
			grid.slice(row + 1).every(trees => trees[column] < height)
		) {
			++visibleCount;
		}
	}
}

console.log(visibleCount);
