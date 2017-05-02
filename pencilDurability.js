var { assert, expect } = require('chai');
var { Pencil, showPaper, pencilStats, sharpen } = require('./helperCode');

const ticonderoga = new Pencil(320, 5);
pencilStats(ticonderoga);

let collegeRule = [];

collegeRule = ticonderoga
	.write('I hear its nice this time of year')
	.on(collegeRule);

showPaper(collegeRule);

var erase_opt = {
	word: 7,
	amt: 10
};
collegeRule = ticonderoga.erase(erase_opt).from(collegeRule);

collegeRule = ticonderoga.write('month').on(collegeRule);

showPaper(collegeRule);
pencilStats(ticonderoga);
