import getInput from '/get-input.ts';

const stacks: string[][] = [];

for (const line of getInput(import.meta).split('\n')) {
	if (line.startsWith('m')) {
		const words = line.split(' ');

		let [amount, source, destination] = [1, 3, 5].map(index =>
			Number.parseInt(words[index], 10),
		);

		--source;
		--destination;

		const sourceStack = stacks[source];
		const crates = sourceStack.splice(sourceStack.length - amount, amount);

		stacks[destination].push(...crates);
	} else {
		const crates = line.split(/ {1,4}/).flatMap(crate => {
			const trimmed = crate.trim();
			return trimmed.startsWith('[') ? [trimmed[1]] : [undefined];
		});

		for (const [i, crate] of crates.entries()) {
			if (!crate) {
				continue;
			}

			const previous = stacks[i] ?? [];
			stacks[i] = [crate, ...previous];
		}
	}
}

const topCrates = stacks.map(stack => stack[stack.length - 1]).join('');

console.log(topCrates);
