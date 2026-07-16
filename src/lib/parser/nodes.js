export function plain(text) {
	return {
		type: 'plain',
		text
	};
}

export function ruby(kanji, reading) {
	return {
		type: 'ruby',
		kanji,
		reading
	};
}

export function target(text) {
	return {
		type: 'target',
		text
	};
}
