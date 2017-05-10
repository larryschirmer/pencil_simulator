'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { getCost, writeWord } = require('../wrap_writeOn');

describe('Write.On. Coverage Tests', function() {
      //beforeEach(function() {});

      describe('getCost()', function() {
            it('exists', function() {
                  assert.isOk(getCost);
            });

            it('returns 2 if the character is Uppercase', function() {
                  assert.deepEqual(getCost('H'), 2);
            });

            it('returns 1 if the character is lowercase', function() {
                  assert.deepEqual(getCost('h'), 1);
            });

            it('returns 1 if the character is a number', function() {
                  assert.deepEqual(getCost('7'), 1);
            });

            it('returns 0 if the character is space', function() {
                  assert.deepEqual(getCost(' '), 0);
            });
      });

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
