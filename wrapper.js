'use strict';

let log = arr => {
      arr.forEach(variable => {
            console.log(`variable: ${JSON.stringify(variable)}`);
      });
};

let roundDown = variable => {
      return Math.floor(variable);
};

let hasNegitive = params => {
      let state = false;
      for (let key in params)
            if (params[key] < 0) state = true;
      return state;
};

let hasString = params => {
      let state = false;
      for (let key in params) {
            if (typeof params[key] === 'string') state = true;
      }

      return state;
};

let throwError = error => {
      switch (error) {
            case 'negitive':
                  throw new TypeError('new Pencil may not have negitive properties');
                  break;
            case 'string':
                  throw new TypeError('new Pencil may not have a string property');
                  break;
      }
};

let isNum = number => {
      return !isNaN(number * 1);
};

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

let degrade = (cost, currentHealth) => {
      let degradationAmount = currentHealth - cost;
      return degradationAmount > 0 ? degradationAmount : 0;
};

module.exports = {
      roundDown,
      hasNegitive,
      hasString,
      throwError,
      getCost,
      degrade
};
