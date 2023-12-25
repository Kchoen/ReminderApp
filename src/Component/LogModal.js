import { Modal, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import camera from "./Camera";

function LogModal({
	showLogModal,
	setShowLogModal,
	logDate,
	waterLog,
	temp,
	setTemp,
	setFoodLog,
}) {
	const [activeTab, setActiveTab] = useState("drink");

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
						<Button variant="success" onClick={camera.startCamera}>
							拍照
						</Button>
						<Button onClick={camera.takeSnapshot}>儲存</Button>
						<video id="video" width="80%"></video>
						<canvas id="canvas" width="80%"></canvas>
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
