import React from "react";
import "./../styles/Apartment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill, faMapPin } from "@fortawesome/free-solid-svg-icons";

const Apartment = ({ apartment, openModal }) => {
	return (
		<div
			className="w3-container w3-card w3-col l5 m5 apartment-card"
			onClick={() => openModal(apartment)}
		>
			<h3
				style={{
					fontWeight: "bold",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					minHeight: "3rem",
				}}
			>
				{apartment.title}
			</h3>
			<p>
				<FontAwesomeIcon icon={faMapPin} style={{ marginRight: "0.5rem" }} />
				{apartment.location}
			</p>
			<p>
				<FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: "0.5rem" }} />
				${apartment.price}
			</p>
			<p
				style={{
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
			>
				{apartment.description}
			</p>
		</div>
	);
};

export default Apartment;
