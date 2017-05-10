'use strict';

let log = arr => {
      arr.forEach(variable => {
            console.log(`variable: ${JSON.stringify(variable)}`);
      });
};

let roundDown = variable => {
      return Math.floor(variable);
};

let isNegitive = params => {
      let state = false;
      for (let key in params)
            if (params[key] < 0) state = true;
      return state;
};

let isString = params => {
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
      }
};

module.exports = {
      roundDown,
      isNegitive,
      isString,
      throwError
};
