import React, { useState, useEffect } from "react";
import CalendarForm from "./Component/Calendar";
import SettingForm from "./Component/Setting";
import DrinkInput from "./Component/DrinkInput";
import sound from "./alarm.mp3";
const alarm = new Audio(sound);
function App() {
	// App local stuff
	const [view, setView] = useState("calendar");
	const [showDrink, setShowDrink] = useState(false);
	// saving records
	const [waterLog, setWaterLog] = useState({});
	const [cronOn, setCronOn] = useState(false);
	const [cronOnTime, setCronOnTime] = useState(null);
	const [cronOffTime, setCronOffTime] = useState(null);
	const [intervalOn, setIntervalOn] = useState(false);
	const [interval, setInterval] = useState(40);
	const SettingStuff = {
		cronOn: cronOn,
		cronOnTime: cronOnTime,
		cronOffTime: cronOffTime,
		intervalOn: intervalOn,
		interval: interval,
		setCronOn: setCronOn,
		setCronOnTime: setCronOnTime,
		setCronOffTime: setCronOffTime,
		setIntervalOn: setIntervalOn,
		setInterval: setInterval,
	};
	const packedstate = {
		waterLog: waterLog,
		cronOn: cronOn,
		cronOnTime: cronOnTime,
		cronOffTime: cronOffTime,
		intervalOn: intervalOn,
		interval: interval,
	};

	// save state
	useEffect(() => {
		if (Object.keys(waterLog).length > 0) {
			localStorage.setItem("waterLog", JSON.stringify(waterLog));
		}
	}, [waterLog]);

	// load state
	useEffect(() => {
		const storedwaterLog = JSON.parse(localStorage.getItem("waterLog"));
		if (storedwaterLog != null) {
			setWaterLog(storedwaterLog);
		}
	}, []);

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
			{/* Navigator part */}
			<nav
				className="navbar navbar-light"
				style={{ display: "flex", backgroundColor: "#e3f2fd" }}
			>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "30%" }}
					onClick={() => setView("calendar")}
				>
					喝水情形
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "30%" }}
					onClick={() => setView("setting")}
				>
					設定
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "30%" }}
					onClick={() => {
						setView("calendar");
						setShowDrink(true);
					}}
				>
					喝水
				</button>
			</nav>

			{/* Calendar Part */}
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
					<CalendarForm waterLog={waterLog} />
				</div>
			)}

			{/* Setting Part */}
			{view === "setting" && <SettingForm SettingStuff={SettingStuff} />}

			{/* hidden modal */}
			<DrinkInput
				waterLog={waterLog}
				setWaterLog={setWaterLog}
				showDrink={showDrink}
				setShowDrink={setShowDrink}
			/>
		</div>
	);
}

export default App;
