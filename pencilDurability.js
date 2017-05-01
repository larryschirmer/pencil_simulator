var { assert } = require("chai");
var { expect } = require("chai");

var parseWords = wordString => {
	assert.typeOf(wordString, "string", "wordString is a string");
	var wordArray = wordString.split(" "); //['word','word']
	var wordArray_with_letterArray = wordArray.map(eachWord => {
		var arrayOfLetters = eachWord.split(""); //[['w','o','r','d'],...]
		return arrayOfLetters;
	});
	return wordArray_with_letterArray;
};

class Pencil {
	constructor(degradation = 0) {
		this.wordsToWrite = [];
		this.degradation = degradation;
	}

	write(words) {
		this.wordsToWrite = parseWords(words);
		return this;
	}

	on(paper = []) {
		let newPaper;

		let empty_text = "";
		this.wordsToWrite = empty_text;
		return newPaper;
	}
}

var showPaper = paper => {
	let writing = paper.join("");
	assert.typeOf(writing, "string", "writing is a string");
};

const ticonderoga = new Pencil(4);

let collegeRule = ticonderoga.write("Hello world 42"); //.on();

//showPaper(collegeRule);

/*
collegeRule = ticonderoga
	.write("hello world \nI still love you")
	.on(collegeRule);

showPaper(collegeRule);
*/

function canWriteLetter(letterCost, durabilityFactor) {
	if (durabilityFactor >= letterCost) {
		return true;
	} else {
		return false;
	}
}

//Messy Letter Iterator
var dura = 5;
var array = [["H", "e", "l", "l", "o"], ["w", "o", "r", "l", "d"], ["4", "2"]];

function* arrayIterator(array) {
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

var gen = arrayIterator(array);

function writeLetter(value, writeArray) {
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
	if (canWriteLetter(letterCost, dura)) {
		dura = dura - letterCost;
	} else {
		array[value[2]][value[3]] = " ";
		expect(dura).to.be.below(letterCost);
	}
}

(function itter() {
	let value = gen.next().value;
	writeLetter(value, array);
	if (value !== "done") {
		itter();
	} else {
		console.log(array);
	}
})();
