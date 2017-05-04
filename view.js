var { Pencil } = require('./pencilLogic');

var showPaper = paper => {
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
};

var inspect = pencil => {
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
