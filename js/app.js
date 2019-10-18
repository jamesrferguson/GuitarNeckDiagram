GTR = {};

GTR.NUMBER_OF_FRETS = 24;

GTR.strings = [
  ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'],
	['B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G'],
	['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'],
	['A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A'],
	['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#',  'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E']
];

GTR.FRETS_WITH_SINGLE_MARKERS = [3, 5, 7, 9, 15, 17, 19, 21];
GTR.FRETS_WITH_DOUBLE_MARKERS = [12, 24];

GTR.STRING_START = 20;
GTR.NECK_START = 50;

GTR.FRET_WIDTH = 5;
GTR.FRET_LENGTH = 275;
GTR.FRET_START = 10;
GTR.FRET_SPACE = 50;

GTR.STRING_WIDTH = 5;
GTR.STRING_SPACE = 50;
GTR.STRING_LENGTH = 1200;

//GuitarNeck.SINGLE_MARKER_LEFT = 144; // halfway between 4th and 3rd strings
GTR.SINGLE_MARKER_TOP = GTR.STRING_START + 2.5 * GTR.STRING_SPACE; // halfway between 4th and 3rd strings
GTR.FIRST_DOUBLE_MARKER_TOP = GTR.STRING_START + 1.5 * GTR.STRING_SPACE; // halfway between 5th and 4th strings
GTR.SECOND_DOUBLE_MARKER_TOP = GTR.STRING_START + 3.5 * GTR.STRING_SPACE; // halfway between 3rd and 2nd strings

GTR.AddRectanlgeToNeck = function (cvs, left, top, fill, width, height) {
    var rect = new fabric.Rect({
        left: left,
        top: top,
        fill: fill,
        width: width,
        height: height,
        lockMovementX: true,
        lockMovementY: true,
        selectable: false
      });
    cvs.add(rect);
}

GTR.getFretMarkerLeft = function (fretNo) {
    return GTR.NECK_START + ( fretNo - 0.5) * GTR.FRET_SPACE;
}

GTR.drawFretsOnNeck = function (cvs) {
    for(i = 0; i <= GTR.NUMBER_OF_FRETS; i++){
        GTR.AddRectanlgeToNeck(cvs, (i+1) * GTR.FRET_SPACE, GTR.FRET_START,  "#000000", GTR.FRET_WIDTH, GTR.FRET_LENGTH);
    }
}

GTR.drawSingleFretMarker = function(cvs, fretNo){
    var marker = new fabric.Circle({
        radius: 5, fill: 'green', left: GTR.getFretMarkerLeft(fretNo) , top: GTR.SINGLE_MARKER_TOP, lockMovementX: true, lockMovementY: true, selectable: false
      });
    cvs.add(marker);
}

GTR.drawDoubleFretMarker = function(cvs, fretNo){
    var marker1 = new fabric.Circle({
        radius: 5, fill: 'green', left: GTR.getFretMarkerLeft(fretNo) , top: GTR.FIRST_DOUBLE_MARKER_TOP, lockMovementX: true, lockMovementY: true, selectable: false
      });
    var marker2 = new fabric.Circle({
        radius: 5, fill: 'green', left: GTR.getFretMarkerLeft(fretNo), top: GTR.SECOND_DOUBLE_MARKER_TOP, lockMovementX: true, lockMovementY: true, selectable: false
      });
    cvs.add(marker1);
    cvs.add(marker2);
}

GTR.drawFretMarkersOnNeck = function (cvs) {
    for(i=0; i < GTR.FRETS_WITH_SINGLE_MARKERS.length; i++){
        GTR.drawSingleFretMarker(cvs, GTR.FRETS_WITH_SINGLE_MARKERS[i])
    }

    for(i=0; i < GTR.FRETS_WITH_DOUBLE_MARKERS.length; i++){
        GTR.drawDoubleFretMarker(cvs, GTR.FRETS_WITH_DOUBLE_MARKERS[i])
    }
}

GTR.drawStringsOnNeck = function (cvs) {
  var totalStrings = GTR.strings.length;
  for (i = 0; i < totalStrings; i++){
    GTR.AddRectanlgeToNeck(cvs, GTR.NECK_START, GTR.STRING_START + i * GTR.STRING_SPACE, '#dddddd', GTR.STRING_LENGTH, GTR.STRING_WIDTH);
  }
}

function run() {
  var canvas = new fabric.Canvas('myCanvas');
    GTR.drawStringsOnNeck(canvas);
    GTR.drawFretsOnNeck(canvas);
    GTR.drawFretMarkersOnNeck(canvas);
}

run();