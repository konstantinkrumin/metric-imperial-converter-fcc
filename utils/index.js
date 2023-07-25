const convertFractionToFloat = numStr => {
	const [numerator, denominator] = numStr.split('/').map(Number);

	return numerator / denominator;
};

const roundTo5Digits = num => {
	return Number(Math.round(num + 'e5') + 'e-5');
};

const countCharOccurrence = (str, char) => {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === char) {
			count++;
		}
	}
	return count;
};

const splitInput = input => {
	const SPLIT_PATTERN = /[a-zA-Z]/;

	if (!input) return null;

	const index = input.search(SPLIT_PATTERN);

	if (index !== -1) {
		const numStr = input.slice(0, index);
		const unitStr = input.slice(index);

		return { num: numStr, unit: unitStr };
	} else {
		return { num: input, unit: null };
	}
};

module.exports = { convertFractionToFloat, roundTo5Digits, countCharOccurrence, splitInput };
