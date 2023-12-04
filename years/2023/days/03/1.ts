import getInput from '/get-input.ts';

type Token = {
	line: number;
	text: string;
	range: [number, number];
	kind: 'number' | 'symbol';
};

const tokensAreAdjacent = (first: Token, second: Token) =>
	first.range[0] + 1 >= second.range[0] &&
	first.range[1] - 1 <= second.range[1];

const lines = getInput(import.meta)
	.trimEnd()
	.split('\n')
	.map((line, i) => {
		const tokens: Token[] = [];
		let token: Token | undefined = undefined;

		for (const [j, character] of line.split('').entries()) {
			if (token) {
				if (/\d/.test(character)) {
					token.range[1] += 1;
					token.text += character;
					continue;
				}

				tokens.push(token);
				token = undefined;
			}

			if (character !== '.') {
				const kind = /\d/.test(character) ? 'number' : 'symbol';

				token = {
					kind,
					line: i,
					text: character,
					range: [j, j + 1],
				};

				if (kind === 'symbol') {
					tokens.push(token);
					token = undefined;
				}
			}
		}

		if (token) {
			tokens.push(token);
		}

		return tokens;
	});

let sumOfPartNumbers = 0;

for (const [i, line] of lines.entries()) {
	for (const token of line) {
		if (token.kind !== 'number') {
			continue;
		}

		if (
			line.some(t => t !== token && tokensAreAdjacent(t, token)) ||
			lines[i - 1]?.some(t => tokensAreAdjacent(t, token)) ||
			lines[i + 1]?.some(t => tokensAreAdjacent(t, token))
		) {
			sumOfPartNumbers += Number.parseInt(token.text, 10);
		}
	}
}

console.log(sumOfPartNumbers);
