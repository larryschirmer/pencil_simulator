'use strict';
let { showPaper, inspect } = require('./view');
let { Pencil } = require('./pencilLogic');

//Create the world's best pencil
let pointStrength = 50, eraserDexterity = 10, lengthOfPencil = 10;
const ticonderoga = new Pencil(pointStrength, eraserDexterity, lengthOfPencil);

//Create some Cardstock Paper
let cardStock = [];

//Begin Writing
cardStock = ticonderoga.write('Hello Word').on(cardStock);

showPaper(cardStock);
