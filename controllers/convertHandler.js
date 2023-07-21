const SPLIT_PATTERN = /[a-zA-Z]/;

const convertFractionToFloat = numStr => {
	const [numerator, denominator] = numStr.split('/').map(Number);
	const result = numerator / denominator;
	return Math.round(result * 100) / 100;
};

const roundTo5Digits = num => {
	return Number(Math.round(num + 'e5') + 'e-5');
};

function ConvertHandler() {
	this.getNum = numStr => {
		if (!numStr) return 1;

		return numStr.includes('/') ? convertFractionToFloat(numStr) : parseFloat(numStr);
	};

	this.getUnit = unitStr => {
		return unitStr;
	};

	this.getReturnUnit = initUnit => {
		const unitsMapping = [
			['L', 'gal'],
			['gal', 'L'],
			['km', 'mi'],
			['mi', 'km'],
			['kg', 'lbs'],
			['lbs', 'kg']
		];

		return unitsMapping.find(unit => unit[0] === initUnit)?.[1];
	};

	this.spellOutUnit = input => {
		if (!input) return null;

		const index = input.search(SPLIT_PATTERN);
		const numStr = input.slice(0, index);
		const unitStr = input.slice(index);

		return { num: numStr, unit: unitStr };
	};

	this.convert = (initNum, initUnit) => {
		const galToL = 3.78541;
		const miToKm = 1.60934;
		const lbsToKg = 0.453592;

		let result;

		switch (initUnit) {
			case 'L':
				result = initNum / galToL;
				break;
			case 'gal':
				result = initNum * galToL;
				break;
			case 'km':
				result = initNum / miToKm;
				break;
			case 'mi':
				result = initNum * miToKm;
				break;
			case 'kg':
				result = initNum / lbsToKg;
				break;
			case 'lbs':
				result = initNum * lbsToKg;
				break;
			default:
				return (result = null);
		}

		return roundTo5Digits(result);
	};

	this.getString = (initNum, initUnit, returnNum, returnUnit) => {
		const textMapping = [
			{ short: 'km', long: 'kilometers' },
			{ short: 'L', long: 'litres' },
			{ short: 'kg', long: 'kilograms' },
			{ short: 'gal', long: 'gallons' },
			{ short: 'mi', long: 'miles' },
			{ short: 'lbs', long: 'pounds' }
		];

		const initUnitLong = textMapping.find(text => text.short === initUnit).long ?? null;
		const returnUnitLong = textMapping.find(text => text.short === returnUnit)?.long ?? null;

		return `${initNum} ${initUnitLong} converts to ${returnNum} ${returnUnitLong}`;
	};
}

module.exports = ConvertHandler;
