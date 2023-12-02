import getInput from '/get-input.ts';

let sumOfSetPowers = 0;

for (const line of getInput(import.meta).split('\n')) {
	if (!line) {
		continue;
	}

	const colonIndex = line.indexOf(':');

	const games = line
		.slice(colonIndex + 1)
		.split(';')
		.map(set => {
			const counts = {
				red: 0,
				blue: 0,
				green: 0,
			};

			for (const subset of set.split(',')) {
				const [amount, color] = subset.trimStart().split(' ');
				counts[color as keyof typeof counts] += Number.parseInt(amount, 10);
			}

			return counts;
		});

	const greatestCounts = {
		red: 0,
		blue: 0,
		green: 0,
	};

	for (const game of games) {
		if (game.red > greatestCounts.red) {
			greatestCounts.red = game.red;
		}

		if (game.green > greatestCounts.green) {
			greatestCounts.green = game.green;
		}

		if (game.blue > greatestCounts.blue) {
			greatestCounts.blue = game.blue;
		}
	}

	sumOfSetPowers +=
		greatestCounts.red * greatestCounts.green * greatestCounts.blue;
}

console.log(sumOfSetPowers);
