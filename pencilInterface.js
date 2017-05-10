'use strict';
let { roundDown, hasNegitive, hasString, throwError } = require('./wrapper');

function Pencil(point = 0, eraser = 0, len = 0) {
      if (hasNegitive(arguments)) throwError('negitive');
      if (hasString(arguments)) throwError('string');

      let parameters = {
            pointStrength: roundDown(point),
            eraserDexterity: roundDown(eraser),
            length: roundDown(len)
      };

      const obj = {};
      Object.setPrototypeOf(obj, Pencil.prototype);

      function get(varName) {
            return parameters[varName];
      }

      obj.get = get;

      return obj;
}

module.exports = {
      Pencil
};
