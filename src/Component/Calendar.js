import Calendar from "react-calendar";
import React, { useState } from "react";
import LogModal from "./LogModal";

function CalendarForm({ waterLog }) {
	// local state
	const [currentView, setCurrentView] = useState({
		view: "month",
		date: new Date(),
	});
	const [selectDate, setSelectDate] = useState(new Date());
	const [showLogModal, setShowLogModal] = useState(false);

	// Simple function
	function OpenWaterLog(date) {
		setSelectDate(date);
		setShowLogModal(true);
	}
	function selectLog() {
		return waterLog[formatDate(selectDate)]
			? waterLog[formatDate(selectDate)]
			: [];
	}
	function getTotal(date) {
		return (
			waterLog[date]?.reduce((tot, entry) => {
				return tot + entry.amount;
			}, 0) || 0
		);
	}
	function formatDate(date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1; // 0-indexed
		const day = date.getDate();
		return `${year}-${month}-${day}`; // 2022-11-17
	}

	// Return Calendar
	return (
		<>
			<Calendar
				onActiveStartDateChange={(viewInfo) => {
					setCurrentView({
						view: viewInfo.view,
						date: viewInfo.activeStartDate,
					});
				}}
				onClickDay={(date) => {
					OpenWaterLog(date);
					// Show total & details for date
				}}
				tileDisabled={({ date, view }) => {
					if (view === "month") {
						return date.getMonth() !== currentView.date.getMonth();
					} else if (view === "year") {
						return (
							date.getFullYear() !==
							currentView.date.getFullYear()
						);
					}
				}}
				tileContent={({ date }) => {
					const amount = getTotal(formatDate(date));
					return currentView.view === "month" ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<span
								style={{
									border: "1.5px solid #d41ffd",
									borderRadius: "5px",
									width: "3em",
									fontSize: "0.7em",
									justifyContent: "center",
								}}
							>
								{amount}
							</span>
						</div>
					) : (
						<></>
					);
				}}
			/>
			<LogModal
				logs={selectLog()}
				showLogModal={showLogModal}
				setShowLogModal={setShowLogModal}
			/>
		</>
	);
}

export default CalendarForm;
