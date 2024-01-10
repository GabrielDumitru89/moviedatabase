import React, { useState } from "react";
import Modal from 'react-modal';
import { useSelector, useDispatch } from "react-redux";

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

const ModalComponent = () => {

const dispatch = useDispatch();
const open = useSelector((state) => (state.app.modal));
// console.log(open);
const video = useSelector((state) => state.app.modal?.video);
// console.log(video);

	function closeModal() {
		dispatch(closeModal());
	
	}
	return (
		<div>
			<Modal
        isOpen={open}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
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
