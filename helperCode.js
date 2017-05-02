var { assert, expect } = require("chai");

class Pencil {
	constructor(degradation = 0) {
		this.wordsToWrite = [];
		this.OriginalDegradation = degradation;
		this.degradation = degradation;
	}

	write(words) {
		this.wordsToWrite = parseWords(words);
		return this;
	}

	on(paper = []) {
		let newPaper = [];
		let penciledResult = usePencilOn(this.wordsToWrite, this.degradation);
		newPaper = penciledResult[0];
		this.degradation = penciledResult[1];
		let empty_text = "";
		this.wordsToWrite = empty_text;
		return newPaper;
	}
}

var parseWords = wordString => {
	assert.typeOf(wordString, "string", "wordString is a string");
	var wordArray = wordString.split(" "); //['word','word']
	var wordArray_with_letterArray = wordArray.map(eachWord => {
		var arrayOfLetters = eachWord.split(""); //[['w','o','r','d'],...]
		return arrayOfLetters;
	});
	return wordArray_with_letterArray;
};

var showPaper = paper => {
	let writing = "";
	paper.forEach((word, i, arr) => {
		if (i < arr.length) {
			writing = writing + word.join("");
			writing = writing + " ";
		}
	});
	assert.typeOf(writing, "string", "writing is a string");
	console.log(`${writing}`);
};

var pencilStats = pencil => {
	console.log(`Pencil Degradation: ${pencil.degradation}`);
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
			yield [uppercase, letter, index, i];
		}
		index++;
		yield ["space", index - 1, index];
	}

	yield "done";
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
		writeArray[value[2]][value[3]] = "";
		return [durability, writeArray];
		expect(durability).to.be.below(letterCost);
	}
};

var usePencilOn = (wordsToWrite, durability) => {
	assert.typeOf(wordsToWrite, "array", "wordsToWrite usePencilOn");

	let penciledArray = [];
	var durability = durability;

	let get = iterateArray(wordsToWrite);

	function iterateOverWordsToWrite() {
		let value = get.next().value;

		returnedArray = writeLetter(value, wordsToWrite, durability);
		durability = returnedArray[0];
		penciledArray = returnedArray[1];

		if (value !== "done") {
			return iterateOverWordsToWrite();
		} else {
			return [penciledArray, durability];
		}
	}

	return iterateOverWordsToWrite();
};

var sharpen = pencil => {
	assert.instanceOf(pencil, Pencil, "pencil is a Pencil");
	pencil.degradation = pencil.OriginalDegradation;
};

module.exports = {
	Pencil: Pencil,
	showPaper: showPaper,
	pencilStats: pencilStats,
	sharpen: sharpen
};
