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
		var newPaper = paper;
		var word = obj.wordsToErase[0];
		var amountOfLetters = obj.wordsToErase[1];
		var processedWord = eraseLetters(
			paper[word],
			amountOfLetters,
			obj.eraserDegradation
		);
		newPaper[word] = processedWord[0];
		obj.eraserDegradation = processedWord[1];
		return newPaper;
	}

	function sharpen() {
		obj.degradation = obj.OriginalDegradation;
	}

	var passedParameterDegradation = Math.floor(degradation);
	var passedParameterEraserDegradation = Math.floor(eraserDegradation);

	obj.wordsToWrite = [];
	obj.wordsToErase = [];
	obj.OriginalDegradation = passedParameterDegradation;
	obj.degradation = passedParameterDegradation;
	obj.eraserDegradation = passedParameterEraserDegradation;
	obj.write = write;
	obj.erase = erase;
	obj.on = on;
	obj.from = from;
	obj.sharpen = sharpen;

	return obj;
}

module.exports = {
	Pencil
};

var writeWordsToArray = wordString => {
	var wordString = wordString.toString();
	var wordArray = wordString.split(' '); //['word','word']
	var wordArray_with_letterArray = wordArray.map(eachWord => {
		var arrayOfLetters = eachWord.split(''); //[['w','o','r','d'],...]
		return arrayOfLetters;
	});
	return wordArray_with_letterArray;
};

var applyPencil = (wordsToWrite, originalDurability) => {
	let wordsAppliedToArray = [];
	var durability = originalDurability;

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

var degrade = (originalAmount, howMuchToDegrade) => {
	return originalAmount - howMuchToDegrade;
};

var writeLetter = (value, writeArray, durability) => {
	let letterCost = value[0];

	if (checkIfLetterCanBeWritten(letterCost, durability)) {
		return [degrade(durability, letterCost), writeArray];
	} else {
		//value[2] = wordIndex, value[3] = letterIndex
		writeArray[value[2]][value[3]] = '';
		return [durability, writeArray];
	}
};

function* iterateOverEntireArray(array) {
	var wordIndex = 0;
	//while loops over each word
	while (wordIndex < array.length) {
		//for loops over each letter
		for (
			var letterIndex = 0;
			letterIndex < array[wordIndex].length;
			letterIndex++
		) {
			let letter = array[wordIndex][letterIndex];
			let letterCost = 1;
			if (letter == letter.toUpperCase()) letterCost = 2; //is uppercase
			if (!isNaN(letter * 1)) letterCost = 1; //is a number
			if (letter === '\n') letterCost = 0; //is carrage return
			yield [letterCost, letter, wordIndex, letterIndex];
		}
		wordIndex++;
		yield [0, wordIndex - 1, wordIndex];
	}

	yield 'done';
}

var checkIfLetterCanBeWritten = (letterCost, durabilityFactor) => {
	if (durabilityFactor >= letterCost) {
		return true;
	} else {
		return false;
	}
};

var eraseLetters = (word, amountOfLetters, durability) => {
	var newWord = [];
	var eraserDurability = durability;
	var lettersRemaining = amountOfLetters;
	word.reverse().forEach(letter => {
		if (eraserDurability > 0 && lettersRemaining > 0 && letter !== ' ') {
			newWord = [...newWord, ' '];
			eraserDurability = degrade(eraserDurability, 1);
			lettersRemaining = lettersRemaining - 1;
		} else {
			newWord = [...newWord, letter];
		}
	});

	return [newWord.reverse(), eraserDurability];
};
