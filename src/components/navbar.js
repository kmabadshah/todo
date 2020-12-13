import React from "react"
import { Link } from "gatsby"
import { Context } from "./wrapper.js"

export default function Navbar() {
	const { setCurrentUser } = React.useContext(Context)
	const handleLogout = async () => {
		setCurrentUser(null)
		localStorage.removeItem("token")

		const { navigate } = await import("gatsby")
		navigate("/login")
	}

	return (
		<div id="navbar">
			<Link to="/user" id="btn-home">
				Home
			</Link>
			<button onClick={() => handleLogout()} id="btn-logout">
				Logout
			</button>
		</div>
	)
}
