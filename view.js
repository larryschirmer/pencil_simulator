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
	//Check that pencil is a Pencil
	console.log(`Pencil Degradation: ${pencil.degradation}`);
	console.log(`Pencil Eraser Degradation: ${pencil.eraserDegradation}`);
};

module.exports = {
	showPaper,
	inspect
};
