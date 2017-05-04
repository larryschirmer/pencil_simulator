'use strict';

var { assert, expect } = require('chai');
const sinon = require('sinon');
const nativeAssert = require('assert');
var { showPaper, inspect } = require('../view');
var { Pencil } = require('../pencilLogic');

let spy = sinon.spy(console, 'log');

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

	it('should skip over carrage returns', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello \nWorld').on(easel);

		var erase_opt = {
			word: 1,
			amt: 6
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['\n', ' ', ' ', ' ', ' ', ' ']
		]);
	});
});

describe('pencil.edit()', function() {
	it('should exist', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 5;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.isFunction(prismacolor.edit);
	});
	it('takes new text and writes over text on a paper', function() {
		let graphiteDegradationStrength = 75, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello').on(easel);
		easel = prismacolor.write('Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		var erase_opt = {
			word: 1,
			amt: 7
		};
		easel = prismacolor.erase(erase_opt).from(easel);

		let edit_opts = {
			char_number: 7,
			word: 'Awesome'
		};
		easel = prismacolor.edit(edit_opts).into(easel);
		assert.deepEqual(
			easel,
			assert.deepEqual(easel, [
				['H', 'e', 'l', 'l', 'o'],
				['A', 'w', 'e', 's', 'o', 'm', 'e'],
				['\n', 'W', 'e', 'l', 'c', 'o', 'm', 'e'],
				['t', 'o'],
				['W', 'o', 'r', 'l', 'd']
			])
		);
	});
	it('combines word arrays together where necessary', function() {
		let graphiteDegradationStrength = 75, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello').on(easel);
		easel = prismacolor.write('Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		var erase_opt = {
			word: 1,
			amt: 7
		};
		easel = prismacolor.erase(erase_opt).from(easel);
		let edit_opts = {
			char_number: 6,
			word: 'Awesome'
		};
		easel = prismacolor.edit(edit_opts).into(easel);
		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['A', 'w', 'e', 's', 'o', 'm', 'e'],
			['\n', 'W', 'e', 'l', 'c', 'o', 'm', 'e'],
			['t', 'o'],
			['W', 'o', 'r', 'l', 'd']
		]);
		edit_opts = {
			char_number: 15,
			word: 'pizza'
		};
		easel = prismacolor.edit(edit_opts).into(easel);
		edit_opts = {
			char_number: 22,
			word: 'e mezuzzah'
		};
		easel = prismacolor.edit(edit_opts).into(easel);
		assert.deepEqual(easel, [
			['H', 'e', 'l', 'l', 'o'],
			['A', 'w', 'e', 's', 'o', 'm', 'e'],
			[
				'\n',
				'@',
				'@',
				'@',
				'@',
				'@',
				'm',
				'e',
				'e',
				't',
				'@',
				'@',
				'@',
				'@',
				'@',
				'@',
				'@'
			]
		]);
	});
});

describe('showPaper()', function() {
	it('should exist', function() {
		assert.isFunction(showPaper);
	});
	it('displays words written to paper one time', function() {
		let graphiteDegradationStrength = 18, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello World').on(easel);
		showPaper(easel);
		nativeAssert(spy.calledWith('---\nHello World\n---'));
	});
	it('displays words written to the same paper three times', function() {
		let graphiteDegradationStrength = 75, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello').on(easel);
		easel = prismacolor.write('Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		showPaper(easel);
		nativeAssert(spy.calledWith('---\nHello Dolores \nWelcome to World\n---'));
	});
	it('displays a paper after one word is erased', function() {
		let graphiteDegradationStrength = 75, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello').on(easel);
		easel = prismacolor.write('Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		var erase_opt = {
			word: 2,
			amt: 4
		};
		easel = prismacolor.erase(erase_opt).from(easel);
		showPaper(easel);
		nativeAssert(spy.calledWith('---\nHello Dolores \nWel     to World\n---'));
	});
	it('displays a paper after three words are erased', function() {
		let graphiteDegradationStrength = 75, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		let easel = [];
		easel = prismacolor.write('Hello').on(easel);
		easel = prismacolor.write('Dolores').on(easel);
		easel = prismacolor.write('\nWelcome to World').on(easel);
		var erase_opt = {
			word: 2,
			amt: 4
		};
		easel = prismacolor.erase(erase_opt).from(easel);
		var erase_opt = {
			word: 3,
			amt: 1
		};
		easel = prismacolor.erase(erase_opt).from(easel);
		var erase_opt = {
			word: 0,
			amt: 3
		};
		easel = prismacolor.erase(erase_opt).from(easel);
		showPaper(easel);
		nativeAssert(spy.calledWith('---\nHe    Dolores \nWel     t  World\n---'));
	});
});

describe('inspect()', function() {
	it('should exist', function() {
		assert.isFunction(inspect);
	});
	it('handles inspecting non-pencils by throwing an error', function() {
		expect(_ => {
			const prismacolor = new Object(38, 5);
			inspect(prismacolor);
		}).to.throw('inspect() can only inspect Pencil objects');
	});
	it('displays the status of the pencil in question', function() {
		const prismacolor = new Pencil(38, 5);
		inspect(prismacolor);
		nativeAssert(
			spy.calledWith(
				`---\nPencil Degradation: 38\nPencil Eraser Degradation: 5\n---`
			)
		);
	});
});

/*
describe('', function() {
	it('', function() {

		assert.deepEqual( , );
	})
})
*/
