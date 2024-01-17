import React, { useEffect } from "react";

const MouseDrag = ({ elementClass }) => {
	useEffect(() => {
		const addMouseDragFunctionality = () => {
			const el = document.querySelector(`.${elementClass}`);
			if (!el) return;

			let isDown = false;
			let startX;
			let scrollLeft;

			const mouseDownHandler = (e) => {
				isDown = true;
				startX = e.pageX - el.offsetLeft;
				scrollLeft = el.scrollLeft;
			};

			const mouseLeaveHandler = () => {
				isDown = false;
			};

			const mouseUpHandler = () => {
				isDown = false;
			};

			const mouseMoveHandler = (e) => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - el.offsetLeft;
				const walk = (x - startX) * 2;
				el.scrollLeft = scrollLeft - walk;
			};

			el.addEventListener("mousedown", mouseDownHandler);
			el.addEventListener("mouseleave", mouseLeaveHandler);
			el.addEventListener("mouseup", mouseUpHandler);
			el.addEventListener("mousemove", mouseMoveHandler);

			return () => {
				el.removeEventListener("mousedown", mouseDownHandler);
				el.removeEventListener("mouseleave", mouseLeaveHandler);
				el.removeEventListener("mouseup", mouseUpHandler);
				el.removeEventListener("mousemove", mouseMoveHandler);
			};
		};

		addMouseDragFunctionality();
	}, [elementClass]);

	return null;
};

export default MouseDrag;
