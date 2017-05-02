var { assert, expect } = require("chai");
var { Pencil, showPaper, pencilStats, sharpen } = require("./helperCode");

const ticonderoga = new Pencil(32);

let collegeRule = ticonderoga.write("Hello world 42").on();

showPaper(collegeRule);

collegeRule = ticonderoga
	.write("hello world \nI still love you")
	.on(collegeRule);

showPaper(collegeRule);

pencilStats(ticonderoga);
sharpen(ticonderoga);
pencilStats(ticonderoga);

collegeRule = ticonderoga.write("sorry, got cut off there").on(collegeRule);

showPaper(collegeRule);
