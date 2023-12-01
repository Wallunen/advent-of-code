import getInput from '/get-input.ts';

const words = [
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
];

let sumOfCalibrationValues = 0;

for (const line of getInput(import.meta).split('\n')) {
	if (!line) {
		continue;
	}

	const digits: string[] = [];

	for (const [i, character] of line.split('').entries()) {
		if (/\d/.test(character)) {
			digits.push(character);
			continue;
		}

		for (const [j, word] of words.entries()) {
			if (line.slice(i).startsWith(word)) {
				digits.push(String(j + 1));
			}
		}
	}

	sumOfCalibrationValues += Number.parseInt(digits[0] + digits.at(-1)!, 10);
}

console.log(sumOfCalibrationValues);
