import getInput from '/get-input.ts';

type Packet = number | readonly number[];

const compare = (left: Packet, right: Packet): number => {
	if (left === right) {
		return 0;
	}

	const isLeftNumber = typeof left === 'number';
	const isRightNumber = typeof right === 'number';

	if (isLeftNumber && isRightNumber) {
		return left < right ? -1 : 1;
	}

	if (isLeftNumber) {
		return compare([left], right);
	}

	if (isRightNumber) {
		return compare(left, [right]);
	}

	const shorterLength = Math.min(left.length, right.length);

	for (let i = 0; i < shorterLength; ++i) {
		const comparison = compare(left[i], right[i]);

		if (comparison) {
			return comparison;
		}
	}

	return left.length - right.length;
};

const pairs = getInput(import.meta)
	.trimEnd()
	.split('\n\n');

let sumOfSortedIndices = 0;

for (const [i, pair] of pairs.entries()) {
	const [left, right] = pair
		.split('\n')
		.map(line => JSON.parse(line) as Packet);

	if (compare(left, right) < 0) {
		sumOfSortedIndices += i + 1;
	}
}

console.log(sumOfSortedIndices);
