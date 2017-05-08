'use strict';
let { showPaper, inspect } = require('./view');
let { Pencil } = require('./pencilLogic');

let graphiteDegradationStrength = 75, eraserDegradationStrength = 32, lengthOfPencil = 5;
const prismacolor = new Pencil(
      graphiteDegradationStrength,
      eraserDegradationStrength,
      lengthOfPencil
);
let easel = [];
easel = prismacolor.write('Hello').on(easel);
easel = prismacolor.write('Dolores').on(easel);
easel = prismacolor.write('\nWelcome to World').on(easel);
let erase_opt = {
      word: 1,
      amt: 7
};
easel = prismacolor.erase(erase_opt).from(easel);

let edit_opts = {
      char_number: 6,
      word: 'Awesome'
};
easel = prismacolor.edit(edit_opts).into(easel);

showPaper(easel);
