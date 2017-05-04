'use strict';

var { assert, expect } = require('chai');
var { showPaper, inspect } = require('../view');
var { Pencil } = require('../pencilLogic');

describe('new Pencil()', function() {
	it('makes a new pencil when positive intergers are passed', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 32;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.deepEqual(
			[graphiteDegradationStrength, eraserDegradationStrength],
			[prismacolor.degradation, prismacolor.eraserDegradation]
		);
	});

	it('handles float parameters by rounding value down', function() {
		let graphiteDegradationStrength = 32.3, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let roundedVal = Math.floor(graphiteDegradationStrength);
		assert.deepEqual(
			[roundedVal, eraserDegradationStrength],
			[prismacolor.degradation, prismacolor.eraserDegradation]
		);
	});

	it('handles negitive parameters by throwing an error', function() {
		let graphiteDegradationStrength = -32, eraserDegradationStrength = 10;
		expect(_ => {
			const prismacolor = new Pencil(
				graphiteDegradationStrength,
				eraserDegradationStrength
			);
		}).to.throw('new Pencil may not have negitive properties');
	});

	it('handles string parameters by throwing an error', function() {
		let graphiteDegradationStrength = '32', eraserDegradationStrength = 10;
		expect(_ => {
			const prismacolor = new Pencil(
				graphiteDegradationStrength,
				eraserDegradationStrength
			);
		}).to.throw('new Pencil may not have a string property');
	});
});

describe('pencil.write()', function() {
	it('should exist', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.isFunction(prismacolor.write);
	});
	it('should return an Array of Arrays of strings for each letter', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		prismacolor.write('Hello World');

		assert.deepEqual(prismacolor.wordsToWrite, [
			['H', 'e', 'l', 'l', 'o'],
			['W', 'o', 'r', 'l', 'd']
		]);
	});
	it('should append an empty array for extra spaces', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		var arrayToCheck = prismacolor.write('Hello   World ').wordsToWrite;

		assert.deepEqual(arrayToCheck, [
			['H', 'e', 'l', 'l', 'o'],
			[],
			[],
			['W', 'o', 'r', 'l', 'd'],
			[]
		]);
	});
	it('handle special characters', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		var arrayToCheck = prismacolor.write(' !"#$%&()*+,-./:;<=>?@[]^_`{|}~')
			.wordsToWrite;

		assert.deepEqual(arrayToCheck, [
			[],
			[
				'!',
				'"',
				'#',
				'$',
				'%',
				'&',
				'(',
				')',
				'*',
				'+',
				',',
				'-',
				'.',
				'/',
				':',
				';',
				'<',
				'=',
				'>',
				'?',
				'@',
				'[',
				']',
				'^',
				'_',
				'`',
				'{',
				'|',
				'}',
				'~'
			]
		]);
	});
	it('should stop writing when full point degradation is reached', function() {
		const prismacolor = new Pencil(8, 5);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);
		assert.deepEqual(easel, [['H', 'e', 'l', 'l', 'o'], ['W', '', '', '', '']]);
	});
});
describe('pencil.sharpen()', function() {
	it('restores the point to original health after use', function() {});
});

/*
describe('', function() {
	it('', function() {

	})
})
*/
