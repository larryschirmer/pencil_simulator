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
		for (
			let letterIndex = 0;
			letterIndex < array[wordIndex].length;
			letterIndex++
		) {
			let letter = array[wordIndex][letterIndex];

			yield [letter, wordIndex, letterIndex];
		}
		wordIndex++;
		if (wordIndex < array.length)
			yield [' ', wordIndex - 1, wordIndex, true];
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

let overWriteLetter = (value, mLetter, wordSize, newPaper, durability) => {
	let letterCost = getLetterCost(mLetter);
	if (value[3]) {
		let wordNumber = value[1];
		return [durability, newPaper, { newPaper, wordNumber, mLetter }];
	} else if (newPaper[value[1]] > wordSize) {
		return [durability, newPaper];
	} else {
		if (checkIfCanBeDone(letterCost, durability)) {
			if (value[0] === ' ') {
				newPaper[value[1]][value[2]] = mLetter;
			} else if (mLetter == ' ') {
				newPaper[value[1]][value[2]] = newPaper[value[1]][value[2]];
			} else {
				newPaper[value[1]][value[2]] = '@';
			}
			return [degrade(durability, letterCost), newPaper];
		} else {
			return [durability, newPaper];
		}
	}
};

let mergeArrayAt = (arrayToMerge, indexOf, addLetter) => {
	let mergedArray = [];
	let merge = [];
	if (arrayToMerge[indexOf] !== undefined) {
		if (addLetter) {
			merge = [
				...arrayToMerge[indexOf],
				addLetter,
				...arrayToMerge[indexOf + 1]
			];
		} else {
			merge = [
				...arrayToMerge[indexOf],
				' ',
				...arrayToMerge[indexOf + 1]
			];
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

module.exports = {
	getLetterCost,
	iterateOverEntireArray,
	writeLetter,
	overWriteLetter,
	mergeArrayAt
};
