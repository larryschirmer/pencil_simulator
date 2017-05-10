'use strict';

let { assert, expect } = require('chai');
const nativeAssert = require('assert');

let { isNum, roundDown, degrade } = require('../wrapper');

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
});
