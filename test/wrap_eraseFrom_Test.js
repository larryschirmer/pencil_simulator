'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let {
      convertToWordArray,
      convertToLetterArray,
      eraseLetters,
      restoreString
} = require('../wrap_eraseFrom');

describe('Erase.From. Coverage Tests', function() {
      //beforeEach(function() {});

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
