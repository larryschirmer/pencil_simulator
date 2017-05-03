var { assert, expect } = require('chai');
var { Pencil, showPaper, pencilStats, sharpen } = require('./helperCode');

const ticonderoga = new Pencil(-320, 5);
console.log(`degradation: ${ticonderoga.degradation}`);

pencilStats(ticonderoga);

let collegeRule = [];

collegeRule = ticonderoga
	.write('Title: Hamsters Do Eat Blueberries')
	.on(collegeRule);

showPaper(collegeRule);
/*



let stationary = [];

stationary = ticonderoga.write('My Dearest, You are so dear').on(stationary);
collegeRule = ticonderoga
	.write('Title: Hamsters Do Eat Blueberries')
	.on(collegeRule);

showPaper(stationary);

var erase_opt = {
	word: 5,
	amt: 10
};
stationary = ticonderoga.erase(erase_opt).from(stationary);

var erase_opt = {
	word: 4,
	amt: 10
};
stationary = ticonderoga.erase(erase_opt).from(stationary);

showPaper(stationary);

stationary = ticonderoga.write('such wow').on(stationary);

showPaper(stationary);

collegeRule = ticonderoga
	.write(
		'\nLab day One\nTerence does, in fact, eat the scientific blueberries we offer to him. On a scale from 1 to 7, he has rated them a 4'
	)
	.on(collegeRule);

showPaper(collegeRule);
pencilStats(ticonderoga);
*/
