import "./styles/App.css";
import { useState, useEffect } from "react";
import SideBar from "./components/SideBar.jsx";
import Header from "./components/Header.jsx";
import Apartment from "./components/Apartment.jsx";
import Modal from "./components/Modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
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

				<button
					className="w3-button w3-light-gray w3-right w3-hide-large w3-hide-medium"
					style={{
						marginBottom: "0rem",
						marginTop: "2rem",
						fontWeight: 530,
						fontFamily: "fantasy",
					}}
					onClick={toggleSideBar}
				>
					<FontAwesomeIcon style={{ marginRight: "0.6rem" }} icon={faFilter} />
					{sideBarOpen ? "Hide filters" : "Show filters"}
				</button>
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
				<div className="w3-container">
					{filteredApartments.length > 0 ? (
						filteredApartments.map((apartment) => (
							<Apartment
								key={apartment.id}
								openModal={openModal}
								apartment={apartment}
							/>
						))
					) : (
						<div
							className=" w3-container w3-center"
							style={{ marginTop: "3rem" }}
						>
							<p>No results found.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
