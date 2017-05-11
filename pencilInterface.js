'use strict';
let { isNum, roundDown, degrade, getCost } = require('./wrapper');

let { hasNegitive, hasString, throwError } = require('./wrap_pencilInterface');
let { writeWord } = require('./wrap_writeOn');
let {
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
} = require('./wrap_eraseFrom');

let { editLetters } = require('./wrap_editInto');

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
      let startEditAt = 0;
      let wordToEdit = '';

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
            let wordLength = newPaper[wordNumToErase].length;
            let charToErase = Math.min(lettersToErase, properties.eraserDexterity, wordLength);
            newPaper = eraseLetters(charToErase, wordNumToErase, newPaper);
            properties.eraserDexterity = degrade(charToErase, properties.eraserDexterity);
            return restoreString(newPaper);
      }

      function edit(opt) {
            startEditAt = opt.char_number;
            wordToEdit = opt.word;
            return this;
      }

      function into(paper) {
            let paperArr = paper.split('');
            let wordArr = wordToEdit.split('');
            let wordLength = wordToEdit.length;
            let charToEdit = Math.min(properties.pointStrength, wordLength);
            let wordWillExceedEdge = wordLength + startEditAt > paperArr.length ? true : false;
            if (wordWillExceedEdge) throwError('editRange');
            paperArr = editLetters(paperArr, charToEdit, startEditAt, wordArr);
            properties.pointStrength = degrade(charToEdit, properties.pointStrength);
            return paperArr.join('');
      }

      let inspect = {
            point: function() {
                  return properties.pointStrength;
            },
            eraser: function() {
                  return properties.eraserDexterity;
            },
            length: function() {
                  return properties.length;
            }
      };

      function sharpen() {
            if (properties.length > 0) {
                  properties.pointStrength = point;
                  let costToSharpen = 1;
                  properties.length = degrade(costToSharpen, properties.length);
            }
      }

      obj.get = get;
      obj.write = write;
      obj.on = on;
      obj.erase = erase;
      obj.from = from;
      obj.edit = edit;
      obj.into = into;
      obj.inspect = inspect;
      obj.sharpen = sharpen;

      return obj;
}

module.exports = {
      Pencil
};
