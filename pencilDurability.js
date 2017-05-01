var { assert } = require("chai");

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
	constructor(degradation) {
		this.wordsToWrite = [];
		this.degradation = degradation;
	}

	write(words) {
		this.wordsToWrite = parseWords(words);
		return this;
	}

	on(paper = []) {
		let newPaper = [...paper, this.wordsToWrite];
		let empty_text = "";
		this.wordsToWrite = empty_text;
		return newPaper;
	}
}

var showPaper = paper => {
	let writing = paper.join("");
	assert.typeOf(writing, "string", "writing is a string");
};

const ticonderoga = new Pencil();

let collegeRule = ticonderoga.write("hello world").on();

//showPaper(collegeRule);

/*
collegeRule = ticonderoga
	.write("hello world \nI still love you")
	.on(collegeRule);

showPaper(collegeRule);
*/
