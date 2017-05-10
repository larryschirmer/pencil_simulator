'use strict';
let {
      roundDown,
      hasNegitive,
      hasString,
      throwError,
      getCost,
      degrade,
      writeWord,
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
} = require('./wrapper');

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
            let wordToWrite = writeWord(wordQueue, properties.pointStrength);
            let costToWriteLetter = getCost(wordQueue);
            properties.pointStrength = degrade(costToWriteLetter, properties.pointStrength);
            return paper + wordToWrite;
      }

      function erase(opt) {
            lettersToErase = opt.amt;
            wordNumToErase = opt.word;
            return this;
      }

      function from(paper) {
            let newPaper = convertToWordArray(paper);
            let charToErase = Math.min(lettersToErase, properties.eraserDexterity);
            newPaper = eraseLetters(charToErase, wordNumToErase, newPaper);
            return restoreString(newPaper);
      }

      obj.get = get;
      obj.write = write;
      obj.on = on;
      obj.erase = erase;
      obj.from = from;

      return obj;
}

module.exports = {
      Pencil
};
