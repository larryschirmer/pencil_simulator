'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { isNum, roundDown, degrade, getCost, throwError } = require('../wrapper');

describe('Wrapper Coverage Tests', function() {
      //beforeEach(function() {});

      describe('isNum()', function() {
            it('exists', function() {
                  assert.isOk(isNum);
            });

            it('returns true is character is a number', function() {
                  assert.deepEqual(isNum(1), true);
            });

            it('returns false is character is not a number', function() {
                  assert.deepEqual(isNum('a'), false);
            });
      });

      describe('roundDown()', function() {
            it('exists', function() {
                  assert.isOk(roundDown);
            });

            it('rounds a number down', function() {
                  assert.deepEqual(roundDown(10.5), 10);
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
