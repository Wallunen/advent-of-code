import {Command} from 'cliffy/command/command.ts';

const {args, options} = await new Command()
	.name('commit')
	.arguments('[day:string] [year:string]')
	.option('-p, --part <part:string>', '')
	.parse();

const part = options.part ? `part ${options.part}` : 'both parts';
const day = (args[0] ?? new Date().getDate().toString()).padStart(2, '0');
const year = args[1] ?? new Date().getFullYear().toString();

const files = [
	'input.txt',
	...(options.part ? [`${options.part}.ts`] : ['1.ts', '2.ts']),
].map(name => `years/${year}/days/${day}/${name}`);

await Deno.run({cmd: ['git', 'add', ...files]}).status();
await Deno.run({
	cmd: [
		'git',
		'commit',
		`--message=Solve ${part} of day ${day} from ${year}`,
		...files,
	],
}).status();
