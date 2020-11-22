import React from "react"
import { Link } from "gatsby"

export default function Navbar() {
	return (
		<div id="navbar">
			<Link to="/user" id="btn-home">
				Home
			</Link>
			<Link to="/user/about" id="btn-about">
				About
			</Link>
			<Link to="/user/settings" id="btn-settings">
				Settings
			</Link>
		</div>
	)
}
