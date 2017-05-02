var { assert, expect } = require("chai");
var {
	parseWords,
	showPaper,
	canWriteLetter,
	usePencilOn,
	pencilStats
} = require("./helperCode");

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
		let newPaper = [];
		let penciledResult = usePencilOn(this.wordsToWrite, this.degradation);
		newPaper = penciledResult[0];
		this.degradation = penciledResult[1];
		let empty_text = "";
		this.wordsToWrite = empty_text;
		return newPaper;
	}
}

const ticonderoga = new Pencil(32);

let collegeRule = ticonderoga.write("Hello world 42").on();

showPaper(collegeRule);

collegeRule = ticonderoga
	.write("hello world \nI still love you")
	.on(collegeRule);

showPaper(collegeRule);

pencilStats(ticonderoga);
