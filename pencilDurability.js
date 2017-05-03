'use strict';
var { showPaper, inspect } = require('./view');
var { Pencil } = require('./pencilLogic');

const ticonderoga = new Pencil(320, 5);

inspect(ticonderoga);

let collegeRule = [];

collegeRule = ticonderoga.write('Title:  Hamsters  Do  Eat').on(collegeRule);

showPaper(collegeRule);
