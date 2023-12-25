const camera = (function () {
	let width = 0;
	let height = 0;

	// const createObjects = function () {
	// 	const video = document.createElement("video");
	// 	video.id = "video";
	// 	video.width = width;
	// 	video.width = height;
	// 	video.autoplay = true;
	// 	document.body.appendChild(video);

	// 	const canvas = document.createElement("canvas");
	// 	canvas.id = "canvas";
	// 	canvas.width = width;
	// 	canvas.width = height;
	// 	document.body.appendChild(canvas);
	// };

	return {
		video: null,
		canvas: null,
		context: null,

		startCamera: function () {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				this.video = document.getElementById("video");
				this.context = document
					.getElementById("canvas")
					?.getContext("2d");
				navigator.mediaDevices
					.getUserMedia({
						video: { facingMode: { exact: "environment" } },
					})
					.then(function (stream) {
						alert(stream);
						this.video.srcObject = stream;
						this.video.play();
					});
			}
			alert("startingCamera:", this);
		},

		takeSnapshot: function () {
			this.context?.drawImage(this.video, 0, 0, width, height);
			alert("snapping:", this);
		},
	};
})();

export default camera;
