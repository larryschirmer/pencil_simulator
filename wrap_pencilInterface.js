'use strict';

let hasNegitive = params => {
      let state = false;
      for (let key in params)
            if (params[key] < 0) state = true;
      return state;
};

let hasString = params => {
      let state = false;
      for (let key in params) {
            if (typeof params[key] === 'string') state = true;
      }

      return state;
};

let throwError = error => {
      switch (error) {
            case 'negitive':
                  throw new TypeError('new Pencil may not have negitive properties');
                  break;
            case 'string':
                  throw new TypeError('new Pencil may not have a string property');
                  break;
            case 'editRange':
                  throw new RangeError('cannot edit, editor has exceeded edge of paper');
                  break;
      }
};

module.exports = {
      hasNegitive,
      hasString,
      throwError
};
