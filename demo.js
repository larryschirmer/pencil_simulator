'use strict';
let { showPaper, inspect } = require('./view');
let { Pencil } = require('./pencilLogic');

//Create the world's best pencil
let pointStrength = 50, eraserDexterity = 10, lengthOfPencil = 10;
const ticonderoga = new Pencil(pointStrength, eraserDexterity, lengthOfPencil);

//Create some Cardstock Paper
let cardStock = [];

//Begin Writing
cardStock = ticonderoga.write('Hello World').on(cardStock);

//Look at Your Work
showPaper(cardStock);

//Erase all of the word 'World'
let erase_opt = {
      word: 1,
      amt: 5
};
cardStock = ticonderoga.erase(erase_opt).from(cardStock);

//Where the word 'World was is now empty space',
//Here we fill it with the word 'Plant'
let edit_opts = {
      char_number: 6,
      word: 'Plant'
};
cardStock = ticonderoga.edit(edit_opts).into(cardStock);

inspect(ticonderoga);
ticonderoga.sharpen();
inspect(ticonderoga);
