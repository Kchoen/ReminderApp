const camera = {
	startCamera: function () {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({
					video: { facingMode: { exact: "environment" } },
				})
				.then(function (stream) {
					document.getElementById("video").srcObject = stream;
					document.getElementById("video").play();
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
