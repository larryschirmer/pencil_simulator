let checkIfCanBeDone = (...args) => {
      let letterCost = args[0], durabilityFactor = args[1], numberOfSpaces = args[2] || 0;
      if (durabilityFactor >= letterCost && durabilityFactor > numberOfSpaces) {
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
