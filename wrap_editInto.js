'use strict';

let editLetters = (paperArr, charToEdit, startEditAt, wordToEdit) => {
      paperArr = paperArr.map((letter, i) => {
            let withinEditBounds = i >= startEditAt && i < startEditAt + charToEdit;
            let editLetter = wordToEdit[i - startEditAt];
            if (withinEditBounds && editLetter == ' ') return letter;
            if (withinEditBounds && letter == ' ') return editLetter;
            if (withinEditBounds) return '@';
            return letter;
      });
      return paperArr;
};

module.exports = {
      editLetters
};
