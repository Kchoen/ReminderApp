import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaGlassWater, FaPlus, FaMinus } from "react-icons/fa6";
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
function DrinkInput({ waterLog, setWaterLog, showDrink, setShowDrink }) {
	const [quantity, setQuantity] = useState(200);
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
	}
	return (
		<Modal show={showDrink} onHide={() => setShowDrink(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title style={{ fontSize: "2em", margin: "auto" }}>
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
							onClick={() => setQuantity((q) => q + 50)}
						>
							<FaPlus size={65} />
						</Button>
						<Button
							variant="link"
							onClick={() => setQuantity((q) => q - 50)}
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
						setQuantity(200);
						setShowDrink(false);
					}}
				>
					喝水
				</Button>
			</Modal.Body>
		</Modal>
	);
}

export default DrinkInput;
