import React, { useState } from "react";
import "../styles/AddApartmentForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AddApartmentForm = ({ addApartment }) => {
	const [formData, setFormData] = useState({
		title: "",
		location: "",
		price: "",
		guests: "",
		description: "",
	});

	const [formErrors, setFormErrors] = useState({
		title: "",
		location: "",
		price: "",
		guests: "",
		description: "",
	});

	const [successMessage, setSuccessMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
		setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const form = e.target.form;
			const index = Array.prototype.indexOf.call(form, e.target);
			form.elements[index + 1].focus();
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (formData.title.trim() === "") {
			newErrors.title = (
				<span>
					<FontAwesomeIcon icon={faExclamationCircle} />
					&nbsp;Title is required.
				</span>
			);
		}

		if (formData.location.trim() === "") {
			newErrors.location = (
				<span>
					<FontAwesomeIcon icon={faExclamationCircle} />
					&nbsp;Location is required.
				</span>
			);
		}

		if (formData.price.trim() === "") {
			newErrors.price = (
				<span>
					<FontAwesomeIcon icon={faExclamationCircle} />
					&nbsp;Price is required.
				</span>
			);
		}

		if (formData.guests.trim() === "") {
			newErrors.guests = (
				<span>
					<FontAwesomeIcon icon={faExclamationCircle} />
					&nbsp;Guests is required.
				</span>
			);
		}

		if (formData.description.trim() === "") {
			newErrors.description = (
				<span>
					<FontAwesomeIcon icon={faExclamationCircle} />
					&nbsp;Description is required.
				</span>
			);
		}

		setFormErrors(newErrors);

		return Object.values(newErrors).every((error) => error === "");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = validateForm();
		if (!isValid) {
			return;
		}
		addApartment(formData);

		setFormData({
			title: "",
			location: "",
			price: "",
			guests: "",
			description: "",
		});

		setSuccessMessage("Apartment added successfully!");
		setTimeout(() => {
			setSuccessMessage("");
		}, 3000);
	};

	return (
		<form className="w3-container" onSubmit={handleSubmit}>
			<label className="w3-container">
				Title:
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<div className="error">{formErrors.title}</div>
			</label>
			<label className="w3-container">
				Location:
				<input
					type="text"
					name="location"
					value={formData.location}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<div className="error">{formErrors.location}</div>
			</label>
			<label className="w3-container">
				Price:
				<input
					type="number"
					name="price"
					value={formData.price}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<div className="error">{formErrors.price}</div>
			</label>
			<label className="w3-container">
				Guests:
				<input
					type="number"
					name="guests"
					value={formData.guests}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<div className="error">{formErrors.guests}</div>
			</label>
			<label className="w3-container">
				Description:
				<input
					type="text"
					name="description"
					value={formData.description}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				<div className="error">{formErrors.description}</div>
			</label>
			<div className="button-container">
				<button type="submit">Add Apartment</button>
			</div>
			{successMessage && (
				<div className="success-message">{successMessage}</div>
			)}
		</form>
	);
};

export default AddApartmentForm;
