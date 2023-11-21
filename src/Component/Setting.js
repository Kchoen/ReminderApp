import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import { LuAlarmClock, LuCalendarClock } from "react-icons/lu";
import { Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
function SettingForm({ SettingStuff }) {
	// Setting Local Stuff
	const {
		cronOn,
		cronOnTime,
		cronOffTime,
		intervalOn,
		inter,
		setCronOn,
		setCronOnTime,
		setCronOffTime,
		setIntervalOn,
		setInter,
	} = SettingStuff;
	const [showInterval, setShowInterval] = useState(false);
	const [showCron, setShowCron] = useState(false);

	return (
		<>
			<div // For setting the clock Interval
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					margin: "auto",
				}}
			>
				<button // Setting Button
					className="btn btn-info btn-sm"
					onClick={() => setShowInterval(true)}
					style={{
						alignSelf: "flex-start",
						fontSize: "1.5em",
						margin: "auto",
						width: "70%",
					}}
				>
					設定鬧鐘間隔
				</button>
				<button // On/Off Button
					className="btn btn-info btn-sm"
					onClick={() => {
						if (intervalOn) {
							toast.error("鬧鐘關閉", {
								position: "top-center",
								autoClose: 500,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								theme: "colored",
								transition: Flip,
							});
						} else {
							toast.success("鬧鐘開啟", {
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

						setIntervalOn(!intervalOn);
					}}
					style={{
						alignSelf: "flex-end",
						margin: "auto",
						width: "20%",
						fontSize: "1.5em",
						backgroundColor: intervalOn ? "green" : "#22222250",
					}}
				>
					<FaBell color={intervalOn ? "yellow" : "black"} />
				</button>
			</div>
			<div // For setting the clock CronTable
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					margin: "auto",
					marginTop: "0.5em",
				}}
			>
				<button //Setting button
					className="btn btn-info btn-sm"
					onClick={() => setShowCron(true)}
					style={{
						alignSelf: "flex-start",
						fontSize: "1.5em",
						margin: "auto",
						width: "70%",
					}}
				>
					設定鬧鐘排程
				</button>
				<button //On/Off button
					className="btn btn-info btn-sm"
					onClick={() => {
						if (cronOffTime == null || cronOnTime == null) {
							toast.warn("排程時間錯誤", {
								position: "top-center",
								autoClose: 500,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								theme: "colored",
								transition: Flip,
							});
							return;
						}
						if (cronOn) {
							toast.error("排程關閉", {
								position: "top-center",
								autoClose: 500,
								hideProgressBar: true,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								theme: "colored",
								transition: Flip,
							});
						} else {
							toast.success("排程開啟", {
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

						setCronOn(!cronOn);
					}}
					style={{
						alignSelf: "flex-end",
						margin: "auto",
						width: "20%",
						fontSize: "1.5em",
						backgroundColor: cronOn ? "green" : "#22222250",
					}}
				>
					<LuCalendarClock color={cronOn ? "yellow" : "black"} />
				</button>
			</div>
			{/* Hidden Toast or Modal */}
			<>
				{/* Toast */}
				<ToastContainer
					style={{
						fontSize: "1.5em",
						justifyContent: "center",
					}}
				/>
				{/* IntervalSetting */}
				<Modal
					show={showInterval}
					onHide={() => setShowInterval(false)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title
							style={{ fontSize: "2em", margin: "auto" }}
						>
							設定鬧鐘間隔
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="justify-content-center d-flex flex-column ">
						<div className="mt-3 justify-content-center d-flex ">
							<div className="text-center  me-3">
								<LuAlarmClock size={110} />
								<h3>{inter} 分鐘</h3>
							</div>
							<div className="text-center me-3 d-flex flex-column">
								<Button
									variant="link"
									onClick={() => setInter((q) => q + 5)}
								>
									<FaPlus size={65} />
								</Button>
								<Button
									variant="link"
									onClick={() => setInter((q) => q - 5)}
									disabled={inter <= 0}
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
								setIntervalOn(false);
								setShowInterval(false);
							}}
						>
							確定
						</Button>
					</Modal.Body>
				</Modal>
				{/* CronSetting */}
				<Modal
					show={showCron}
					onHide={() => setShowCron(false)}
					centered
				>
					<Modal.Header closeButton>
						<Modal.Title
							style={{ fontSize: "2em", margin: "auto" }}
						>
							設定鬧鐘排程
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="d-flex flex-column align-items-center">
						<div className="d-flex">
							<p
								style={{
									marginTop: "0.3em",
									marginRight: "1em",
								}}
							>
								開啟時間
							</p>
							<DatePicker
								style={{ margin: "auto" }}
								centered
								selected={cronOnTime}
								onChange={(time) => setCronOnTime(time)}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={15}
								timeCaption="Time"
								dateFormat="h:mm aa"
							/>
						</div>
						<div className="d-flex">
							<p
								style={{
									marginTop: "0.3em",
									marginRight: "1em",
								}}
							>
								關閉時間
							</p>
							<DatePicker
								style={{ margin: "auto" }}
								centered
								selected={cronOffTime}
								onChange={(time) => setCronOffTime(time)}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={15}
								timeCaption="Time"
								dateFormat="h:mm aa"
							/>
						</div>
						<div className="d-flex">
							<button
								className="btn btn-primary btn-sm"
								style={{ fontSize: "1.5em", width: "4em" }}
								onClick={() => {
									setCronOn(false);
									setShowCron(false);
								}}
							>
								確定
							</button>
						</div>
					</Modal.Body>
				</Modal>
			</>
		</>
	);
}
export default SettingForm;
