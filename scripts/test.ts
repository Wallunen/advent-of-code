import {Command} from 'cliffy/command/command.ts';
import {assertEquals} from 'std/assert/assert_equals.ts';
import {walk} from 'std/fs/walk.ts';
import {basename, dirname, extname} from 'std/path/mod.ts';

await new Command().name('test').parse();

const decoder = new TextDecoder();
const promises: Promise<void>[] = [];
const entries = walk('years/', {exts: ['.ts']});

for await (const {path} of entries) {
	promises.push(
		(async () => {
			const extension = extname(path);
			const part = basename(path, extension);
			const day = basename(dirname(path), extension);
			const year = basename(dirname(dirname(dirname(path))), extension);

			const output = await new Deno.Command('deno', {
				args: ['run', '--allow-read', '--', path],
			}).output();

			assertEquals(
				decoder.decode(output.stdout),
				await Deno.readTextFile(`${path.slice(0, path.lastIndexOf('.'))}.txt`),
				`${year}/${day}/${part}`,
			);
		})(),
	);
}

await Promise.all(promises);
