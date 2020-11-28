import React from "react"
import LoggedOut from "../components/layout/loggedOut"
import { Link } from "gatsby"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { err_msgs, api } from "../shared/constants.js"
import { Context } from "../components/wrapper"

// prettier-ignore
export default function Login() {
	const { token, allUsers } = React.useContext(Context)
	const onValidSubmit = async (data) => {
		const {checkLoginData} = await import("../shared/utilities.js")
		const userDataIsValid = await checkLoginData(allUsers, data)

		if (userDataIsValid) console.log("Correct")
		else {
			const {err_msgs:{cred_invalid}} = await import("../shared/constants.js")
			setError("uname", { type: "manual", message: cred_invalid })
		}
	}

	const {
		setError,
		getValues,
		register,
		handleSubmit,
		watch,
		errors,
		clearErrors,
	} = useForm()

	return (
		<LoggedOut>
			<div id="login">
				<div className="card my-auto">
					<form
						onSubmit={handleSubmit(onValidSubmit)}
						className="card-body d-flex align-items-center justify-content-center flex-column"
					>
						<h1 id="title">Log In</h1>
						<input
							type="text"
							placeholder="username"
							className="field"
							id="uname"
							name="uname"
							ref={register({
								required: err_msgs["required"],
							})}
						/>

						<ErrorMessage
							as="p"
							className="err_msg"
							errors={errors}
							name="uname"
						/>

						<input
							type="password"
							placeholder="password"
							name="pass"
							className="field"
							id="pass"
							ref={register({
								required: err_msgs["required"],
							})}
						/>

						<ErrorMessage
							as="p"
							className="err_msg"
							errors={errors}
							name="pass"
						/>

						<div className="d-flex w-100 align-items-center">
							<input name="" type="checkbox" value="" />
							<p id="rem-me">Remember me</p>
							<Link className="ml-auto" id="btn-sign-up" to="/signup">
								Sign up
							</Link>
						</div>

						<input
							id="btn-submit"
							className="align-self-start mt-4 hvr-sweep-to-top"
							type="submit"
							value="Submit"
						/>
					</form>
				</div>
			</div>
		</LoggedOut>
	)
}
