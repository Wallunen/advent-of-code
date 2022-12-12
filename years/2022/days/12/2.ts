import getInput from '/get-input.ts';

const directions = [
	[0, -1],
	[0, +1],
	[-1, 0],
	[+1, 0],
] as const;

let end: number[] = [];
const starts: number[][] = [];

const grid = getInput(import.meta)
	.split('\n')
	.map((line, i) =>
		line.split('').map((character, j) => {
			let elevation = 0;

			switch (character) {
				case 'a':
				case 'S':
					starts.push([i, j]);
					break;
				case 'E':
					end = [i, j];
					elevation = 25;
					break;
				default:
					elevation = character.codePointAt(0)! - 97;
			}

			return elevation;
		}),
	);

const seen: boolean[][] = [];
const queue = starts.map(start => ({
	stepCount: 0,
	position: start,
}));

while (queue[0].position[0] !== end[0] || queue[0].position[1] !== end[1]) {
	const {
		stepCount,
		position: [row, column],
	} = queue.shift()!;

	if (seen[row]?.at(column)) {
		continue;
	}

	for (const [rowAmount, columnAmount] of directions) {
		const directionColumn = grid[row + rowAmount]?.at(column + columnAmount);

		if (
			directionColumn &&
			directionColumn - 1 <= grid[row][column] &&
			!seen[row + rowAmount]?.at(column + columnAmount)
		) {
			queue.push({
				stepCount: stepCount + 1,
				position: [row + rowAmount, column + columnAmount],
			});
		}
	}

	seen[row] ??= [];
	seen[row][column] = true;
}

console.log(queue[0].stepCount);
