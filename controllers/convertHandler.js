const SPLIT_PATTERN = /[a-zA-Z]/;

const UNIT_PAIRS = [
	{ metric: 'L', imperial: 'gal' },
	{ metric: 'km', imperial: 'mi' },
	{ metric: 'kg', imperial: 'lbs' }
];

const convertFractionToFloat = numStr => {
	const [numerator, denominator] = numStr.split('/').map(Number);
	const result = numerator / denominator;
	return Math.round(result * 100) / 100;
};

function ConvertHandler() {
	this.getNum = input => {
		if (!input) return null;

		const index = input.search(SPLIT_PATTERN);
		let numStr = input.slice(0, index);

		if (!numStr) return 1;

		return numStr.includes('/') ? convertFractionToFloat(numStr) : parseFloat(numStr);
	};

	this.getUnit = input => {
		if (!input) return null;

		const index = input.search(SPLIT_PATTERN);

		let result = input.slice(index);

		return result;
	};

	this.getReturnUnit = input => {
		let result;

		return result;
	};

	this.spellOutUnit = input => {
		let result;

		return result;
	};

	this.convert = (initNum, initUnit) => {
		const galToL = 3.78541;
		const lbsToKg = 0.453592;
		const miToKm = 1.60934;
		let result;

		return result;
	};

	this.getString = (initNum, initUnit, returnNum, returnUnit) => {
		return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
	};
}

module.exports = ConvertHandler;
