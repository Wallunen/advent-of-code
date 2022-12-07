import {Command} from 'cliffy/command/mod.ts';
import {clipboard} from 'https://deno.land/x/clippy@v0.2.0/platform/mod.ts';
import {writeAll} from 'std/streams/write_all.ts';

const {args, options} = await new Command()
	.name('new')
	.arguments('[day:string] [year:string]')
	.option('-c, --clipboard', '')
	.parse();

const day = (args[0] ?? new Date().getDate().toString()).padStart(2, '0');
const year = args[1] ?? new Date().getFullYear().toString();

const directory = `years/${year}/days/${day}`;

Deno.mkdirSync(directory, {recursive: true});

const encoder = new TextEncoder();
const promises: Array<Promise<unknown>> = [
	Promise.allSettled(
		[1, 2].map(part =>
			Deno.open(`${directory}/${part}.ts`, {
				write: true,
				createNew: true,
			}),
		),
	).then(([firstPart]) => {
		if (firstPart.status === 'fulfilled') {
			return writeAll(
				firstPart.value,
				encoder.encode("import getInput from '/get-input.ts';\n"),
			);
		}
	}),
];

if (options.clipboard) {
	promises.push(
		Deno.open(`${directory}/input.txt`, {
			write: true,
			createNew: true,
		}).then(async file =>
			writeAll(file, encoder.encode((await clipboard.read_text()) + '\n')),
		),
	);
}

await Promise.allSettled(promises);
