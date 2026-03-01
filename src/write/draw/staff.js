var printStaffLine = require('./staff-line');

function printStaff(renderer, startx, endx, numLines, linePitch, dy) {
	var klass = "abcjs-top-line";
	var pitch = 2;
	if (linePitch) {
		pitch = linePitch;
	}
	renderer.paper.openGroup({ prepend: true, klass: renderer.controller.classes.generate("abcjs-staff") });
	var firstYLine = 0;
	var lastYLine = 0;

	if (numLines === 'diminished') {
		// Draw 6 lines in two groups of 3
		// Bottom group: positions 3, 5, 7
		// Top group: positions 11, 13, 15
		var diminishedPositions = [3, 5, 7, 11, 13, 15];
		for (var d = diminishedPositions.length - 1; d >= 0; d--) {
			var curpitch = diminishedPositions[d];
			lastYLine = renderer.calcY(curpitch);
			if (firstYLine === 0) {
				firstYLine = lastYLine;
			}
			printStaffLine(renderer, startx, endx, curpitch, klass, null, dy + renderer.lineThickness);
			klass = undefined;
		}
	} else if (numLines === 1) {
		printStaffLine(renderer, startx, endx, 6, klass, null, dy + renderer.lineThickness);
		firstYLine = renderer.calcY(10);
		lastYLine = renderer.calcY(2);
	} else {
		for (var i = numLines - 1; i >= 0; i--) {
			var curpitch2 = (i + 1) * pitch;
			lastYLine = renderer.calcY(curpitch2);
			if (firstYLine === 0) {
				firstYLine = lastYLine;
			}
			printStaffLine(renderer, startx, endx, curpitch2, klass, null, dy + renderer.lineThickness);
			klass = undefined;
		}
	}
	renderer.paper.closeGroup();
	return [firstYLine, lastYLine];
}

module.exports = printStaff;
