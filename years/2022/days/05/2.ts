import getInput from '/get-input.ts';

const stacks: string[][] = [];

for (const line of getInput(import.meta).split('\n')) {
	if (line.startsWith('m')) {
		const words = line.split(' ');

		const [amount, source, destination] = [1, 3, 5].map(index =>
			Number.parseInt(words[index], 10),
		);

		const sourceStack = stacks[source - 1];
		const crates = sourceStack.splice(sourceStack.length - amount, amount);

		stacks[destination - 1].push(...crates);
	} else {
		const crates = line.split(/ {1,4}/).map(crate => crate[1]);

		for (const [i, crate] of crates.entries()) {
			if (!crate) {
				continue;
			}

			stacks[i] ??= [];
			stacks[i].unshift(crate);
		}
	}
}

const topCrates = stacks.map(stack => stack[stack.length - 1]).join('');

console.log(topCrates);
