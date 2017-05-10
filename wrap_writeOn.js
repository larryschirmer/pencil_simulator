'use strict';

let { isNum } = require('./wrapper');

let getCost = string => {
      let totalCost = 0;
      string.split('').forEach(letter => {
            let letterCost = 1;
            if (string == string.toUpperCase()) letterCost = 2;
            if (isNum(string)) letterCost = 1;
            if (string === '\n') letterCost = 0;
            if (string === ' ') letterCost = 0;
            totalCost += letterCost;
      });
      return totalCost;
};

let writeWord = (word, health) => {
      return word.substr(0, health);
};

module.exports = {
      getCost,
      writeWord
};
