'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');
const sinon = require('sinon');
let spy = sinon.spy(console, 'log');

let { Pencil } = require('../pencilInterface');

describe('View API', function() {
      //beforeEach(function() {});

      describe('showPaper', function() {
            let pointStrength = 12, eraserDexterity = 10, length = 10, pencil;

            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
                  pencil.write('Hello');
            });

            it('exists', function() {
                  assert.isOk(showPaper);
            });

            it('displays words written to a paper', function() {
                  showPaper(easel);
                  nativeAssert(spy.calledWith('---\nHello\n---'));
            });
      });

      describe('inspect', function() {
            let pointStrength = 50, eraserDexterity = 10, length = 10, pencil;
            beforeEach(function() {
                  pencil = new Pencil(pointStrength, eraserDexterity, length);
            });

            it('exists', function() {
                  assert.isOk(inspect);
            });

            it('handles inspecting non-pencils by throwing an error', function() {
                  expect(_ => {
                        inspect(pencil);
                  }).to.throw('inspect() can only inspect Pencil objects');
            });

            it('displays the status of the pencil in question', function() {
                  inspect(pencil);
                  nativeAssert(
                        spy.calledWith(
                              `---\nPencil Degradation: 50\nPencil Eraser Degradation: 10\nPencil Length: 10\n---`
                        )
                  );
            });
      });
});
