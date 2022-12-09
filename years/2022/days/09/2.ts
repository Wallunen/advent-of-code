import getInput from '/get-input.ts';

const tailVisitedPositions = new Set<string>();
const knots = Array.from({length: 10}).map(() => ({
	verticalPosition: 0,
	horizontalPosition: 0,
}));

const head = knots[0];
const tail = knots[knots.length - 1];

for (const line of getInput(import.meta).split('\n')) {
	const moveAmount = Number.parseInt(line.slice(2), 10);

	for (let i = 0; i < moveAmount; ++i) {
		switch (line[0]) {
			case 'L':
				--head.horizontalPosition;
				break;
			case 'R':
				++head.horizontalPosition;
				break;
			case 'U':
				--head.verticalPosition;
				break;
			case 'D':
				++head.verticalPosition;
		}

		for (let j = 1; j < knots.length; ++j) {
			const knot = knots[j];
			const previous = knots[j - 1];

			const verticalDistance =
				previous.verticalPosition - knot.verticalPosition;

			const horizontalDistance =
				previous.horizontalPosition - knot.horizontalPosition;

			const absoluteVerticalDistance = Math.abs(verticalDistance);
			const absoluteHorizontalDistance = Math.abs(horizontalDistance);

			if (absoluteVerticalDistance > 1 || absoluteHorizontalDistance > 1) {
				knot.verticalPosition +=
					absoluteVerticalDistance === 2
						? verticalDistance / 2
						: verticalDistance;

				knot.horizontalPosition +=
					absoluteHorizontalDistance === 2
						? horizontalDistance / 2
						: horizontalDistance;
			}
		}

		tailVisitedPositions.add(
			`${tail.horizontalPosition}:${tail.verticalPosition}`,
		);
	}
}

console.log(tailVisitedPositions.size);
