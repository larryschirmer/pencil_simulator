'use strict';

let { editLetters } = require('../wrap_editInto');

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

describe('Edit.Into. Coverage Tests', function() {
      describe('editLetters()', function() {
            let paperArr, charToEdit, startEditAt, wordArr;
            beforeEach(function() {
                  paperArr = ['A', 'n', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'a'];
                  paperArr = [...paperArr, ' ', 'd', 'a', 'y', ' ', 'k', 'e', 'e', 'p', 's'];
                  paperArr = [...paperArr, ' ', 't', 'h', 'e', ' ', 'd', 'o', 'c', 't', 'o', 'r'];
                  paperArr = [...paperArr, ' ', 'a', 'w', 'a', 'y'];
            });
            let testResult0;
            testResult0 = ['A', 'n', ' ', 'o', 'n', 'i', 'o', 'n', ' ', 'a'];
            testResult0 = [...testResult0, ' ', 'd', 'a', 'y', ' ', 'k', 'e', 'e', 'p', 's'];
            testResult0 = [...testResult0, ' ', 't', 'h', 'e', ' ', 'd', 'o', 'c', 't', 'o', 'r'];
            testResult0 = [...testResult0, ' ', 'a', 'w', 'a', 'y'];

            let testResult1;
            testResult1 = ['A', 'n', ' ', 'a', 'r', 't', 'i', 'c', 'h', '@'];
            testResult1 = [...testResult1, 'k', '@', 'a', 'y', ' ', 'k', 'e', 'e', 'p', 's'];
            testResult1 = [...testResult1, ' ', 't', 'h', 'e', ' ', 'd', 'o', 'c', 't', 'o', 'r'];
            testResult1 = [...testResult1, ' ', 'a', 'w', 'a', 'y'];

            it('exists', function() {
                  assert.isOk(editLetters);
            });

            it('writes over empty text on a paper', function() {
                  (charToEdit = 5), (startEditAt = 3);
                  wordArr = ['o', 'n', 'i', 'o', 'n'];
                  assert.deepEqual(
                        editLetters(paperArr, charToEdit, startEditAt, wordArr),
                        testResult0
                  );
            });

            it('correctly mutates character where there are character collisions', function() {
                  (charToEdit = 9), (startEditAt = 3);
                  wordArr = ['a', 'r', 't', 'i', 'c', 'h', 'o', 'k', 'e'];
                  assert.deepEqual(
                        editLetters(paperArr, charToEdit, startEditAt, wordArr),
                        testResult1
                  );
            });
      });
});
