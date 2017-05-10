'use strict';
let { roundDown, hasNegitive, hasString, throwError, getCost, degrade } = require('./wrapper');

function Pencil(point = 0, eraser = 0, len = 0) {
      if (hasNegitive(arguments)) throwError('negitive');
      if (hasString(arguments)) throwError('string');

      let properties = {
            pointStrength: roundDown(point),
            eraserDexterity: roundDown(eraser),
            length: roundDown(len)
      };
      let wordQueue = '';
      let lettersToErase = 0;
      let wordNumToErase = 0;

      const obj = {};
      Object.setPrototypeOf(obj, Pencil.prototype);

      function get(varName) {
            return properties[varName];
      }

      function write(newWords) {
            wordQueue = newWords;
            return this;
      }

      function on(paper = '') {
            let wordToWrite = wordQueue.substr(0, properties.pointStrength);
            let costToWriteLetter = getCost(wordQueue);
            properties.pointStrength = degrade(costToWriteLetter, properties.pointStrength);
            return paper + wordToWrite;
      }

      function erase(opt) {
            lettersToErase = opt.amt;
            wordNumToErase = opt.word;
            return this;
      }

      obj.get = get;
      obj.write = write;
      obj.on = on;
      obj.erase = erase;

      return obj;
}

module.exports = {
      Pencil
};
