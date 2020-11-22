import React from "react"
import Navbar from "../navbar"

export default function LoggedIn({ children }) {
	return (
		<div
			className="d-flex flex-column"
			style={{ backgroundColor: "#FDFFFC", height: "100vh" }}
		>
			<Navbar />
			{children}
		</div>
	)
}
