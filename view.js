let { Pencil } = require('./pencilLogic');

let showPaper = paper => {
	if (Array.isArray(paper)) {
		let writing = '';
		paper.forEach((word, i, arr) => {
			if (i < arr.length - 1) {
				writing = writing + word.join('');
				writing = writing + ' ';
			} else {
				writing = writing + word.join('');
			}
		});
		console.log(`---\n${writing}\n---`);
	} else {
		throw new TypeError('showPaper() may only take arrays as input');
	}
};

let inspect = pencil => {
	if (pencil instanceof Pencil) {
		console.log(
			`---\nPencil Degradation: ${pencil.degradation}\nPencil Eraser Degradation: ${pencil.eraserDegradation}\n---`
		);
	} else {
		throw new TypeError('inspect() can only inspect Pencil objects');
	}
};

module.exports = {
	showPaper,
	inspect
};
