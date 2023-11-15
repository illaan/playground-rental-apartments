import Apartment from "./Apartment.jsx";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const ApartmentList = ({
	toggleSideBar,
	filteredApartments,
	openModal,
	sideBarOpen,
}) => {
	return (
		<div className="w3-container">
			<button
				className="w3-button w3-light-gray w3-right w3-hide-large w3-hide-medium w3-mobile"
				style={{
					marginBottom: "1rem",
					marginTop: "2rem",
					fontWeight: 530,
					fontFamily: "fantasy",
				}}
				onClick={toggleSideBar}
			>
				<FontAwesomeIcon style={{ marginRight: "0.6rem" }} icon={faFilter} />
				{sideBarOpen ? "Hide filters" : "Show filters"}
			</button>
			{filteredApartments.length > 0 ? (
				filteredApartments.map((apartment) => (
					<Apartment
						className="w3-mobile"
						key={apartment.id}
						openModal={openModal}
						apartment={apartment}
					/>
				))
			) : (
				<div className=" w3-container w3-center" style={{ marginTop: "3rem" }}>
					<p>No results found.</p>
				</div>
			)}
		</div>
	);
};

export default ApartmentList;
