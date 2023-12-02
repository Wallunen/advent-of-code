import getInput from '/get-input.ts';

let sumOfGameIds = 0;

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

	const gamesArePossible = games.every(
		game => game.red <= 12 && game.green <= 13 && game.blue <= 14,
	);

	if (gamesArePossible) {
		sumOfGameIds += Number.parseInt(line.slice(5, colonIndex), 10);
	}
}

console.log(sumOfGameIds);
