'use strict';
function Pencil(degradation = 0, eraserDegradation = 0) {
	//Throw error if included parameters are negitive
	if (degradation < 0 || eraserDegradation < 0)
		throw new TypeError('new Pencil may not have negitive properties');
	//Throw error if included parameters are a string
	if (typeof degradation === 'string' || typeof eraserDegradation === 'string')
		throw new TypeError('new Pencil may not have a string property');

	const obj = {};
	Object.setPrototypeOf(obj, Pencil.prototype);

	function write(words) {
		obj.wordsToWrite = writeWordsToArray(words);
		return this;
	}

	function erase(opt) {
		obj.wordsToErase = [opt.word, opt.amt];
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
		let word = obj.wordsToErase[0];
		let amountOfLetters = obj.wordsToErase[1];
		let processedWord = eraseLetters(
			paper[word],
			amountOfLetters,
			obj.eraserDegradation
		);
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
		obj.degradation = obj.OriginalDegradation;
	}

	let passedParameterDegradation = Math.floor(degradation);
	let passedParameterEraserDegradation = Math.floor(eraserDegradation);

	obj.wordsToWrite = [];
	obj.wordsToErase = [];
	obj.wordsToEdit = [];
	obj.OriginalDegradation = passedParameterDegradation;
	obj.degradation = passedParameterDegradation;
	obj.eraserDegradation = passedParameterEraserDegradation;
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

let writeWordsToArray = wordString => {
	wordString = wordString.toString();
	let wordArray = wordString.split(' '); //['word','word']
	let wordArray_with_letterArray = wordArray.map(eachWord => {
		let arrayOfLetters = eachWord.split(''); //[['w','o','r','d'],...]
		return arrayOfLetters;
	});
	return wordArray_with_letterArray;
};

let degrade = (originalAmount, howMuchToDegrade) => {
	return originalAmount - howMuchToDegrade;
};

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
		if (wordIndex < array.length) yield [' ', wordIndex - 1, wordIndex, true];
	}

	yield 'done';
}

let checkIfLetterCanBeWritten = (letterCost, durabilityFactor) => {
	if (durabilityFactor >= letterCost) {
		return true;
	} else {
		return false;
	}
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

let writeLetter = (value, writeArray, durability) => {
	let letterCost = getLetterCost(value[0]);

	if (checkIfLetterCanBeWritten(letterCost, durability)) {
		return [degrade(durability, letterCost), writeArray];
	} else {
		//value[1] = wordIndex, value[2] = letterIndex
		writeArray[value[1]][value[2]] = '';
		return [durability, writeArray];
	}
};

let writeOver = (paper, at, withThisWord, originalDurability) => {
	let index = -1;
	let wordIndex = -1;
	let newPaper = paper;
	let durability = originalDurability;
	let get = iterateOverEntireArray(paper);
	let lettersInSpaceParkingLot = [];
	function iterateOverWordsToWrite() {
		index = index + 1;
		let value = get.next().value;
		if (wordIndex == withThisWord.length - 1) {
			if (lettersInSpaceParkingLot.length > 0) {
				let dipIndex = 1;
				lettersInSpaceParkingLot.forEach(obj => {
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
				lettersInSpaceParkingLot = [...lettersInSpaceParkingLot, wrotePaper[2]];
			return iterateOverWordsToWrite();
		} else {
			return iterateOverWordsToWrite();
		}
	}

	return iterateOverWordsToWrite();
};

let overWriteLetter = (value, mLetter, wordSize, newPaper, durability) => {
	let letterCost = getLetterCost(mLetter);
	if (value[3]) {
		let wordNumber = value[1];
		return [durability, newPaper, { newPaper, wordNumber, mLetter }];
	} else if (newPaper[value[1]] > wordSize) {
		return [durability, newPaper];
	} else {
		if (checkIfLetterCanBeWritten(letterCost, durability)) {
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
