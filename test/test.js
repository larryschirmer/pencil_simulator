'use strict';

var { assert, expect } = require('chai');
var { Pencil, showPaper, pencilStats } = require('../helperCode');

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

describe('pencil.write()', function() {});

/*
describe('', function() {
	it('', function() {

	})
})
*/
