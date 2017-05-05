let checkIfCanBeDone = (letterCost, durabilityFactor) => {
	if (durabilityFactor >= letterCost) {
		return true;
	} else {
		return false;
	}
};

let degrade = (originalAmount, howMuchToDegrade) => {
	return originalAmount - howMuchToDegrade;
};

module.exports = {
	checkIfCanBeDone,
	degrade
};
