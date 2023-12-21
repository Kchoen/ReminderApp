import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function LogModal({
	showLogModal,
	setShowLogModal,
	logDate,
	waterLog,
	temp,
	setTemp,
	setFoodLog,
}) {
	const [hasCameraPermission, setHasCameraPermission] = useState(false);

	const [activeTab, setActiveTab] = useState("drink");
	const [image, setImage] = useState(null);

	const canvasRef = useRef(null);
	const videoRef = useRef(null);

	useEffect(() => {
		// Request camera permission
		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: {
					facingMode: { exact: "environment" },
				},
			})
			.then((stream) => {
				videoRef.current = stream;
				alert(stream);
				alert(videoRef);
				setHasCameraPermission(true);
			})
			.catch((error) => {
				alert("無法使用相機");
				setHasCameraPermission(false);
			});
	}, []);

	const captureImage = async () => {
		const imageCapture = new ImageCapture(videoRef.current);
		let photo = await imageCapture.takePhoto(); // Take a picture
		let blob = await photo.blob(); // Get the image data as a blob

		let imageObjectURL = URL.createObjectURL(blob);
		setImage(imageObjectURL);
	};

	const drawImageToCanvas = () => {
		const ctx = canvasRef.current.getContext("2d");
		const img = new Image();
		img.onload = () => {
			ctx.drawImage(img, 0, 0);
		};
		img.src = image;
	};
	const waterReport = waterLog[logDate] ? waterLog[logDate] : [];
	const total =
		waterReport?.reduce((tot, entry) => {
			return tot + entry.amount;
		}, 0) || 0;
	const saveFood = () => {
		setFoodLog((prev) => {
			// helper
			return {
				...prev,
				[logDate]: {
					Morning: temp.Morning,
					Lunch: temp.Lunch,
					Diner: temp.Diner,
					Others: temp.Others,
				},
			};
		});
	};
	return (
		<Modal
			show={showLogModal}
			onHide={() => setShowLogModal(false)}
			centered
		>
			<Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
				<Tab eventKey="drink" title="飲水報告">
					<Modal.Body>
						<h2>總和：{total} C.C.</h2>

						{waterReport.map((log) => (
							<div>
								在{log.drinkTime}的時候，喝了{log.amount} C.C.
							</div>
						))}
					</Modal.Body>
				</Tab>

				<Tab eventKey="food" title="飲食紀錄">
					<Modal.Body>
						<h4>
							早餐：
							<input
								style={{ fontSize: "1rem", width: "80%" }}
								value={temp.Morning}
								onChange={(e) => {
									setTemp((prev) => {
										return {
											...prev,
											Morning: e.target.value,
										};
									});
								}}
							/>
						</h4>

						<h4>
							午餐：
							<input
								style={{ fontSize: "1rem", width: "80%" }}
								value={temp.Lunch}
								onChange={(e) => {
									setTemp((prev) => {
										return {
											...prev,
											Lunch: e.target.value,
										};
									});
								}}
							/>
						</h4>
						<h4>
							晚餐：
							<input
								style={{ fontSize: "1rem", width: "80%" }}
								value={temp.Diner}
								onChange={(e) => {
									setTemp((prev) => {
										return {
											...prev,
											Diner: e.target.value,
										};
									});
								}}
							/>
						</h4>
						<h4
							style={{
								display: "flex",
								alignItems: "flex-start",
							}}
						>
							其他：
							<textarea
								rows={3}
								style={{
									fontSize: "1rem",
									width: "80%",
								}}
								value={temp.Others}
								onChange={(e) => {
									setTemp((prev) => {
										return {
											...prev,
											Others: e.target.value,
										};
									});
								}}
							/>
							{""}
						</h4>
					</Modal.Body>
				</Tab>
				<Tab eventKey="picture" title="拍照記錄">
					<Modal.Body>
						<Button variant="success" onClick={captureImage}>
							拍照
						</Button>
						<h4>
							<video ref={videoRef}></video>
							<canvas
								ref={canvasRef}
								width={320}
								height={240}
							></canvas>

							{image && (
								<button onClick={drawImageToCanvas}>
									Draw To Canvas
								</button>
							)}
						</h4>
					</Modal.Body>
				</Tab>
			</Tabs>

			<Modal.Footer>
				<Button
					variant="secondary"
					onClick={() => {
						setShowLogModal(false);
					}}
				>
					Close
				</Button>
				<Button
					variant="primary"
					onClick={() => {
						saveFood();
						setShowLogModal(false);
					}}
				>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
export default LogModal;
