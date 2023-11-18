import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaGlassWater, FaPlus, FaMinus } from "react-icons/fa6";
import CalendarForm from "./Component/Calendar";
import SettingForm from "./Component/Setting";
import sound from "./alarm.mp3";
const alarm = new Audio(sound);
function formatDate(date) {
	const year = date.getFullYear();
	const month = date.getMonth() + 1; // 0-indexed
	const day = date.getDate();

	return `${year}-${month}-${day}`; // 2022-11-17
}
function formatTime(date) {
	const hour =
		date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours();
	const minute =
		date.getMinutes() < 10
			? "0" + date.getMinutes()
			: "" + date.getMinutes();
	return `${hour}:${minute}`;
}
function App() {
	const [view, setView] = useState("calendar");
	const [waterLog, setWaterLog] = useState({
		"2023-11-17": [
			{ amount: 100, drinkTime: "09:00" },
			{ amount: 150, drinkTime: "12:00" },
		],
	});
	const [show, setShow] = useState(false);
	const [quantity, setQuantity] = useState(150);
	function addWater(amount, time) {
		const drinkDate = formatDate(new Date()); // helper
		const drinkTime = formatTime(new Date());
		setWaterLog((prev) => {
			const prevLog = prev[drinkDate] || [];
			// helper
			return {
				...prev,
				[drinkDate]: [...prevLog, { amount, drinkTime }],
			};
		});
		console.log(waterLog);
	}

	// useEffect(() => {
	// 	// Load drinks from localStorage on mount
	// 	const storedwaterLog = JSON.parse(localStorage.getItem("waterLog"));
	// 	if (storedwaterLog) setWaterLog(storedwaterLog);
	// },{});

	// useEffect(() => {
	// 	// Save drinks to localStorage on change
	// 	localStorage.setItem("waterLog", JSON.stringify(waterLog));
	// }, waterLog);
	return (
		<div
			className="App"
			style={{
				display: "justify-content-center d-flex flex-clomun",
				width: "100vw",
				height: "100vh",
			}}
		>
			<nav
				className="navbar navbar-light"
				style={{ display: "flex", backgroundColor: "#e3f2fd" }}
			>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "20%" }}
					onClick={() => setView("calendar")}
				>
					我的喝水紀錄
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "20%" }}
					onClick={() => setShow(true)}
				>
					喝水
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "20%" }}
					onClick={() =>
						setTimeout(() => {
							alarm.play();
							alarm.loop = false;
						}, 1000 * 60 * 60)
					}
				>
					設定久坐提醒
				</button>
			</nav>

			{view === "calendar" && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						width: "100%",
						height: "100%",
						margin: "auto",
					}}
				>
					<CalendarForm
						waterLog={waterLog}
						setWaterLog={setWaterLog}
					/>
					<Modal show={show} onHide={() => setShow(false)} centered>
						<Modal.Header closeButton>
							<Modal.Title
								style={{ fontSize: "2em", margin: "auto" }}
							>
								紀錄喝水
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="justify-content-center d-flex flex-column ">
							<div className="mt-3 justify-content-center d-flex ">
								<div className="me-3">
									<FaGlassWater size={100} />
									<h3>{quantity} C.C.</h3>
								</div>
								<div className="text-center me-3 d-flex flex-column">
									<Button
										variant="link"
										onClick={() =>
											setQuantity((q) => q + 50)
										}
									>
										<FaPlus size={65} />
									</Button>
									<Button
										variant="link"
										onClick={() =>
											setQuantity((q) => q - 50)
										}
										disabled={quantity <= 0}
									>
										<FaMinus size={65} />
									</Button>
								</div>
							</div>
							<Button
								variant="primary"
								className="mt-5"
								style={{ fontSize: "1.5em" }}
								onClick={() => {
									addWater(quantity, new Date());
									setShow(false);
									setView("calendar");
								}}
							>
								喝水
							</Button>
						</Modal.Body>
					</Modal>
				</div>
			)}

			{view === "setting" && (
				<SettingForm
					waterLog={waterLog}
					setWaterLog={setWaterLog}
					setView={setView}
				/>
			)}
		</div>
	);
}

export default App;
