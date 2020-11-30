import React from "react"
import Navbar from "../../components/navbar"
import LoggedIn from "../../components/layout/loggedIn.js"
import { Context } from "../../components/wrapper.js"

export default function Settings() {
	const { setCurrentUser } = React.useContext(Context)
	const handleLogout = async () => {
		setCurrentUser(null)
		localStorage.setItem("uname", null)

		const { navigate } = await import("gatsby")
		navigate("/login")
	}

	return (
		<LoggedIn>
			<h1>Settings</h1>
			<button onClick={() => handleLogout()}>Log out</button>
		</LoggedIn>
	)
}
