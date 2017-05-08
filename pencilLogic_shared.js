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

let isNegitive = params => {
      let state = false;
      params.forEach(parameter => {
            if (parameter < 0) state = true;
      });
      return state;
};

let isString = params => {
      let state = false;
      let isArray = params instanceof Array;
      if (!isArray) params = [params];
      params.forEach(parameter => {
            if (typeof parameter === 'string') state = true;
      });
      return state;
};

let isNum = number => {
      return !isNaN(number * 1);
};

let isOkToErase = params => {
      let state = 0;
      params.forEach(parameter => {
            if (isNum(parameter) && parameter > 0) state += 1;
            if (isString(parameter) && parameter !== ' ') state += 1;
            if (isString(parameter) && parameter !== '\n') state += 1;
      });
      state = state == 4 ? true : false;
      return state;
};

module.exports = {
      checkIfCanBeDone,
      degrade,
      isNegitive,
      isString,
      isNum,
      isOkToErase
};
