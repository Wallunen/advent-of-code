import getInput from '/get-input.ts';

const calorieAmounts: number[] = [];

for (const inventory of getInput(import.meta).split('\n\n')) {
	let calories = 0;

	for (const food of inventory.split('\n')) {
		calories += Number.parseInt(food, 10);
	}

	calorieAmounts.push(calories);
}

let greatestAmount = -1;

for (const calorieAmount of calorieAmounts) {
	if (calorieAmount > greatestAmount) {
		greatestAmount = calorieAmount;
	}
}

console.log(greatestAmount);
