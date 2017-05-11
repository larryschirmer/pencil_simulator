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

let getCost = string => {
      let totalCost = 0;
      string.split('').forEach(letter => {
            let letterCost = 1;
            if (letter == letter.toUpperCase()) letterCost = 2;
            if (isNum(letter)) letterCost = 1;
            if (letter === '\n') letterCost = 0;
            if (letter === ' ') letterCost = 0;
            totalCost += letterCost;
      });
      return totalCost;
};

module.exports = {
      getCost,
      isNum,
      roundDown,
      degrade
};
