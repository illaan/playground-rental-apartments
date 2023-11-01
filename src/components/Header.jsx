import React from "react";
import "./../styles/Header.css";
import logo from "./../assets/rental_logo.png";

const Header = () => {
	return (
		<div className="w3-container header">
			<h1 className="w3-col l7 m8 header-title">Apartment Seeker</h1>
			<img
				src={logo}
				alt="Building Logo"
				className="w3-right w3-col l2 m3 w3-hide-small"
			/>
			<p className=" w3-row header-text">Find your ideal place to stay...</p>
		</div>
	);
};

export default Header;
