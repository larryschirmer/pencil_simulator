'use strict';
var { showPaper, inspect } = require('./view');
var { Pencil } = require('./pencilLogic');

const ticonderoga = new Pencil(38, 5);

inspect(ticonderoga);

let collegeRule = [];

collegeRule = ticonderoga.write('Hello World').on(collegeRule);

inspect(ticonderoga);
