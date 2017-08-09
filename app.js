


var width = window.innerWidth;
var height = window.innerHeight;
var stepHeight = height / 6;
var colWidth = width / 4;
var stepCenter = stepHeight / 2;
var stageCenter = width / 2;

var stage = new Konva.Stage({
	container: 'container',
	width: width,
	height: height,
	draggable: true
});
var rootLayer = new Konva.Layer();
var rectWidth = 200;

var row = 0;
var rootId = 'rootNode';
var rootRect = new Konva.Rect({
	id: rootId,
	x: stageCenter,
	y: stepCenter * row,
	offsetX: rectWidth / 2,
	width: rectWidth,
	height: stepHeight / 2,
	fill: '#CCC',
	stroke: 'black',
	strokeWidth: 1,
	shadowColor: 'black',
	shadowBlur: 10,
	shadowOffset: [10, 10],
	shadowOpacity: 0.2,
	_nodeData: {
		parentId: null
	}
});
var rootText = new Konva.Text({
	id: guid(),
	x: stageCenter,
	y: stepCenter * row,
	offsetY: -((stepHeight / 2) / 2),
	offsetX: +(300 / 2),
	text: 'Start',
	fontSize: 18,
	fontFamily: 'Calibri',
	fill: '#555',
	height: 50,
	width: 300,
	align: 'center',
	_nodeData: {
		parentId: null,
		shapeId: rootId
	}
});




rootLayer.add(rootRect);
rootLayer.add(rootText);

stage.add(rootLayer);

// save stage as a json string
var json = stage.toJSON();
//	console.log(json);

/*

 TODO

 - Fix layouts clashing / overlapping... columns should be widened based on row depth..


  */

function addDecision(parentId, decisionLabel, childALabel, childBLabel){

	var parentElement = stage.findOne(parentId);

	console.log('parentElement');

	var decisionCenter = parentElement.x();

	console.log(parentElement);

	stepCenter = (stepHeight * 2) / 2;

	row++;
	var diamondId = guid();
	var decision = new Konva.Rect({
		id: diamondId,
		x: decisionCenter,
		y: stepCenter * row,
		width: stepHeight / 1.6,
		height: stepHeight / 1.6,
		fill: 'white',
		stroke: 'black',
		strokeWidth: 1,
		rotation: 45,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		_nodeData: {
			parentId: rootId
		}
	});

	var decisionText = new Konva.Text({
		id: guid(),
		x: decisionCenter,
		y: stepCenter * row,
		offsetY: -((stepHeight / 2) / 2),
		offsetX: +(300 / 2),
		text: 'Origin',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		height: 50,
		width: 300,
		padding: 20,
		align: 'center',
		_nodeData: {
			parentId: rootId,
			shapeId: diamondId
		}
	});

	var lineRoot = new Konva.Line({
		id: guid(),
		points: [parentElement.attrs.x, parentElement.attrs.y + 50, decision.attrs.x, decision.attrs.y + 50],
		stroke: 'black',
		strokeWidth: 1,
		shadowColor: 'black',
		shadowBlur: 10,
		_nodeData: {
			startId: rootId,
			endId: diamondId
		}
	});

	stepCenter = (stepHeight * 2) / 2;

	console.log('stepCenter 2 '+stepCenter);

	row++;
	var rectAId = guid();
	var rectA = new Konva.Rect({
		id: rectAId,
		x: decisionCenter - colWidth,
		y: stepCenter * row,
		offsetX: rectWidth / 2,
		width: rectWidth,
		height: stepHeight / 2,
		fill: 'white',
		stroke: 'black',
		strokeWidth: 1,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		_nodeData: {
			parentId: diamondId
		}
	});

	var textA = new Konva.Text({
		id: guid(),
		x: decisionCenter - colWidth,
		y: stepCenter * row,
		offsetX: rectWidth / 2,
		text: 'Chicken',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		height: 50,
		width: rectWidth,
		padding: 25,
		align: 'center',
		_nodeData: {
			parentId: diamondId,
			shapeId: rectAId
		}
	});

	var lineA = new Konva.Line({
		id: guid(),
		points: [decision.attrs.x, decision.attrs.y + 50, rectA.attrs.x, rectA.attrs.y + 50],
		stroke: 'black',
		strokeWidth: 1,
		shadowColor: 'black',
		shadowBlur: 10,
		_nodeData: {
			startId: rootId,
			endId: diamondId
		}
	});

	var rectBId = guid();
	var rectB = new Konva.Rect({
		id: rectBId,
		x: decisionCenter + colWidth,
		y: stepCenter * row,
		offsetX: rectWidth / 2,
		width: rectWidth,
		height: stepHeight / 2,
		fill: 'white',
		stroke: 'black',
		strokeWidth: 1,
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: [10, 10],
		shadowOpacity: 0.2,
		_nodeData: {
			parentId: diamondId
		}
	});

	var textB = new Konva.Text({
		id: guid(),
		x: decisionCenter + colWidth,
		y: stepCenter * row,
		offsetX: rectWidth / 2,
		text: 'Egg',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		height: 50,
		width: rectWidth,
		padding: 25,
		align: 'center',
		_nodeData: {
			parentId: diamondId,
			shapeId: rectBId
		}
	});

	var lineB = new Konva.Line({
		id: guid(),
		points: [decision.attrs.x, decision.attrs.y + 50, rectB.attrs.x, rectB.attrs.y + 50],
		stroke: 'black',
		strokeWidth: 1,
		shadowColor: 'black',
		shadowBlur: 10,
		_nodeData: {
			startId: diamondId,
			endId: rectBId
		}
	});

	var clickHandler = function(e){
		console.log('click');
		console.log(e);

		addDecision('#'+ e.target.attrs.id, "", "", "");
	};

	rectA.on('click', clickHandler);
	textA.on('click', clickHandler);
	rectB.on('click', clickHandler);
	textB.on('click', clickHandler);

	var layer = new Konva.Layer();

	layer.add(lineRoot);
	layer.add(lineA);
	layer.add(lineB);
	layer.add(decision);
	layer.add(decisionText);
	layer.add(rectA);
	layer.add(textA);
	layer.add(rectB);
	layer.add(textB);

	stage.add(layer);
	layer.moveToBottom();
}


//	https://jsfiddle.net/g06utup0/2/
function fitBounds(){
	console.log('fitBounds');
	stage.scale({ x: 1, y: 1 });
	stage.position({ x: 0, y: 0 });
	stage.draw();
}





// MOUSEWHEEL ZOOM
var scaleBy = 1.04;
window.addEventListener('wheel', function(e){

	e.preventDefault();

	var oldScale = stage.scaleX();
	var mousePointTo = {
		x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
		y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
	};

	var newScale = e.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
	stage.scale({ x: newScale, y: newScale });
	var newPos = {
		x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
		y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
	};
	stage.position(newPos);
	stage.batchDraw();
});

function guid() {
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
}
