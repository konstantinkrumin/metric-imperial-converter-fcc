const Util = require('../utils');

function ConvertHandler() {
	this.getNum = input => {
		const splittedInput = Util.splitInput(input);

		if (!splittedInput) return null;
		if (!splittedInput?.num) return 1;

		const numStr = splittedInput?.num;

		if (Util.countCharOccurrence(numStr, '/') > 1) return null;

		return numStr.includes('/') ? Util.convertFractionToFloat(numStr) : parseFloat(numStr);
	};

	this.getUnit = input => {
		const splittedInput = Util.splitInput(input);

		if (!splittedInput || !splittedInput?.unit) return null;

		const unitStr = splittedInput.unit;

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

		return Util.roundTo5Digits(result);
	};

	this.spellOutUnit = unit => {
		const textMapping = [
			{ short: 'km', long: 'kilometers' },
			{ short: 'L', long: 'litres' },
			{ short: 'kg', long: 'kilograms' },
			{ short: 'gal', long: 'gallons' },
			{ short: 'mi', long: 'miles' },
			{ short: 'lbs', long: 'pounds' }
		];

		return textMapping.find(text => text.short === unit).long ?? null;
	};

	this.getString = (initNum, initUnit, returnNum, returnUnit) => {
		const initUnitLong = this.spellOutUnit(initUnit);
		const returnUnitLong = this.spellOutUnit(returnUnit);

		return `${initNum} ${initUnitLong} converts to ${returnNum} ${returnUnitLong}`;
	};
}

module.exports = ConvertHandler;
