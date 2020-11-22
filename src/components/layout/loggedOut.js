import React from "react"

export default function LoggedOut({ children }) {
	return (
		<div id="wrapper">
			<h1 id="logo">Todo APP</h1>
			{children}
		</div>
	)
}
