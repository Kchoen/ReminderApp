import React, { useState, useEffect } from "react";
import CalendarForm from "./Component/Calendar";
import SettingForm from "./Component/Setting";
import DrinkInput from "./Component/DrinkInput";
import { ToastContainer, toast } from "react-toastify";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
	const [ringTime, setRingTime] = useState(Date.now());
	const SettingStuff = {
		cronOn: cronOn,
		cronOnTime: cronOnTime,
		cronOffTime: cronOffTime,
		intervalOn: intervalOn,
		inter: inter,
		ringTime: ringTime,
		setCronOn: setCronOn,
		setCronOnTime: setCronOnTime,
		setCronOffTime: setCronOffTime,
		setIntervalOn: setIntervalOn,
		setInter: setInter,
		exportData: exportData,
	};
	function chunk(arr, size) {
		const chunks = [];
		let i = 0;

		while (i < arr.length) {
			chunks.push(arr.slice(i, i + size));
			i += size;
		}

		return chunks;
	}
	function exportData() {
		// create csv data
		let csvRows = [];
		// Merge Header
		const fullheader = Array.from(
			new Set(Object.keys(waterLog).concat(Object.keys(foodLog)))
		);
		fullheader.sort(function (a, b) {
			if (new Date(a) > new Date(b)) {
				return 1;
			}
			if (new Date(a) < new Date(b)) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
		let splitheaders = chunk(fullheader, 7);
		let cnt = 0;
		splitheaders.forEach((headers) => {
			csvRows.push(headers.join(","));
			// waterLog
			let waterRow = ["飲水量"];
			headers.forEach((head) => {
				waterRow.push(
					waterLog[head]?.reduce((total, v) => {
						return total + v.amount;
					}, 0)
				);
			});
			csvRows.push(waterRow.join(","));
			// foodLog
			let foodRow = ["早餐"];
			// foodLog---(Morning)
			headers.forEach((head) => {
				foodRow.push(foodLog[head]?.Morning);
			});
			csvRows.push(foodRow);
			foodRow = ["午餐"];
			// foodLog---(Lunch)
			headers.forEach((head) => {
				foodRow.push(foodLog[head]?.Lunch);
			});
			csvRows.push(foodRow);
			foodRow = ["晚餐"];
			// foodLog---(Diner)
			headers.forEach((head) => {
				foodRow.push(foodLog[head]?.Diner);
			});
			csvRows.push(foodRow);
			foodRow = ["其他"];
			// foodLog---(Others)
			headers.forEach((head) => {
				foodRow.push(foodLog[head]?.Others);
			});
			csvRows.push(foodRow);
			csvRows[cnt] = ["日期"].concat(csvRows[cnt]);
			csvRows.push(["", "", "", "", "", "", "", ""]);
			cnt += 7;
		});

		csvRows = csvRows.join("\n");

		const blob = new Blob([csvRows], { type: "text/csv" });

		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.setAttribute("href", url);
		a.setAttribute("download", "download.csv");
		a.click();
		toast.success("匯出飲食資料...", {
			position: "top-center",
			autoClose: 500,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			theme: "colored",
			transition: Flip,
		});
	}

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
				setRingTime(Date.now() + inter * 60 * 1000);
			}
		}, inter * 60 * 1000);
		setRingTime(Date.now() + inter * 60 * 1000);
		return () => clearInterval(setClock);
	}, [intervalOn]);
	useEffect(() => {
		if (!cronOn) return;
		let checkCron = setInterval(() => {
			const curr = new Date();
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
					style={{ margin: "auto", width: "40%", fontSize: "1.1rem" }}
					onClick={() => setView("calendar")}
				>
					喝水情形
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "25%", fontSize: "1.1rem" }}
					onClick={() => setView("setting")}
				>
					設定
				</button>
				<button
					className="btn btn-warning"
					style={{ margin: "auto", width: "25%", fontSize: "1.1rem" }}
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
