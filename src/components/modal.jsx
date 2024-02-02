import "../css/modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Modall = ({
	isOpen,
	onClose,
	isCloseBtn,
	backgroundColor,
	closeText,
	content,
	children,
}) => {
	const [prepareClose, setPrepareClose] = useState(false);

	const onCloseHandler = () => {
		setPrepareClose(true);
		setTimeout(() => {
			onClose(false);
			setPrepareClose(false);
		}, 800);
	};

	return (
		isOpen && (
			<div
				className={`modal  modal-fadeIn ${
					prepareClose ? "modal-fadeOut" : ""
				}`}
				onClick={onCloseHandler}
			>
				<div
					className="modal-content"
					style={{
						backgroundColor: backgroundColor,
						borderColor: backgroundColor,
					}}
					onClick={(e) => e.stopPropagation()}
				>
					<span
						className={
							closeText && isCloseBtn !== false
								? "close double-close"
								: "close simple-close"
						}
						onClick={onCloseHandler}
					>
						{isCloseBtn !== false && (
							<FontAwesomeIcon
								icon={faX}
								style={{ paddingTop: "8px" }}
							/>
						)}
						<p>{closeText}</p>
					</span>

					{/* <p>
						{content}
						<span onClick={onCloseHandler} className="close-text">
							Close
						</span>
					</p> */}
					{children}
				</div>
			</div>
		)
	);
};

export default Modall;
