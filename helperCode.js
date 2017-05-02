var { assert, expect } = require('chai');

class Pencil {
	constructor(degradation = 0, eraserDegradation = 0) {
		this.wordsToWrite = [];
		this.wordsToErase = [];
		this.OriginalDegradation = degradation;
		this.degradation = degradation;
		this.eraserDegradation = eraserDegradation;
	}

	write(words) {
		this.wordsToWrite = parseWords(words);
		return this;
	}

	erase(opt) {
		this.wordsToErase = [opt.word, opt.amt];
		return this;
	}

	on(paper) {
		let newPaper = [];
		let penciledResult = usePencilOn(this.wordsToWrite, this.degradation);
		newPaper = [...paper, ...penciledResult[0]];
		this.degradation = penciledResult[1];
		let empty_text = '';
		this.wordsToWrite = empty_text;
		return newPaper;
	}

	from(paper) {
		var newPaper = paper;
		var word = this.wordsToErase[0];
		var amountOfLetters = this.wordsToErase[1];
		var processedWord = eraseLetters(
			paper[word],
			amountOfLetters,
			this.eraserDegradation
		);
		newPaper[word] = processedWord[0];
		this.eraserDegradation = processedWord[1];
		return newPaper;
	}
}

var eraseLetters = (word, amountOfLetters, eraserDurability) => {
	var newWord = [];
	var newEraserDurability = eraserDurability;
	var lettersRemaining = amountOfLetters;
	word.reverse().forEach(letter => {
		if (newEraserDurability > 0 && lettersRemaining > 0 && letter !== ' ') {
			newWord = [...newWord, ' '];
			newEraserDurability = newEraserDurability - 1;
			lettersRemaining = lettersRemaining - 1;
		} else {
			newWord = [...newWord, letter];
		}
	});

	return [newWord.reverse(), newEraserDurability];
};

var parseWords = wordString => {
	assert.typeOf(wordString, 'string', 'wordString is a string');
	var wordArray = wordString.split(' '); //['word','word']
	var wordArray_with_letterArray = wordArray.map(eachWord => {
		var arrayOfLetters = eachWord.split(''); //[['w','o','r','d'],...]
		return arrayOfLetters;
	});
	return wordArray_with_letterArray;
};

var showPaper = paper => {
	let writing = '';
	paper.forEach((word, i, arr) => {
		if (i < arr.length) {
			writing = writing + word.join('');
			writing = writing + ' ';
		}
	});
	assert.typeOf(writing, 'string', 'writing is a string');
	console.log(`---\n${writing}\n---`);
};

var pencilStats = pencil => {
	console.log(`Pencil Degradation: ${pencil.degradation}`);
	console.log(`Pencil Eraser Degradation: ${pencil.eraserDegradation}`);
};

var canWriteLetter = (letterCost, durabilityFactor) => {
	if (durabilityFactor >= letterCost) {
		return true;
	} else {
		return false;
	}
};

function* iterateArray(array) {
	var index = 0;
	while (index < array.length) {
		for (var i = 0; i < array[index].length; i++) {
			let letter = array[index][i];
			let uppercase = false;
			if (letter == letter.toUpperCase()) uppercase = true;
			if (!isNaN(letter * 1)) uppercase = false;
			if (letter === '\n') uppercase = 'newline';
			yield [uppercase, letter, index, i];
		}
		index++;
		yield ['space', index - 1, index];
	}

	yield 'done';
}

var writeLetter = (value, writeArray, durability) => {
	let letterCost = 0;
	switch (value[0]) {
		case true:
			letterCost = 2;
			break;
		case false:
			letterCost = 1;
			break;
		default:
	}
	if (canWriteLetter(letterCost, durability)) {
		durability = durability - letterCost;
		return [durability, writeArray];
	} else {
		writeArray[value[2]][value[3]] = '';
		return [durability, writeArray];
		expect(durability).to.be.below(letterCost);
	}
};

var usePencilOn = (wordsToWrite, durability) => {
	assert.typeOf(wordsToWrite, 'array', 'wordsToWrite usePencilOn');

	let penciledArray = [];
	var durability = durability;

	let get = iterateArray(wordsToWrite);

	function iterateOverWordsToWrite() {
		let value = get.next().value;

		returnedArray = writeLetter(value, wordsToWrite, durability);
		durability = returnedArray[0];
		penciledArray = returnedArray[1];

		if (value !== 'done') {
			return iterateOverWordsToWrite();
		} else {
			return [penciledArray, durability];
		}
	}

	return iterateOverWordsToWrite();
};

var sharpen = pencil => {
	assert.instanceOf(pencil, Pencil, 'pencil is a Pencil');
	pencil.degradation = pencil.OriginalDegradation;
};

module.exports = {
	Pencil: Pencil,
	showPaper: showPaper,
	pencilStats: pencilStats,
	sharpen: sharpen
};
