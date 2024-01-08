import React, { useState } from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		padding: 40,
		display: "flex",
		flexDirection: "column",
		gap: 30,
	},
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		backgroundColor: "rgba(0, 0, 0, 0.75)",
	},
};
const ModalComponent = ({video, isOpen, closeModal}) => {
	let subtitle;
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function afterOpenModal() {
		// subtitle.style.color = "#f00";
	}

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<div>
			<Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
				{/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
				<button onClick={closeModal}>close</button>
				{video && video.site === "YouTube" && (
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${video.key}`}
						title={video.name}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				)}
			</Modal>
		</div>
	);
};

export default ModalComponent;
