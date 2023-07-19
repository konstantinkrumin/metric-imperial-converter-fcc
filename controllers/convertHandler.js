const SPLIT_PATTERN = /[a-zA-Z]/;

function ConvertHandler() {
	this.getNum = input => {
		const index = input.search(SPLIT_PATTERN);

		let result = input.slice(0, index);

		return result;
	};

	this.getUnit = input => {
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
