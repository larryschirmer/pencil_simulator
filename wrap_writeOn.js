'use strict';

let { isNum } = require('./wrapper');

let writeWord = (word, health) => {
      return word.substr(0, health);
};

module.exports = {
      writeWord
};
