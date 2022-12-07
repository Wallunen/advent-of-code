import getInput from '/get-input.ts';

let isOutput = false;
const currentPath: string[] = [];
const directorySizes = new Map<string, number>();

for (const line of getInput(import.meta).split('\n')) {
	if (line.startsWith('$ c')) {
		isOutput = false;

		const directory = line.slice(5);

		switch (directory) {
			case '/':
				currentPath.length = 0;
				break;
			case '..':
				--currentPath.length;
				break;
			default:
				currentPath.push(directory);
		}
	} else if (line.startsWith('$ l')) {
		isOutput = true;
	} else if (isOutput) {
		const fileSize = line.slice(0, line.indexOf(' '));

		if (!fileSize || fileSize === 'dir') {
			continue;
		}

		const parsedSize = Number.parseInt(fileSize, 10);

		for (let i = 0; i <= currentPath.length; ++i) {
			const joinedPath = currentPath.slice(0, i).join('/');
			const previousSize = directorySizes.get(joinedPath) ?? 0;

			directorySizes.set(joinedPath, previousSize + parsedSize);
		}
	}
}

let deletableDirectorySize = Number.POSITIVE_INFINITY;
const requiredSpace = 30_000_000 - (70_000_000 - (directorySizes.get('') ?? 0));

for (const directorySize of directorySizes.values()) {
	if (
		directorySize >= requiredSpace &&
		directorySize < deletableDirectorySize
	) {
		deletableDirectorySize = directorySize;
	}
}

console.log(deletableDirectorySize);
