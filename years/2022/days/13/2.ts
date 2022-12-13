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

const packets = [
	[[2]],
	[[6]],
	...getInput(import.meta)
		.split('\n')
		.filter(Boolean)
		.map(line => JSON.parse(line)),
] as Packet[];

const dividers = new Set(
	packets.slice(0, 2).map(packet => JSON.stringify(packet)),
);

packets.sort(compare);

let decoderKey = 1;

for (const [i, packet] of packets.entries()) {
	if (dividers.has(JSON.stringify(packet))) {
		decoderKey *= i + 1;
	}
}

console.log(decoderKey);
