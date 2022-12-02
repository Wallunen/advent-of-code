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

const promises = [1, 2].map(part =>
	Deno.writeTextFile(`${directory}/${part}.ts`, '', {append: true}),
);

if (options.clipboard) {
	promises.push(
		writeAll(
			Deno.openSync(`${directory}/input.txt`, {
				write: true,
				createNew: true,
			}),
			new TextEncoder().encode((await clipboard.read_text()) + '\n'),
		),
	);
}

await Promise.all(promises);
