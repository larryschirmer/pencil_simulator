'use strict';
let { checkIfCanBeDone, degrade, isNum } = require('./pencilLogic_shared');

let getLetterCost = letter => {
      let letterCost = 1;
      if (letter == letter.toUpperCase()) letterCost = 2;
      if (isNum(letter)) letterCost = 1;
      if (letter === '\n') letterCost = 0;
      if (letter === ' ') letterCost = 0;
      return letterCost;
};

function* iterateOverEntireArray(array) {
      let wordIndex = 0;
      //while loops over each word
      while (wordIndex < array.length) {
            //for loops over each letter
            for (let letterIndex = 0; letterIndex < array[wordIndex].length; letterIndex++) {
                  let letter = array[wordIndex][letterIndex];

                  yield [letter, wordIndex, letterIndex];
            }
            wordIndex++;
            if (wordIndex < array.length) yield [' ', wordIndex - 1, wordIndex, true];
      }

      yield 'done';
}

let writeLetter = (value, writeArray, durability) => {
      let letter = value[0],
            wordIndex = value[1],
            letterIndex = value[2],
            letterCost = getLetterCost(letter);

      if (checkIfCanBeDone(letterCost, durability)) {
            return [degrade(durability, letterCost), writeArray];
      } else {
            writeArray[wordIndex][letterIndex] = '';
            return [durability, writeArray];
      }
};

let overWriteLetter = args => {
      let { value, letterToChange, wordSize, placeInOverwriteWord, placeInPaper, props } = args;
      let { durability, newPaper, lettersInSpaces, spacesAdded, totalEditableLetters } = props;
      let letterCost = getLetterCost(letterToChange),
            letterIsASpace = value[3],
            letterNumber = value[2],
            wordNumber = value[1];

      let editableLetters = totalEditableLetters,
            lettersLeftToWrite = wordSize - placeInOverwriteWord,
            lettersLeftToWriteover = editableLetters - placeInPaper,
            wordWillExceedEdge = lettersLeftToWrite > lettersLeftToWriteover ? true : false;

      if (letterIsASpace) {
            let spaceLetter = { newPaper, wordNumber, letterToChange };
            return Object.assign(props, { durability, newPaper, spaceLetter });
      } else if (wordWillExceedEdge) {
            throw new RangeError('cannot edit, editor has exceeded edge of paper');
      } else {
            let spacesFilled = lettersInSpaces.length, currentLetter = value[0];
            if (checkIfCanBeDone(letterCost, durability, spacesFilled)) {
                  if (currentLetter === ' ') {
                        newPaper[wordNumber][letterNumber] = letterToChange;
                        durability = degrade(durability, letterCost);
                  } else if (letterToChange == ' ') {
                  } else {
                        newPaper[wordNumber][letterNumber] = '@';
                        durability = degrade(durability, letterCost);
                  }

                  return Object.assign(props, { durability, newPaper });
            } else {
                  return props;
            }
      }
};

let mergeArrayAt = (arrayToMerge, index, addLetter) => {
      let mergedArray = [];
      let merge = [];
      merge = [...arrayToMerge[index], addLetter, ...arrayToMerge[index + 1]];
      var arrayBefore = arrayToMerge.filter((word, i) => {
            if (i < index) return word;
      });
      var arrayAfter = arrayToMerge.filter((word, i) => {
            if (i > index + 1) return word;
      });
      mergedArray = [...arrayBefore, merge, ...arrayAfter];
      return mergedArray;
};

let fillInSpaces = props => {
      let adjustmentForClosingArrays = 1;
      let newProps = Object.assign({}, props);

      newProps.lettersInSpaces.forEach(obj => {
            adjustmentForClosingArrays -= 1;
            let letterCost = getLetterCost(obj.letterToChange);
            newProps.newPaper = mergeArrayAt(
                  newProps.newPaper,
                  adjustmentForClosingArrays + obj.wordNumber,
                  obj.letterToChange
            );
            newProps.durability = degrade(newProps.durability, letterCost);
      });

      return newProps;
};

let addSpacesForFlattening = paper => {
      let numberOfSpaces = paper.newPaper.length - 1;
      let spacedPaper = paper.newPaper;
      for (let i = 0; i < numberOfSpaces; i++) {
            spacedPaper = [...spacedPaper, [' ']];
      }
      let newPaper = spacedPaper;
      let spacesAdded = numberOfSpaces;
      return Object.assign(paper, { newPaper, spacesAdded });
};
let removeSpacesForFlattening = paper => {
      let numberOfSpaces = paper.spacesAdded;
      let lengthOfPaper = paper.newPaper.length;
      let spacedPaper = [];
      let truePaperLength = lengthOfPaper - numberOfSpaces;
      for (let i = 0; i < truePaperLength; i++) {
            spacedPaper[i] = paper.newPaper[i];
      }
      let newPaper = spacedPaper;
      let spacesAdded = 0;
      return Object.assign(paper, { newPaper, spacesAdded });
};

module.exports = {
      getLetterCost,
      iterateOverEntireArray,
      writeLetter,
      overWriteLetter,
      mergeArrayAt,
      fillInSpaces,
      addSpacesForFlattening,
      removeSpacesForFlattening
};
