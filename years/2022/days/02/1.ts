import getInput from '/get-input.ts';

const decrypt = (character: string) => {
	if (['A', 'X'].includes(character)) {
		return 'rock';
	}

	if (['B', 'Y'].includes(character)) {
		return 'paper';
	}

	if (['C', 'Z'].includes(character)) {
		return 'scissors';
	}
};

let score = 0;

for (const line of getInput(import.meta).split('\n')) {
	const their = decrypt(line[0]);
	const mine = decrypt(line[2]);

	if (!their || !mine) {
		continue;
	}

	if (their === mine) {
		score += 3;
	}

	switch (mine) {
		case 'rock':
			score += 1;

			if (their === 'scissors') {
				score += 6;
			}

			break;
		case 'paper':
			score += 2;

			if (their === 'rock') {
				score += 6;
			}

			break;
		case 'scissors':
			score += 3;

			if (their === 'paper') {
				score += 6;
			}
	}
}

console.log(score);
