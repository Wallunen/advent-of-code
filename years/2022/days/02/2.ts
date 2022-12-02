import getInput from '/get-input.ts';

const decryptShape = (character: string) => {
	switch (character) {
		case 'A':
			return 'rock';
		case 'B':
			return 'paper';
		case 'C':
			return 'scissors';
	}
};

const decryptOutcome = (character: string) => {
	switch (character) {
		case 'X':
			return 'lose';
		case 'Y':
			return 'draw';
		case 'Z':
			return 'win';
	}
};

let score = 0;

for (const line of getInput(import.meta).split('\n')) {
	const their = decryptShape(line[0]);
	const mine = decryptOutcome(line[2]);

	if (!their || !mine) {
		continue;
	}

	switch (mine) {
		case 'lose':
			switch (their) {
				case 'rock':
					score += 3;
					break;
				case 'paper':
					score += 1;
					break;
				case 'scissors':
					score += 2;
			}

			break;
		case 'draw':
			score += 3;

			switch (their) {
				case 'rock':
					score += 1;
					break;
				case 'paper':
					score += 2;
					break;
				case 'scissors':
					score += 3;
			}

			break;
		case 'win':
			score += 6;

			switch (their) {
				case 'rock':
					score += 2;
					break;
				case 'paper':
					score += 3;
					break;
				case 'scissors':
					score += 1;
			}
	}
}

console.log(score);
