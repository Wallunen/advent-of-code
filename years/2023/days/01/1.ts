import getInput from '/get-input.ts';

let sumOfCalibrationValues = 0;

for (const line of getInput(import.meta).split('\n')) {
	const matches = line.match(/\d/g);

	if (matches) {
		sumOfCalibrationValues += Number.parseInt(matches[0] + matches.at(-1)!, 10);
	}
}

console.log(sumOfCalibrationValues);
