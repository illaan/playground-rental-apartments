import "./styles/App.css";
import { useState, useEffect } from "react";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";
import Modal from "./components/Modal.jsx";
import AddApartmentForm from "./components/AddApartmentForm.jsx";
import ApartmentList from "./components/ApartmentList.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, Link, useLocation } from "react-router-dom";
function App() {
	const [apartments, setApartments] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedApartment, setSelectedApartment] = useState(null);
	const [locationFilter, setLocationFilter] = useState("");
	const [priceRange, setPriceRange] = useState(5000);
	const [guestFilter, setGuestFilter] = useState(0);
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const [filteredApartments, setFilteredApartments] = useState([]);
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");

	const toggleSideBar = () => {
		setSideBarOpen(!sideBarOpen);
	};

	const openModal = (apartment) => {
		setSelectedApartment(apartment);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedApartment(null);
		setIsModalOpen(false);
	};

	const getAllApartments = async () => {
		try {
			const response = await fetch("http://127.0.0.1:5000/apartments");
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			setApartments(data);
			setFilteredApartments(data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const addApartment = async (newApartment) => {
		try {
			const response = await fetch("http://127.0.0.1:5000/apartments", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newApartment),
			});

			if (!response.ok) {
				throw new Error("Failed to add apartment");
			}

			const updatedApartments = await response.json();
			setApartments(updatedApartments);
			setFilteredApartments(updatedApartments);
		} catch (error) {
			console.error("Error adding apartment:", error);
		}
	};

	const filterApartments = () => {
		const filtered = apartments.filter((apartment) => {
			const isAvailable = apartment.reservations.every((reservation) => {
				if (checkInDate !== "" && checkOutDate !== "") {
					return (
						new Date(checkInDate) >= new Date(reservation.check_out) ||
						new Date(checkOutDate) <= new Date(reservation.check_in)
					);
				}
				return true; // No date specified, so it's always available.
			});
			return (
				apartment.location
					.toLowerCase()
					.includes(locationFilter.toLocaleLowerCase()) &&
				apartment.price <= priceRange &&
				apartment.guests >= guestFilter &&
				isAvailable
			);
		});
		setFilteredApartments(filtered);
	};
	useEffect(() => {
		getAllApartments();
		console.log(apartments);
	}, []);
	return (
		<div className="w3-container" style={{ paddingInline: 0 }}>
			<div className="w3-hide-small">
				<SideBar
					className="w3-sidebar w3-bar-block w3-card w3-animate-left w3-col l2 m3"
					filterApartments={filterApartments}
					getAllApartments={getAllApartments}
					setLocationFilter={setLocationFilter}
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					guestFilter={guestFilter}
					setGuestFilter={setGuestFilter}
					checkInDate={checkInDate}
					checkOutDate={checkOutDate}
					setCheckInDate={setCheckInDate}
					setCheckOutDate={setCheckOutDate}
				/>
			</div>
			{isModalOpen && (
				<Modal apartment={selectedApartment} closeModal={closeModal} />
			)}

			<div className="w3-container w3-right w3-col l10 m9 ">
				<Header />
				<div className="w3-container w3-col l11">
					<Link
						to={
							useLocation().pathname === "/add-apartment"
								? "/"
								: "/add-apartment"
						}
					>
						{useLocation().pathname === "/add-apartment" ? (
							<button
								className="w3-button w3-light-gray w3-center w3-mobile"
								style={{
									marginTop: "1rem",
									fontWeight: 530,
									fontFamily: "fantasy",
								}}
							>
								<FontAwesomeIcon
									style={{
										marginRight: "0.6rem",
										fontSize: "1.4rem",
									}}
									icon={faAngleLeft}
								/>
								Back to home
							</button>
						) : (
							<button
								className="w3-button w3-light-gray w3-center w3-mobile"
								style={{
									marginTop: "1rem",
									fontWeight: 530,
									fontFamily: "fantasy",
								}}
							>
								<FontAwesomeIcon
									style={{
										marginRight: "0.6rem",
										fontSize: "1.6rem",
									}}
									icon={faPlus}
								/>
								Add new apartment
							</button>
						)}
					</Link>
				</div>
				<Routes>
					<Route
						path="/add-apartment"
						element={<AddApartmentForm addApartment={addApartment} />}
					/>
					<Route
						path="/"
						element={
							<ApartmentList
								filteredApartments={filteredApartments}
								toggleSideBar={toggleSideBar}
								openModal={openModal}
							/>
						}
					/>
				</Routes>

				{sideBarOpen && (
					<div className="w3-container w3-hide-large w3-hide-medium">
						<SideBar
							className="w3-container w3-mobile"
							filterApartments={filterApartments}
							setLocationFilter={setLocationFilter}
							priceRange={priceRange}
							setPriceRange={setPriceRange}
							guestFilter={guestFilter}
							setGuestFilter={setGuestFilter}
							checkInDate={checkInDate}
							checkOutDate={checkOutDate}
							setCheckInDate={setCheckInDate}
							setCheckOutDate={setCheckOutDate}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
