import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaGlassWater, FaPlus, FaMinus } from "react-icons/fa6";

function SettingForm({ waterLog, setWaterLog, setView }) {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				width: "100%",
				height: "100%",
				margin: "auto",
			}}
		>
			<Button style={{ margin: "auto", fontSize: "5em" }}>
				開始喝水
			</Button>
		</div>
	);
}
export default SettingForm;
