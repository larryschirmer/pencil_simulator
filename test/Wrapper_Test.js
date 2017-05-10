'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { roundDown, hasNegitive, hasString, throwError, getCost, degrade } = require('../wrapper');

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
});
