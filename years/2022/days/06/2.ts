import getInput from '/get-input.ts';

const length = 14;
const input = getInput(import.meta);

let characterCount = 0;

for (let i = 0; i < input.length; ++i) {
	if (new Set(input.slice(i, i + length)).size === length) {
		characterCount = i + length;
		break;
	}
}

console.log(characterCount);
