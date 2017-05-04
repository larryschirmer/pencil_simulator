'use strict';
var { showPaper, inspect } = require('./view');
var { Pencil } = require('./pencilLogic');
/*
const ticonderoga = new Pencil(38, 5);

inspect(ticonderoga);

let collegeRule = [];

collegeRule = ticonderoga.write('Hello World').on(collegeRule);
console.log(JSON.stringify(collegeRule));
inspect(ticonderoga);
showPaper(collegeRule);
*/

let graphiteDegradationStrength = 320, eraserDegradationStrength = 10;
const prismacolor = new Pencil(
	graphiteDegradationStrength,
	eraserDegradationStrength
);

let easel = [];
easel = prismacolor.write('Hello Dolores').on(easel);
showPaper(easel);

easel = prismacolor.write('\nWelcome to World').on(easel);

showPaper(easel);

console.log(JSON.stringify(easel));
