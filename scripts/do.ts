import {Command} from 'cliffy/command/mod.ts';

const {args} = await new Command()
	.name('new')
	.arguments('<part:string> [day:string] [year:string]')
	.parse();

const part = args[0];
const day = (args[1] ?? new Date().getDate().toString()).padStart(2, '0');
const year = args[2] ?? new Date().getFullYear().toString();

await Deno.run({
	cmd: [
		'deno',
		'run',
		'--allow-read=./',
		`years/${year}/days/${day}/${part}.ts`,
	],
}).status();
