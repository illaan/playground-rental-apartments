import React from "react";
import "./../styles/Modal.css";
import MyCalendar from "./Calendar";

const Modal = ({ apartment, closeModal }) => {
	return (
		<div className="modal" onClick={closeModal}>
			<div
				className="modal-content"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<button
					className="w3-button w3-right w3-border "
					style={{
						fontWeight: 600,
						fontSize: "1.5rem",
						// position: "sticky",
						top: 0,
						right: 0,
					}}
					onClick={closeModal}
				>
					X
				</button>
				<div style={{ paddingRight: "3rem" }}>
					<h3
						style={{
							fontWeight: "bold",
						}}
					>
						{apartment.title}
					</h3>
					<img className="w3-image" src={apartment.image} alt="Apartment" />

					<p>
						<strong>Location: </strong>
						{apartment.location}
					</p>
					<p>
						<strong>Price: </strong>${apartment.price}
					</p>
					<p>
						<strong>Capacity: </strong>
						{apartment.guests}
					</p>
					<p>{apartment.description}</p>
				</div>

				<MyCalendar reservations={apartment.reservations} />
			</div>
		</div>
	);
};

export default Modal;
