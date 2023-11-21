import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

function LogModal({
	logs,
	showLogModal,
	setShowLogModal,
	foodLog,
	setFoodLog,
}) {
	const [activeTab, setActiveTab] = useState("drink");

	const [tempMorning, setTempMorning] = useState(foodLog.morning);
	const [tempLunch, setTempLunch] = useState(foodLog.lunch);
	const [tempDiner, setTempDiner] = useState(foodLog.diner);
	const [tempOthers, setTempOthers] = useState(foodLog.others);
	const total =
		logs?.reduce((tot, entry) => {
			return tot + entry.amount;
		}, 0) || 0;
	// return (
	// 	<Modal
	// 		show={showLogModal}
	// 		onHide={() => setShowLogModal(false)}
	// 		centered
	// 	>
	// 		<Modal.Header>飲水報告</Modal.Header>
	// 		<Modal.Body>
	//
	// 		</Modal.Body>
	// 	</Modal>
	// );
	return (
		<Modal
			show={showLogModal}
			onHide={() => setShowLogModal(false)}
			centered
		>
			<Modal.Header closeButton></Modal.Header>

			<Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
				<Tab eventKey="drink" title="飲水報告">
					<Modal.Body>
						<h2>總和：{total} C.C.</h2>

						{logs.map((log) => (
							<div>
								在{log.drinkTime}的時候，喝了{log.amount} C.C.
							</div>
						))}
					</Modal.Body>
				</Tab>

				<Tab eventKey="food" title="飲食紀錄">
					<Modal.Body>
						<h3>
							早餐：
							<input
								value={tempMorning}
								onChange={(e) => {
									setTempMorning(e.target.value);
								}}
							/>
						</h3>

						<h3>
							午餐：
							<input
								value={tempLunch}
								onChange={(e) => {
									setTempLunch(e.target.value);
								}}
							/>
						</h3>
						<h3>
							晚餐：
							<input
								value={tempDiner}
								onChange={(e) => {
									setTempDiner(e.target.value);
								}}
							/>
						</h3>
						<h3>
							其他：
							<input
								value={tempOthers}
								onChange={(e) => {
									setTempOthers(e.target.value);
								}}
							/>
							{""}
						</h3>
					</Modal.Body>
				</Tab>
			</Tabs>

			<Modal.Footer>
				<Button variant="secondary">Close</Button>
				<Button
					variant="primary"
					onClick={() => {
						setFoodLog({
							morning: tempMorning,
							lunch: tempLunch,
							diner: tempDiner,
							others: tempOthers,
						});
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
