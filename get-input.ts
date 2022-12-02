import {dirname, fromFileUrl} from 'std/path/mod.ts';

const getInput = (importMeta: ImportMeta) =>
	Deno.readTextFileSync(`${dirname(fromFileUrl(importMeta.url))}/input.txt`);

export default getInput;
