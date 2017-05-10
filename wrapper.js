'use strict';

let log = arr => {
      arr.forEach(variable => {
            console.log(`variable: ${JSON.stringify(variable)}`);
      });
};

let roundDown = variable => {
      return Math.floor(variable);
};

let isNum = number => {
      return !isNaN(number * 1);
};

let degrade = (cost, currentHealth) => {
      let degradationAmount = currentHealth - cost;
      return degradationAmount > 0 ? degradationAmount : 0;
};

module.exports = {
      isNum,
      roundDown,
      degrade
};
