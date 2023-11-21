import React, { useState, useEffect } from "react";
import CalendarForm from "./Component/Calendar";
import SettingForm from "./Component/Setting";
import DrinkInput from "./Component/DrinkInput";
import { register } from "./serviceWorker.js";
import sound from "./alarm.mp3";
const alarm = new Audio(sound);
function App() {
	// App local stuff
	const [view, setView] = useState("calendar");
	const [showDrink, setShowDrink] = useState(false);
	// saving records
	const [foodLog, setFoodLog] = useState({});
	const [waterLog, setWaterLog] = useState({});
	const [cronOn, setCronOn] = useState(false);
	const [cronOnTime, setCronOnTime] = useState(null);
	const [cronOffTime, setCronOffTime] = useState(null);
	const [intervalOn, setIntervalOn] = useState(false);
	const [inter, setInter] = useState(40);
	const SettingStuff = {
		cronOn: cronOn,
		cronOnTime: cronOnTime,
		cronOffTime: cronOffTime,
		intervalOn: intervalOn,
		inter: inter,
		setCronOn: setCronOn,
		setCronOnTime: setCronOnTime,
		setCronOffTime: setCronOffTime,
		setIntervalOn: setIntervalOn,
		setInter: setInter,
	};

	// save state
	useEffect(() => {
		if (Object.keys(waterLog).length > 0) {
			localStorage.setItem("waterLog", JSON.stringify(waterLog));
		}
	}, [waterLog]);
	useEffect(() => {
		if (Object.keys(foodLog).length > 0) {
			localStorage.setItem("foodLog", JSON.stringify(foodLog));
		}
	}, [foodLog]);

	// load state
	useEffect(() => {
		const storedwaterLog = JSON.parse(localStorage.getItem("waterLog"));
		if (storedwaterLog != null) {
			setWaterLog(storedwaterLog);
		}
	}, []);
	useEffect(() => {
		const storedfoodLog = JSON.parse(localStorage.getItem("foodLog"));
		if (storedfoodLog != null) {
			setFoodLog(storedfoodLog);
		}
	}, []);

	// set clock & cron
	useEffect(() => {
		if (!intervalOn) return;
		let setClock = setInterval(() => {
			if (intervalOn) {
				alarm.play();
				alarm.loop = false;
			}
		}, inter * 1000);
		return () => clearInterval(setClock);
	}, [intervalOn]);
	useEffect(() => {
		if (!cronOn) return;
		let checkCron = setInterval(() => {
			const curr = new Date();
			console.log(
				cronOffTime,
				cronOffTime.getHours(),
				cronOffTime.getMinutes()
			);
			if (
				cronOffTime.getHours() === curr.getHours() &&
				cronOffTime.getMinutes() === curr.getMinutes()
			) {
				setIntervalOn(false);
			}
			if (
				cronOffTime.getHours() === curr.getHours() &&
				cronOffTime.getMinutes() === curr.getMinutes()
			) {
				setIntervalOn(true);
			}
		}, 30 * 1000);
		return () => clearInterval(checkCron);
	}, [cronOn]);

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
				style={{
					height: "10%",
					display: "flex",
					backgroundColor: "#e3f2fd",
				}}
			>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "40%", fontSize: "1rem" }}
					onClick={() => setView("calendar")}
				>
					喝水情形
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "25%", fontSize: "1rem" }}
					onClick={() => setView("setting")}
				>
					設定
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "25%", fontSize: "1rem" }}
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
						height: "90%",
						margin: "auto",
					}}
				>
					<CalendarForm
						waterLog={waterLog}
						foodLog={foodLog}
						setFoodLog={setFoodLog}
					/>
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
