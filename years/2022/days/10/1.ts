import getInput from '/get-input.ts';

let register = 1;
let cycleCount = 0;
let sumOfSignalStrengths = 0;

const cycleThrough = (amount: number) => {
	for (let i = 0; i < amount; ++i) {
		++cycleCount;

		if ([20, 60, 100, 140, 180, 220].includes(cycleCount)) {
			sumOfSignalStrengths += register * cycleCount;
		}
	}
};

for (const line of getInput(import.meta).split('\n')) {
	if (line.startsWith('a')) {
		cycleThrough(2);
		register += Number.parseInt(line.slice(5), 10);
	} else {
		cycleThrough(1);
	}
}

console.log(sumOfSignalStrengths);
