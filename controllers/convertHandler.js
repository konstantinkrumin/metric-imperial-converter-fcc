const SPLIT_PATTERN = /[a-zA-Z]/;

const convertFractionToFloat = numStr => {
	const [numerator, denominator] = numStr.split('/').map(Number);

	const result = numerator / denominator;
	return Math.round(result * 100) / 100;
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

const roundTo5Digits = num => {
	return Number(Math.round(num + 'e5') + 'e-5');
};

function ConvertHandler() {
	this.getNum = numStr => {
		if (!numStr) return 1;
		if (countCharOccurrence(numStr, '/') > 1) return null;

		return numStr.includes('/') ? convertFractionToFloat(numStr) : parseFloat(numStr);
	};

	this.getUnit = unitStr => {
		if (!unitStr) return null;

		let parsedUnitStr;

		switch (unitStr) {
			case 'L':
				parsedUnitStr = unitStr;
				break;
			case 'l':
				parsedUnitStr = unitStr?.toUpperCase();
				break;
			default:
				parsedUnitStr = unitStr?.toLowerCase();
		}

		const measurement_units = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];

		return measurement_units.includes(parsedUnitStr) ? parsedUnitStr : null;
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

		if (index !== -1) {
			const numStr = input.slice(0, index);
			const unitStr = input.slice(index);

			return { num: numStr, unit: unitStr };
		} else {
			return { num: input, unit: null };
		}
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
				result = null;
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
