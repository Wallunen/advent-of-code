import getInput from '/get-input.ts';

let image = '';
let register = 1;
let pixelCount = 0;

const cycleThrough = (amount: number) => {
	for (let i = 0; i < amount; ++i) {
		image += [pixelCount - 1, pixelCount, pixelCount + 1].includes(register)
			? '#'
			: '.';

		if (++pixelCount === 40) {
			image += '\n';
			pixelCount = 0;
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

console.log(image);
