'use strict';
let { throwError } = require('./wrapper');
let { Pencil } = require('./pencilInterface');

let showPaper = paper => {
      console.log(`---\n${paper}\n---`);
};

let inspect = pencil => {
      let inputIsOk = pencil instanceof Pencil;
      if (!inputIsOk) throwError('inspectionType');
      console.log(
            `---\nPencil Degradation: ${pencil.inspect.point()}\nPencil Eraser Degradation: ${pencil.inspect.eraser()}\nPencil Length: ${pencil.inspect.length()}\n---`
      );
};

module.exports = {
      showPaper,
      inspect
};
