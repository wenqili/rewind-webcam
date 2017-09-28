window.addEventListener('load', init);
document.addEventListener('click', draw);
var canvas, contexts, video;
var socket = io.connect();
socket.on('connect', function() {
	console.log("Connected");
})

socket.on('image', function(data) {
	// console.log(data);

	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 100)


	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 500)
	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 1000)

	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 1500)
	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 2000)
	setTimeout(function() {
		document.getElementById('imagefile').src = data;

	}, 2500)
})

function init() {
	// These help with cross-browser functionality (shim)
	window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	// The video element on the page to display the webcam
	video = document.getElementById('thevideo');


	var constraints = {
		audio: false,
		video: {
			width: 320,
			height: 240,
			facingMode: "user"
		}
	}
	// console.log(constraints);
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		video.srcObject = stream;
		// video.src = window.URL.createObjectURL(stream)
		video.onloadedmetadata = function(e) {
			video.play()
			console.log(video)
		}
	}).catch(function(err) {
		console.log(err);
	})

	canvas = document.getElementById('thecanvas');
	contexts = canvas.getContext('2d');



	// draw();
}

function draw() {
	contexts.clearRect(0, 0, canvas.width, canvas.height);
	// contexts.globalAlpha = 0.2;
	contexts.drawImage(video, 0, 0, 320, 240);
	var dataUrl = canvas.toDataURL('image/webp', 1);
	// console.log(dataUrl)
	// document.getElementById('imagefile').src = dataUrl;
	// socket.emit('image', dataUrl);
	socket.emit('image', dataUrl);
	requestAnimationFrame(draw);
}
