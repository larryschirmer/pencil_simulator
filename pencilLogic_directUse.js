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

let { checkIfCanBeDone, degrade, isNum, isString, isOkToErase } = require('./pencilLogic_shared');

let writeWordsToArray = wordString => {
      //Force all input to be string type
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

      let value = get.next().value;
      while (value !== 'done') {
            let returnedArray = writeLetter(value, wordsToWrite, durability);
            durability = returnedArray[0];
            wordsAppliedToArray = returnedArray[1];
            value = get.next().value;
      }
      return [wordsAppliedToArray, durability];
};

let eraseLetters = (word, amountOfLetters, durability) => {
      let newWord = [], eraserDurability = durability, lettersRemaining = amountOfLetters;

      word.reverse().forEach(letter => {
            let parameters = [eraserDurability, lettersRemaining, letter];
            if (isOkToErase(parameters)) {
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
            waitToFillInSpaces = true,
            wordSize = withThisWord.length;
      //add the spaces necessary to account of the space between words
      props = addSpacesForFlattening(props);

      props.totalEditableLetters = _.flatten(props.newPaper).length;
      let value = get.next().value;
      let i = 0;
      while (value !== 'done') {
            if (i >= startOverwrite && i < stopOverwrite) {
                  let letterToChange = withThisWord[i - at],
                        placeInOverwriteWord = i - at,
                        placeInPaper = i;
                  props = overWriteLetter({
                        value,
                        letterToChange,
                        wordSize,
                        placeInOverwriteWord,
                        placeInPaper,
                        props
                  });

                  //Store letter meant for a place between the word for later
                  if (props.spaceLetter) {
                        props.lettersInSpaces = [...props.lettersInSpaces, props.spaceLetter];
                        props.spaceLetter = false;
                  }
            }
            i++;
            value = get.next().value;
      }

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
