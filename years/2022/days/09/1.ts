import getInput from '/get-input.ts';

let headVerticalPosition = 0;
let tailVerticalPosition = 0;
let headHorizontalPosition = 0;
let tailHorizontalPosition = 0;
const tailVisitedPositions = new Set<string>();

for (const line of getInput(import.meta).split('\n')) {
	const moveAmount = Number.parseInt(line.slice(2), 10);

	for (let i = 0; i < moveAmount; ++i) {
		switch (line[0]) {
			case 'L':
				--headHorizontalPosition;
				break;
			case 'R':
				++headHorizontalPosition;
				break;
			case 'U':
				--headVerticalPosition;
				break;
			case 'D':
				++headVerticalPosition;
		}

		const verticalDistance = headVerticalPosition - tailVerticalPosition;
		const horizontalDistance = headHorizontalPosition - tailHorizontalPosition;

		const absoluteVerticalDistance = Math.abs(verticalDistance);
		const absoluteHorizontalDistance = Math.abs(horizontalDistance);

		if (absoluteVerticalDistance > 1 || absoluteHorizontalDistance > 1) {
			tailVerticalPosition +=
				absoluteVerticalDistance === 2
					? verticalDistance / 2
					: verticalDistance;

			tailHorizontalPosition +=
				absoluteHorizontalDistance === 2
					? horizontalDistance / 2
					: horizontalDistance;
		}

		tailVisitedPositions.add(
			`${tailHorizontalPosition}:${tailVerticalPosition}`,
		);
	}
}

console.log(tailVisitedPositions.size);
