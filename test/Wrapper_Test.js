'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let {
      roundDown,
      hasNegitive,
      hasString,
      throwError,
      getCost,
      degrade,
      writeWord,
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
} = require('../wrapper');

describe('Wrapper Coverage Tests', function() {
      //beforeEach(function() {});

      describe('roundDown()', function() {
            it('exists', function() {
                  assert.isOk(roundDown);
            });

            it('rounds a number down', function() {
                  assert.deepEqual(roundDown(10.5), 10);
            });
      });

      describe('hasNegitive()', function() {
            let PosObj = {
                  1: 10,
                  2: 20,
                  3: 30
            };
            let NegObj = {
                  1: -10,
                  2: 20,
                  3: 30
            };

            it('exists', function() {
                  assert.isOk(hasNegitive);
            });

            it('returns true if a value in an object is negitive', function() {
                  assert.deepEqual(hasNegitive(NegObj), true);
            });
            it('returns false if there is no negitive value in an object', function() {
                  assert.deepEqual(hasNegitive(PosObj), false);
            });
      });

      describe('hasString()', function() {
            let NumObj = {
                  1: 10,
                  2: 20,
                  3: 30
            };
            let StrObj = {
                  1: 10,
                  2: 20,
                  3: '30'
            };

            it('exists', function() {
                  assert.isOk(hasString);
            });

            it('returns true if a value in an object has a string', function() {
                  assert.deepEqual(hasString(StrObj), true);
            });
            it('returns false if there is no string value in an object', function() {
                  assert.deepEqual(hasString(NumObj), false);
            });
      });

      describe('throwError()', function() {
            it('exists', function() {
                  assert.isOk(throwError);
            });

            it('throws a negitive new Pencil TypeError', function() {
                  expect(_ => {
                        throwError('negitive');
                  }).to.throw('new Pencil may not have negitive properties');
            });

            it('throws a string new Pencil TypeError', function() {
                  expect(_ => {
                        throwError('string');
                  }).to.throw('new Pencil may not have a string property');
            });
      });

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

      describe('degrade()', function() {
            let strength;
            beforeEach(function() {
                  strength = 5;
            });

            it('exists', function() {
                  assert.isOk(degrade);
            });

            it('returns the proper degraded health', function() {
                  let cost = 3;
                  assert.deepEqual(degrade(cost, strength), 2);
            });

            it('returns 0 if amount is over degraded', function() {
                  let cost = 7;
                  assert.deepEqual(degrade(cost, strength), 0);
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

      describe('convertToWordArray()', function() {
            let string;
            beforeEach(function() {
                  string = 'hello world';
            });

            it('exists', function() {
                  assert.isOk(convertToWordArray);
            });

            it('returns an array of sepperate words', function() {
                  assert.deepEqual(convertToWordArray(string), ['hello', 'world']);
            });
      });

      describe('convertToLetterArray()', function() {
            let string;
            beforeEach(function() {
                  string = 'hello';
            });

            it('exists', function() {
                  assert.isOk(convertToLetterArray);
            });

            it('returns an array of sepperate words', function() {
                  assert.deepEqual(convertToLetterArray(string), ['h', 'e', 'l', 'l', 'o']);
            });
      });

      describe('eraseLetters()', function() {
            let arr, remove, wordNumber;
            beforeEach(function() {
                  arr = ['hello'];
                  wordNumber = 0;
            });

            it('exists', function() {
                  assert.isOk(eraseLetters);
            });

            it('should remove partial words in reverse letter order', function() {
                  remove = 2;
                  assert.deepEqual(eraseLetters(remove, wordNumber, arr), [
                        ['h', 'e', 'l', ' ', ' ']
                  ]);
            });

            it('should remove whole words', function() {
                  remove = 5;
                  assert.deepEqual(eraseLetters(remove, wordNumber, arr), [
                        [' ', ' ', ' ', ' ', ' ']
                  ]);
            });

            it('should stop removing letters when word length is reached', function() {
                  remove = 15;
                  assert.deepEqual(eraseLetters(remove, wordNumber, arr), [
                        [' ', ' ', ' ', ' ', ' ']
                  ]);
            });
      });

      describe('restoreString()', function() {
            let string;
            beforeEach(function() {
                  string = [['h', 'e', 'l', 'l', 'o']];
            });

            it('exists', function() {
                  assert.isOk(restoreString);
            });

            it('returns a string from an array', function() {
                  assert.deepEqual(restoreString(string), 'hello');
            });
      });
});
