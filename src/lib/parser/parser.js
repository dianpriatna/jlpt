import { plain, ruby, target } from './nodes.js';

const TOKEN_REGEX = /([^_()]+)\(([^)]+)\)|_([^_]+)_/g;

export function parse(text) {
	const nodes = [];

	let lastIndex = 0;

	for (const match of text.matchAll(TOKEN_REGEX)) {
		const index = match.index;

		if (index > lastIndex) {
			nodes.push(plain(text.slice(lastIndex, index)));
		}

		if (match[1]) {
			nodes.push(ruby(match[1], match[2]));
		} else {
			nodes.push(target(match[3]));
		}

		lastIndex = index + match[0].length;
	}

	if (lastIndex < text.length) {
		nodes.push(plain(text.slice(lastIndex)));
	}

	return nodes;
}
