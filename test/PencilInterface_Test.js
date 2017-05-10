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
});
