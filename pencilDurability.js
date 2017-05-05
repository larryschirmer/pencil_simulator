'use strict';
let { showPaper, inspect } = require('./view');
let { Pencil } = require('./pencilLogic');

let writeDemonstration = new Pencil(50, 10);

let writeSection = [];

writeSection = writeDemonstration
	.write('She sells sea shells')
	.on(writeSection);

showPaper(writeSection);

writeSection = writeDemonstration
	.write('down by the sea shore')
	.on(writeSection);

showPaper(writeSection);

//---

let pointDemonstration = new Pencil(4, 10);

let pointDegradationSection = [];

pointDegradationSection = pointDemonstration
	.write('Text')
	.on(pointDegradationSection);

showPaper(pointDegradationSection);

pointDemonstration.sharpen();

inspect(pointDemonstration);
