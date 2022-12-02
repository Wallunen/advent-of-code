import getInput from '/get-input.ts';

const calorieAmounts: number[] = [];

for (const inventory of getInput(import.meta).split('\n\n')) {
	let calories = 0;

	for (const food of inventory.split('\n')) {
		calories += Number.parseInt(food, 10);
	}

	calorieAmounts.push(calories);
}

calorieAmounts.sort((first, second) => second - first);

const greatestAmounts = calorieAmounts
	.slice(0, 3)
	.reduce((total, calorieAmount) => total + calorieAmount);

console.log(greatestAmounts);
