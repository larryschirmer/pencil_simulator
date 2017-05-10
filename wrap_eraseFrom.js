'use strict';

let convertToWordArray = string => {
      return string.split(' ');
};

let convertToLetterArray = string => {
      return string.split('');
};

let eraseLetters = (charToErase, wordNumToErase, paper) => {
      let newPaper = paper;
      let wordLength = newPaper[wordNumToErase].length;
      newPaper[wordNumToErase] = convertToLetterArray(newPaper[wordNumToErase]);
      let totalNumberOfTimes = Math.min(wordLength, charToErase);
      for (let i = 0; i < totalNumberOfTimes; i++) {
            newPaper[wordNumToErase][wordLength - i - 1] = ' ';
      }
      return newPaper;
};

let restoreString = array => {
      let string = '';
      array.forEach((word, i, arr) => {
            if (Array.isArray(word)) {
                  string = string + word.join('');
                  if (i < arr.length - 1) string = string + ' ';
            } else {
                  if (i < arr.length - 1) string += word + ' ';
            }
      });
      return string;
};

module.exports = {
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
};
