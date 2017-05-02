'use strict';

var { assert, expect } = require('chai');
var { Pencil, showPaper, pencilStats, sharpen } = require('../helperCode');

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
	it('handles negitive parameters by throwing an error', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.equal(1, 0);
	});
	it('handles float parameters by throwing an error', function() {
		let graphiteDegradationStrength = 32, eraserDegradationStrength = 10;
		const prismacolor = new Pencil(
			graphiteDegradationStrength,
			eraserDegradationStrength
		);
		assert.equal(1, 0);
	});
});
