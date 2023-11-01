import React, { useState } from "react";
import "./../styles/SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faMapMarked,
	faUsers,
	faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = ({
	setLocationFilter,
	priceRange,
	setPriceRange,
	setGuestFilter,
	className,
	filterApartments,
	setCheckInDate,
	setCheckOutDate,
	checkInDate,
	checkOutDate,
}) => {
	const handleLocationChange = (e) => {
		setLocationFilter(e.target.value);
	};

	const handlePriceChange = (e) => {
		setPriceRange(e.target.value);
	};

	const handleGuestChange = (e) => {
		setGuestFilter(e.target.value);
	};

	const handleCheckInChange = (e) => {
		setCheckInDate(e.target.value);
	};

	const handleCheckOutChange = (e) => {
		setCheckOutDate(e.target.value);
	};

	return (
		<div className={className} id="sidebar">
			<h3 className="w3-bar-item w3-text-blue">Rental Filters</h3>
			<div className="w3-bar-item">
				<label>
					Location
					<FontAwesomeIcon
						icon={faMapMarked}
						style={{ marginLeft: "0.5rem" }}
					/>
				</label>
				<input
					type="text"
					className="w3-input"
					placeholder="Enter location"
					onChange={handleLocationChange}
				/>
			</div>
			<div className="w3-bar-item">
				<label>Check-in Date</label>
				<input
					type="date"
					className="w3-input"
					value={checkInDate}
					onChange={handleCheckInChange}
				/>
			</div>
			<div className="w3-bar-item">
				<label>Check-out Date</label>
				<input
					type="date"
					className="w3-input"
					value={checkOutDate}
					onChange={handleCheckOutChange}
				/>
			</div>
			<div className="w3-bar-item">
				<label>
					Guests
					<FontAwesomeIcon icon={faUsers} style={{ marginLeft: "0.5rem" }} />
				</label>
				<input
					type="number"
					className="w3-input"
					min="1"
					placeholder="0"
					onChange={handleGuestChange}
				/>
			</div>
			<div className="w3-bar-item">
				<label>
					Price Range
					<FontAwesomeIcon
						icon={faDollarSign}
						style={{ marginLeft: "0.5rem" }}
					/>
				</label>
				<input
					type="range"
					className="w3-input"
					min="0"
					max="5000"
					step="10"
					value={priceRange}
					onChange={handlePriceChange}
				/>
				<span className="price-label">$0- ${priceRange}</span>
			</div>
			<button
				className="w3-button w3-blue w3-bar-item w3-center"
				onClick={filterApartments}
			>
				<FontAwesomeIcon icon={faSearch} style={{ marginRight: "0.5rem" }} />
				Search availability
			</button>
		</div>
	);
};

export default SideBar;
