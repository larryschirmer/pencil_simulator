var { assert } = require("chai");

class Pencil {
	constructor() {
		this.wordsToWrite = "";
	}

	write(words) {
		this.wordsToWrite = words;
		assert.typeOf(words, "string", "words is a string");
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

showPaper(collegeRule);

collegeRule = ticonderoga
	.write("hello world \nI still love you")
	.on(collegeRule);

showPaper(collegeRule);
