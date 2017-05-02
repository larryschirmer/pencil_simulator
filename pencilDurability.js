var { assert, expect } = require('chai');
var { Pencil, showPaper, pencilStats, sharpen } = require('./helperCode');

const ticonderoga = new Pencil(32);

let collegeRule = [];

collegeRule = ticonderoga.write('Hello world 42').on(collegeRule);
showPaper(collegeRule);

collegeRule = ticonderoga
	.write('hello world \nI still love you')
	.on(collegeRule);
showPaper(collegeRule);

sharpen(ticonderoga);

pencilStats(ticonderoga);

collegeRule = ticonderoga.write('sorry, got cut off there').on(collegeRule);
showPaper(collegeRule);
