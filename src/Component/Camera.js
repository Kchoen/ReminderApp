const camera = {
	video: null,
	canvas: null,
	context: null,

	startCamera: function () {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			this.video = document.getElementById("video");
			navigator.mediaDevices
				.getUserMedia({
					video: { facingMode: { exact: "environment" } },
				})
				.then(function (stream) {
					this.video.srcObject = stream;
					this.video.play();
				});
		}
	},

	takeSnapshot: function () {
		document
			.getElementById("canvas")
			?.getContext("2d")
			?.drawImage(document.getElementById("video"), 0, 0, 600, 600);
	},
	reload: function () {
		this.video = document.getElementById("video");
		this.context = document.getElementById("canvas")?.getContext("2d");
	},
};

export default camera;
