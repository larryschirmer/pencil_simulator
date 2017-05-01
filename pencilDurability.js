var { assert } = require("chai");

class Pencil {
	constructor() {
		wordsToWrite: ("");
	}

	write(words) {
		this.wordsToWrite = words;
		return this;
	}

	on(paper) {
		collegeRule = [...collegeRule, this.wordsToWrite];
		let empty_text = "";
		this.wordsToWrite = empty_text;
	}
}

var showPaper = paper => {
	console.log(paper.join(""));
};

const ticonderoga = new Pencil();
let collegeRule = [];

ticonderoga.write("hello world").on(collegeRule);

showPaper(collegeRule);
