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
	it('should stop writing when point degradation is reached', function() {
		const prismacolor = new Pencil(8, 5);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);
		assert.deepEqual(easel, [['H', 'e', 'l', 'l', 'o'], ['W', '', '', '', '']]);
	});
	it('should write new words to existing array', function() {
		let graphiteDegradationStrength = 320, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['D', 'o', 'l', 'o', 'r', 'e', 's'],
			['\n', 'W', 'e', 'l', 'c', 'o', 'm', 'e'],
			['t', 'o'],
			['W', 'o', 'r', 'l', 'd']
		]);
	});
});

describe('pencil.sharpen()', function() {
	it('should exist', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.isFunction(prismacolor.sharpen);
	});
	it('restores the point to original health after use', function() {
		const prismacolor = new Pencil(18, 5);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);
		prismacolor.sharpen();
		assert.equal(prismacolor.degradation, prismacolor.OriginalDegradation);
	});
});

describe('pencil.erase()', function() {
	it('should exist', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.isFunction(prismacolor.erase);
	});
	it('should remove partial words', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);

		var erase_opt = {
			word: 1,
			amt: 2
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['W', 'o', 'r', ' ', ' ']
		]);
	});

	it('should remove whole words', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);

		var erase_opt = {
			word: 1,
			amt: 5
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			[' ', ' ', ' ', ' ', ' ']
		]);
	});

	it('should stop removing letters when word length is reached', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);

		var erase_opt = {
			word: 1,
			amt: 15
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			[' ', ' ', ' ', ' ', ' ']
		]);
	});

	it('should stop removing letters when eraser heath is used up', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 3;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);

		var erase_opt = {
			word: 1,
			amt: 5
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['W', 'o', ' ', ' ', ' ']
		]);
	});
});

/*
describe('', function() {
	it('', function() {

		assert.deepEqual( , );
	})
})
*/
