import getInput from '/get-input.ts';

let characters = '';
let characterCount = 0;

for (const character of getInput(import.meta)) {
	++characterCount;

	if (characters.includes(character)) {
		characters = character;
	} else {
		characters += character;

		if (characters.length === 4) {
			break;
		}
	}
}

console.log(characterCount);
