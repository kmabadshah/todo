import React from "react"
import LoggedOut from "../components/layout/loggedOut"
import { Link } from "gatsby"

export default function Login() {
	return (
		<LoggedOut>
			<div id="login">
				<div className="card my-auto">
					<div className="card-body d-flex align-items-center justify-content-center flex-column">
						<h1 id="title">Log In</h1>
						<input
							type="text"
							placeholder="username"
							className="field"
							id="uname"
						/>
						<input
							type="text"
							placeholder="password"
							className="field"
							id="pass"
						/>

						<div className="d-flex w-100 align-items-center">
							<input name="" type="checkbox" value="" />
							<p id="rem-me">Remember me</p>
							<Link className="ml-auto" id="btn-sign-up" to="/signup">
								Sign up
							</Link>
						</div>

						<button
							id="btn-submit"
							className="align-self-start mt-4 hvr-sweep-to-top"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</LoggedOut>
	)
}
