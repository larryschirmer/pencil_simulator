'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { Pencil } = require('../pencilInterface');
let { roundDown } = require('../wrapper');

describe('new Pencil()', function() {
      //beforeEach(function() {});

      describe('Pencil Class', function() {
            //Success Cases
            it('exists', function() {
                  let pointStrength = 50, eraserDexterity = 10, length = 10;
                  const pencil_Truthy = new Pencil(pointStrength, eraserDexterity, length);
                  assert.isOk(pencil_Truthy);
            });

            it('makes a new pencil when positive intergers are passed', function() {
                  let pointStrength = 50, eraserDexterity = 10, length = 10;
                  const pencil_CorrectParams = new Pencil(pointStrength, eraserDexterity, length);
                  assert.deepEqual(
                        [pointStrength, eraserDexterity, length],
                        [
                              pencil_CorrectParams.get('pointStrength'),
                              pencil_CorrectParams.get('eraserDexterity'),
                              pencil_CorrectParams.get('length')
                        ]
                  );
            });

            it('handles float parameters by rounding value down', function() {
                  let pointStrength = 50.1, eraserDexterity = 10.1, length = 10.1;
                  const pencil_Float = new Pencil(pointStrength, eraserDexterity, length);

                  assert.deepEqual(
                        [roundDown(pointStrength), roundDown(eraserDexterity), roundDown(length)],
                        [
                              pencil_Float.get('pointStrength'),
                              pencil_Float.get('eraserDexterity'),
                              pencil_Float.get('length')
                        ]
                  );
            });

            //Graceful Fail Cases
            it('handles negitive parameters by throwing an error', function() {
                  expect(_ => {
                        let pointStrength = -50, eraserDexterity = -10, length = -10;
                        const pencil_Negitive = new Pencil(pointStrength, eraserDexterity, length);
                  }).to.throw('new Pencil may not have negitive properties');
            });

            it('handles string parameters by throwing an error', function() {
                  expect(_ => {
                        let pointStrength = '50', eraserDexterity = '10', length = '10';
                        const pencil_String = new Pencil(pointStrength, eraserDexterity, length);
                  }).to.throw('new Pencil may not have a string property');
            });
      });

      describe('pencil.write()', function() {
            let pointStrength = 50, eraserDexterity = 10, length = 10, pencil;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
            });

            it('exists', function() {
                  assert.isOk(pencil.write);
            });

            it('returns its parent class', function() {
                  assert.deepEqual(pencil.write('') instanceof Pencil, true);
            });
      });

      describe('pencil.on()', function() {
            let pointStrength = 11, eraserDexterity = 10, length = 10, pencil;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  pencil.write('Hello');
            });

            it('exists', function() {
                  assert.isOk(pencil.on);
            });

            it('returns a string of characters stored from .write()', function() {
                  assert.deepEqual(pencil.on(), 'Hello');
            });

            it('returns a new string from .write() and a previous string', function() {
                  let paper = pencil.on();
                  assert.deepEqual(pencil.write(' World').on(paper), 'Hello World');
            });

            it('stops appending characters if tip is degraded', function() {
                  let paper = pencil.on();
                  assert.deepEqual(pencil.write(' Worlds').on(paper), 'Hello World');
            });
      });

      describe('pencil.erase()', function() {
            let pointStrength = 50, eraserDexterity = 10, length = 10, pencil;
            let erase_opt;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  erase_opt = {
                        word: 1,
                        amt: 5
                  };
            });

            it('exists', function() {
                  assert.isOk(pencil.erase);
            });

            it('returns its parent class', function() {
                  assert.deepEqual(pencil.erase(erase_opt) instanceof Pencil, true);
            });
      });

      describe('pencil.from()', function() {
            let pointStrength = 11, eraserDexterity = 10, length = 10, pencil, paper, erase_opt;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  paper = 'hello world, hello eraseing';
            });

            it('exists', function() {
                  assert.isOk(pencil.from);
            });

            it('should remove partial words in reverse letter order', function() {
                  erase_opt = { word: 1, amt: 3 };
                  assert.deepEqual(
                        pencil.erase(erase_opt).from(paper),
                        'hello wor    hello eraseing'
                  );
            });

            it('should remove whole words', function() {
                  erase_opt = { word: 1, amt: 6 };
                  assert.deepEqual(
                        pencil.erase(erase_opt).from(paper),
                        'hello        hello eraseing'
                  );
            });

            it('should stop removing letters when word length is reached', function() {
                  erase_opt = { word: 1, amt: 6 };
                  assert.deepEqual(
                        pencil.erase(erase_opt).from(paper),
                        'hello        hello eraseing'
                  );
            });

            it('should erase a second word', function() {
                  erase_opt = { word: 1, amt: 15 };
                  paper = pencil.erase(erase_opt).from(paper);
                  erase_opt = { word: 3, amt: 3 };
                  assert.deepEqual(
                        pencil.erase(erase_opt).from(paper),
                        'hello        hello erase   '
                  );
            });
      });

      describe('pencil.edit()', function() {
            let pointStrength = 50, eraserDexterity = 10, length = 10, pencil, paper, edit_opts;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  edit_opts = {
                        char_number: 6,
                        word: 'Plant'
                  };
            });

            it('exists', function() {
                  assert.isOk(pencil.edit);
            });

            it('returns its parent class', function() {
                  assert.deepEqual(pencil.edit(edit_opts) instanceof Pencil, true);
            });
      });
      /*
      describe('pencil.into()', function() {
            let pointStrength = 11, eraserDexterity = 10, length = 10;
            let pencil, paper, erase_opt, edit_opts;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  paper = 'hello world, hello editing';
                  erase_opt = {
                  word: 1,
                  amt: 6
            };
            easel = prismacolor.erase(erase_opt).from(easel);
            });

            it('exists', function() {
                  assert.isOk(pencil.into);
            });

            it('writes over empty text on a paper', function() {
                  erase_opt = {
                        word: 1,
                        amt: 2
                  };
                  assert.deepEqual(pencil.erase(erase_opt).from(paper), 'hello wor  ');
            });

            it('combines words together where necessary', function() {
                  erase_opt = {
                        word: 1,
                        amt: 5
                  };
                  assert.deepEqual(pencil.erase(erase_opt).from(paper), 'hello      ');
            });

            it('edits new text and skips white space', function() {
                  erase_opt = {
                        word: 1,
                        amt: 15
                  };
                  assert.deepEqual(pencil.erase(erase_opt).from(paper), 'hello      ');
            });

            it('throws RangeError when asked to edit too many characters', function() {
                  erase_opt = {
                        word: 1,
                        amt: 15
                  };
                  expect(_ => {
                        easel = prismacolor.edit(edit_opts).into(easel);
                  }).to.throw('cannot edit, editor has exceeded edge of paper');
            });

            it('stops editing when point strength is too low', function() {
                  erase_opt = {
                        word: 1,
                        amt: 15
                  };
                  assert.deepEqual(pencil.erase(erase_opt).from(paper), 'hello      ');
            });
      });
      */
});
