'use strict';
let _ = require('lodash');
let {
      getLetterCost,
      iterateOverEntireArray,
      writeLetter,
      overWriteLetter,
      mergeArrayAt,
      fillInSpaces,
      addSpacesForFlattening,
      removeSpacesForFlattening
} = require('./pencilLogic_directUseSupport');

let { checkIfCanBeDone, degrade } = require('./pencilLogic_shared');

let writeWordsToArray = wordString => {
      wordString = wordString.toString();
      let wordArray = wordString.split(' '); //['word','word']
      let wordArray_with_letterArray = wordArray.map(eachWord => {
            let arrayOfLetters = eachWord.split(''); //[['w','o','r','d'],...]
            return arrayOfLetters;
      });
      return wordArray_with_letterArray;
};

let applyPencil = (wordsToWrite, originalDurability) => {
      let wordsAppliedToArray = [],
            durability = originalDurability,
            get = iterateOverEntireArray(wordsToWrite);

      function iterateOverWordsToWrite() {
            let value = get.next().value;

            if (value == 'done') {
                  return [wordsAppliedToArray, durability];
            } else {
                  let returnedArray = writeLetter(value, wordsToWrite, durability);
                  durability = returnedArray[0];
                  wordsAppliedToArray = returnedArray[1];
                  return iterateOverWordsToWrite();
            }
      }

      return iterateOverWordsToWrite();
};

let eraseLetters = (word, amountOfLetters, durability) => {
      let newWord = [], eraserDurability = durability, lettersRemaining = amountOfLetters;
      word.reverse().forEach(letter => {
            if (eraserDurability > 0 && lettersRemaining > 0 && letter !== ' ' && letter !== '\n') {
                  newWord = [...newWord, ' '];
                  eraserDurability = degrade(eraserDurability, 1);
                  lettersRemaining = lettersRemaining - 1;
            } else {
                  newWord = [...newWord, letter];
            }
      });

      return [newWord.reverse(), eraserDurability];
};

let writeOver = (paper, at, withThisWord, originalDurability) => {
      let props = {
            durability: originalDurability,
            newPaper: paper,
            spaceLetter: false,
            lettersInSpaces: [],
            spacesAdded: 0,
            totalEditableLetters: 0
      };
      let startOverwrite = at,
            stopOverwrite = withThisWord.length + at,
            get = iterateOverEntireArray(props.newPaper),
            waitToFillInSpaces = true;
      //add the spaces necessary to account of the space between words
      props = addSpacesForFlattening(props);

      _.flatten(props.newPaper).forEach((v, i, arr) => {
            props.totalEditableLetters = arr.length;
            let value = get.next().value;
            if (i >= startOverwrite && i < stopOverwrite) {
                  let overwriteLetter = withThisWord[i - at],
                        placeInOverwriteWord = i - at,
                        placeInPaper = i,
                        overwriteWordLength = withThisWord.length;
                  props = overWriteLetter(
                        value,
                        overwriteLetter,
                        overwriteWordLength,
                        placeInOverwriteWord,
                        placeInPaper,
                        props
                  );

                  if (props.spaceLetter) {
                        props.lettersInSpaces = [...props.lettersInSpaces, props.spaceLetter];
                        props.spaceLetter = false;
                  }
            }
      });
      props = fillInSpaces(props);
      //Remove the spaces added in the beginning
      props = removeSpacesForFlattening(props);
      return [props.durability, props.newPaper];
};

module.exports = {
      writeWordsToArray,
      applyPencil,
      eraseLetters,
      writeOver,
      degrade
};
