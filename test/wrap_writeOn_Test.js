'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { writeWord } = require('../wrap_writeOn');

describe('Write.On. Coverage Tests', function() {
      //beforeEach(function() {});

      describe('writeWord()', function() {
            let string;
            let health;
            beforeEach(function() {
                  string = 'hello';
                  health = 2;
            });

            it('exists', function() {
                  assert.isOk(writeWord);
            });

            it('returns substring of original string', function() {
                  assert.deepEqual(writeWord(string, health), 'he');
            });
      });
});
