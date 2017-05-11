'use strict';

let convertToWordArray = string => {
      let splitString = string.split(' ');
      splitString = groupSpaces(splitString);
      return splitString;
};

let groupSpaces = array => {
      let FilteredArray = [], numberOfSpaces = 0;
      array.forEach(word => {
            if (word == '') {
                  numberOfSpaces += 1;
                  return;
            }
            if (numberOfSpaces == 0) {
                  FilteredArray = [...FilteredArray, word];
                  return;
            }
            FilteredArray = [...FilteredArray, spacesArray(numberOfSpaces), word];
            numberOfSpaces = 0;
      });
      return FilteredArray;
};

let spacesArray = numberOfSpaces => {
      let spacedArray = Array.from(Array(numberOfSpaces - 1), _ => {
            return ' ';
      });
      let spaces = spacedArray.join('');
      return spaces;
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
            } else {
                  string = string + word;
            }
            if (i < arr.length - 1) string = string + ' ';
      });
      return string;
};

module.exports = {
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
};
