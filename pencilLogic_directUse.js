'use strict';
let {
	getLetterCost,
	iterateOverEntireArray,
	writeLetter,
	overWriteLetter,
	mergeArrayAt
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
	let wordsAppliedToArray = [];
	let durability = originalDurability;

	let get = iterateOverEntireArray(wordsToWrite);

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
	let newWord = [];
	let eraserDurability = durability;
	let lettersRemaining = amountOfLetters;
	word.reverse().forEach(letter => {
		if (
			eraserDurability > 0 &&
			lettersRemaining > 0 &&
			letter !== ' ' &&
			letter !== '\n'
		) {
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
	let index = -1;
	let wordIndex = -1;
	let newPaper = paper;
	let durability = originalDurability;
	let get = iterateOverEntireArray(paper);
	let lettersInSpaces_ParkingLot = [];

	function iterateOverWordsToWrite() {
		index = index + 1;
		let value = get.next().value;
		if (wordIndex == withThisWord.length - 1) {
			if (lettersInSpaces_ParkingLot.length > 0) {
				let dipIndex = 1;
				lettersInSpaces_ParkingLot.forEach(obj => {
					dipIndex = dipIndex - 1;
					newPaper = mergeArrayAt(
						newPaper,
						dipIndex + obj.wordNumber,
						obj.mLetter
					);
				});
			}
			return [durability, newPaper];
		} else if (index >= at) {
			wordIndex = wordIndex + 1;
			let wrotePaper = overWriteLetter(
				value,
				withThisWord[wordIndex],
				withThisWord.length,
				newPaper,
				durability
			);
			durability = wrotePaper[0];
			newPaper = wrotePaper[1];
			if (wrotePaper[2])
				lettersInSpaces_ParkingLot = [
					...lettersInSpaces_ParkingLot,
					wrotePaper[2]
				];
			return iterateOverWordsToWrite();
		} else {
			return iterateOverWordsToWrite();
		}
	}

	return iterateOverWordsToWrite();
};

module.exports = {
	writeWordsToArray,
	applyPencil,
	eraseLetters,
	writeOver,
	degrade
};
