import getInput from '/get-input.ts';

const monkeys: Array<{
	items: number[];
	operator: string;
	operand: number;
	divisor: number;
	thenMonkey: number;
	elseMonkey: number;
	inspectionCount: number;
}> = [];

for (const section of getInput(import.meta).split('\n\n')) {
	const lines = section.split('\n');

	const items = lines[1]
		.slice(18)
		.split(',')
		.map(item => Number.parseInt(item, 10));

	const operator = lines[2][23];
	const [operand, divisor, thenMonkey, elseMonkey] = [
		lines[2].slice(25),
		lines[3].slice(21),
		lines[4].slice(29),
		lines[5].slice(30),
	].map(number => Number.parseInt(number, 10));

	monkeys.push({
		items,
		operator,
		operand,
		divisor,
		thenMonkey,
		elseMonkey,
		inspectionCount: 0,
	});
}

for (let i = 0; i < 20; ++i) {
	for (const monkey of monkeys) {
		monkey.inspectionCount += monkey.items.length;

		for (let worryLevel of monkey.items) {
			switch (monkey.operator) {
				case '+':
					worryLevel += monkey.operand || worryLevel;
					break;
				case '*':
					worryLevel *= monkey.operand || worryLevel;
			}

			worryLevel = Math.floor(worryLevel / 3);

			if (worryLevel % monkey.divisor === 0) {
				monkeys[monkey.thenMonkey].items.push(worryLevel);
			} else {
				monkeys[monkey.elseMonkey].items.push(worryLevel);
			}
		}

		monkey.items.length = 0;
	}
}

monkeys.sort((first, second) => second.inspectionCount - first.inspectionCount);

const monkeyBusinessLevel =
	monkeys[0].inspectionCount * monkeys[1].inspectionCount;

console.log(monkeyBusinessLevel);
