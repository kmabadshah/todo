import React from "react"
import LoggedOut from "../components/layout/loggedOut"
import { Link, navigate } from "gatsby"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import {
	err_msgs,
	api,
	dataProcessLoader,
	jwtSecret,
} from "../shared/constants.js"
import {
	checkLoginData,
	isEmpty,
	cacheToLocalStorage,
} from "../shared/utilities.js"
import { Context } from "../components/wrapper"

// prettier-ignore
export default function Login() {
	const { token, allUsers, setCurrentUser, x, setX } = React.useContext(Context)
	const [loading, setLoading] = React.useState(false)

	const onValidSubmit = async (data) => {
		setLoading(true)

		const user = await checkLoginData(allUsers, data)
		if (user) {
			setCurrentUser(user)
			if (data.rem_me) cacheToLocalStorage(user, jwtSecret)
			navigate("/user")
		}
		else setError("uname_or_pass", { type: "manual", message: err_msgs["cred_invalid"] })

		setLoading(false)
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
						onChange={() => clearErrors("uname_or_pass")}
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
						<ErrorMessage
							as="p"
							className="err_msg"
							errors={errors}
							name="uname_or_pass"
						/>

						<input
							type="password"
							placeholder="password"
							name="pass"
						onChange={() => clearErrors("uname_or_pass")}
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
								<input name="rem_me" ref={register()} type="checkbox" />
							<p id="rem-me">Remember me</p>
							<Link className="ml-auto" id="btn-sign-up" to="/signup">
								Sign up
							</Link>
						</div>

						<button type="submit" id="btn-submit"
								className="align-self-start mt-4 hvr-sweep-to-top"
								disabled={loading || !isEmpty(errors)}
						>{ loading ? dataProcessLoader : "Submit"}</button>
					</form>
				</div>
			</div>
		</LoggedOut>
	)
}
