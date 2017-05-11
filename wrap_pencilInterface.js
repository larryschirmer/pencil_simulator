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

module.exports = {
      hasNegitive,
      hasString
};
