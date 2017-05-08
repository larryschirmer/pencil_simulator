'use strict';
let {
      writeWordsToArray,
      applyPencil,
      eraseLetters,
      writeOver
} = require('./pencilLogic_directUse');

let { checkIfCanBeDone, degrade, isNegitive, isString } = require('./pencilLogic_shared');

function Pencil(degradation = 0, eraserDegradation = 0, pencilLength = 0) {
      let parameters = [degradation, eraserDegradation, pencilLength];

      //Throw error if included parameters are negitive
      if (isNegitive(parameters))
            throw new TypeError('new Pencil may not have negitive properties');
      //Throw error if included parameters are a string
      if (isString(parameters)) throw new TypeError('new Pencil may not have a string property');

      const obj = {};
      Object.setPrototypeOf(obj, Pencil.prototype);

      function write(words) {
            obj.wordsToWrite = writeWordsToArray(words);
            return this;
      }

      function erase(opt) {
            obj.lettersToErase = [opt.word, opt.amt];
            return this;
      }

      function edit(opt) {
            obj.wordsToEdit = [opt.char_number, opt.word];
            return this;
      }

      function on(paper) {
            let newPaper = [];
            let penciledResult = applyPencil(obj.wordsToWrite, obj.degradation);
            newPaper = [...paper, ...penciledResult[0]];
            obj.degradation = penciledResult[1];
            let empty_text = '';
            obj.wordsToWrite = empty_text;
            return newPaper;
      }

      function from(paper) {
            let newPaper = paper;
            let word = obj.lettersToErase[0];
            let amountOfLetters = obj.lettersToErase[1];
            let processedWord = eraseLetters(paper[word], amountOfLetters, obj.eraserDegradation);
            newPaper[word] = processedWord[0];
            obj.eraserDegradation = processedWord[1];
            return newPaper;
      }

      function into(paper) {
            let newPaper;
            let at = obj.wordsToEdit[0];
            let withThisWord = obj.wordsToEdit[1];
            let mutatedThing = writeOver(paper, at, withThisWord, obj.degradation);
            obj.degradation = mutatedThing[0];
            newPaper = mutatedThing[1];
            return newPaper;
      }

      function sharpen() {
            if (checkIfCanBeDone(1, obj.length)) {
                  obj.length = degrade(obj.length, 1);
                  obj.degradation = obj.OriginalDegradation;
            }
      }

      //Force float values to be whole numbers
      let passedParameterDegradation = Math.floor(degradation);
      let passedParameterEraserDegradation = Math.floor(eraserDegradation);
      let passedParameterPencilLength = Math.floor(pencilLength);

      obj.wordsToWrite = [];
      obj.lettersToErase = [];
      obj.wordsToEdit = [];
      obj.OriginalDegradation = passedParameterDegradation;
      obj.degradation = passedParameterDegradation;
      obj.eraserDegradation = passedParameterEraserDegradation;
      obj.length = passedParameterPencilLength;
      obj.write = write;
      obj.erase = erase;
      obj.edit = edit;
      obj.on = on;
      obj.from = from;
      obj.into = into;
      obj.sharpen = sharpen;

      return obj;
}

module.exports = {
      Pencil
};
