'use strict';
let { roundDown, hasNegitive, hasString, throwError, getCost, degradePoint } = require('./wrapper');

function Pencil(point = 0, eraser = 0, len = 0) {
      if (hasNegitive(arguments)) throwError('negitive');
      if (hasString(arguments)) throwError('string');

      let properties = {
            pointStrength: roundDown(point),
            eraserDexterity: roundDown(eraser),
            length: roundDown(len)
      };
      let wordQueue = '';
      let lettersToErase = [];

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
            properties.pointStrength = degradePoint(costToWriteLetter, properties.pointStrength);
            return paper + wordToWrite;
      }

      function erase(opt) {
            lettersToErase = [opt.word, opt.amt];
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
