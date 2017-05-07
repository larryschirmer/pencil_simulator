'use strict';
let { checkIfCanBeDone, degrade } = require('./pencilLogic_shared');
let getLetterCost = letter => {
      let letterCost = 1;
      if (letter == letter.toUpperCase()) letterCost = 2; //is uppercase
      if (!isNaN(letter * 1)) letterCost = 1; //is a number
      if (letter === '\n') letterCost = 0; //is carrage return
      if (letter === ' ') letterCost = 0; //is carrage return
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
      let letterCost = getLetterCost(value[0]);

      if (checkIfCanBeDone(letterCost, durability)) {
            return [degrade(durability, letterCost), writeArray];
      } else {
            //value[1] = wordIndex, value[2] = letterIndex
            writeArray[value[1]][value[2]] = '';
            return [durability, writeArray];
      }
};

let overWriteLetter = (value, mLetter, wordSize, placeInOverwriteWord, placeInPaper, props) => {
      let { durability, newPaper, lettersInSpaces, spacesAdded, totalEditableLetters } = props;
      let letterCost = getLetterCost(mLetter), letterIsASpace = value[3], wordNumber = value[1];

      let editableLetters = totalEditableLetters,
            lettersLeftToWrite = wordSize - placeInOverwriteWord,
            lettersLeftToWriteover = editableLetters - placeInPaper,
            bool_willExceedEdge = lettersLeftToWrite > lettersLeftToWriteover ? true : false;

      if (letterIsASpace) {
            let wordNumber = value[1];
            let spaceLetter = { newPaper, wordNumber, mLetter };
            return Object.assign(props, { durability, newPaper, spaceLetter });
      } else if (bool_willExceedEdge) {
            throw new RangeError('cannot edit, editor has exceeded edge of paper');
      } else {
            let spacesFilled = lettersInSpaces.length, currentLetter = value[0];
            if (checkIfCanBeDone(letterCost, durability, spacesFilled)) {
                  if (currentLetter === ' ') {
                        //newPaper[value[1]][value[2]] is place holder for current letter
                        newPaper[value[1]][value[2]] = mLetter;
                        durability = degrade(durability, letterCost);
                  } else if (mLetter == ' ') {
                        newPaper[value[1]][value[2]] = newPaper[value[1]][value[2]];
                  } else {
                        newPaper[value[1]][value[2]] = '@';
                        durability = degrade(durability, letterCost);
                  }

                  return Object.assign(props, { durability, newPaper });
            } else {
                  return props;
            }
      }
};

let mergeArrayAt = (arrayToMerge, indexOf, addLetter) => {
      let mergedArray = [];
      let merge = [];
      if (arrayToMerge[indexOf] !== undefined) {
            if (addLetter) {
                  merge = [...arrayToMerge[indexOf], addLetter, ...arrayToMerge[indexOf + 1]];
            } else {
                  merge = [...arrayToMerge[indexOf], ' ', ...arrayToMerge[indexOf + 1]];
            }
            var arrayBefore = arrayToMerge.filter((word, i) => {
                  if (i < indexOf) return word;
            });

            var arrayAfter = arrayToMerge.filter((word, i) => {
                  if (i > indexOf + 1) return word;
            });

            mergedArray = [...arrayBefore, merge, ...arrayAfter];
            return mergedArray;
      } else {
            throw new RangeError('cannot edit, editor has exceeded edge of paper');
      }
};

let fillInSpaces = props => {
      let dipIndex = 1;
      let newProps = Object.assign({}, props);

      newProps.lettersInSpaces.forEach(obj => {
            dipIndex = dipIndex - 1;

            let letterCost = getLetterCost(obj.mLetter);
            if (checkIfCanBeDone(letterCost, newProps.durability)) {
                  newProps.newPaper = mergeArrayAt(
                        newProps.newPaper,
                        dipIndex + obj.wordNumber,
                        obj.mLetter
                  );

                  newProps.durability = degrade(newProps.durability, letterCost);
            } else {
                  console.log(`out of point`);
            }
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
