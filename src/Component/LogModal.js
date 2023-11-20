import { Modal } from "react-bootstrap";
function LogModal({ logs, showLogModal, setShowLogModal }) {
	const total =
		logs?.reduce((tot, entry) => {
			return tot + entry.amount;
		}, 0) || 0;
	return (
		<Modal
			show={showLogModal}
			onHide={() => setShowLogModal(false)}
			centered
		>
			<Modal.Header>飲水報告</Modal.Header>
			<Modal.Body>
				<h2>總和：{total} C.C.</h2>

				{logs.map((log) => (
					<div>
						在{log.drinkTime}的時候，喝了{log.amount} C.C.
					</div>
				))}
			</Modal.Body>
		</Modal>
	);
}
export default LogModal;
