import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./../styles/Calendar.css";
import { isWithinInterval } from "date-fns";

const MyCalendar = ({ reservations }) => {
	console.log("Reservations:", reservations);

	const isDateReserved = (date) => {
		return reservations.some((reservation) =>
			isWithinInterval(date, {
				start: new Date(reservation.check_in),
				end: new Date(reservation.check_out),
			})
		);
	};

	return (
		<div
			className="w3-container"
			style={{ display: "flex", justifyContent: "center" }}
		>
			<Calendar
				tileClassName={({ date }) => (isDateReserved(date) ? "red-cell" : "")}
			/>
		</div>
	);
};

export default MyCalendar;
