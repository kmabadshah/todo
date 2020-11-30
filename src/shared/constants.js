import React from "react"

export const err_msgs = {
	required: "This field is required",
	pass_nomatch: "Passwords don't match",
	pass_minmax: "Password must be between 3 and 20 characters long",
	uname_minmax: "Username must be between 3 and 10 characters long",
	uname_regex: "Username cannot contain non word characters",
	cred_invalid: "Invalid username or password",
}

export const api = "http://localhost:1337"

export const cred = {
	identifier: "adnan@badshah.com",
	password: "adnanbadshah",
}

export const loader = (
	<div id="loader">
		<div className="lds-dual-ring">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
)
