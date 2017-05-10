'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { hasNegitive, hasString, throwError } = require('../wrap_pencilInterface');

describe('Pencil Interface Coverage Tests', function() {
      //beforeEach(function() {});

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
});
