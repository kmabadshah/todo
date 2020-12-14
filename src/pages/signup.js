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
} from "../shared/constants"
import { Context } from "../components/wrapper"
import {
	findVal,
	evalUname,
	isEmpty,
	cacheToLocalStorage,
	pullAllUsers,
} from "../shared/utilities.js"

export default function Signup() {
	const {
		setError,
		getValues,
		register,
		handleSubmit,
		watch,
		errors,
		clearErrors,
	} = useForm()

	const { allUsers, token, setCurrentUser, setAllUsers } = React.useContext(
		Context
	)
	const [loading, setLoading] = React.useState(false)
	const [randErr, setRandErr] = React.useState(false)

	const evalUname = value => {
		if (value.length < 3 || value.length > 10) {
			return err_msgs["uname_minmax"]
		} else if (/[^\w-]+/g.test(value)) {
			return err_msgs["uname_regex"]
		} else {
			return true
		}
	}

	const onValidSubmit = async data => {
		try {
			setLoading(true)
			setRandErr(false)

			const { GraphQLClient: glClient, gql, request } = await import(
				"graphql-request"
			)

			const client = new glClient(`${api}/graphql`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			const query = gql`
				mutation($uname: String!, $pass: String!) {
					createTodoer(input: { data: { uname: $uname, pass: $pass } }) {
						todoer {
							id
							todos {
								text
								id
							}
						}
					}
				}
			`

			/* encryption */
			const bcrypt = await import("bcryptjs")

			bcrypt.hash(data.pass, 10, (err, hash) => {
				data.pass = hash
				client // send data
					.request(query, data)
					.then(async res => {
						setRandErr(false)
						setLoading(false)
						const user = { ...res.createTodoer.todoer }

						const { todoers } = await pullAllUsers(token)

						setAllUsers(todoers)
						setCurrentUser(user)
						cacheToLocalStorage(user, jwtSecret)
						navigate("/user")
					})
					.catch(err => {
						if (findVal(err, "detail").match(/exists/g)) {
							setError("uname", {
								type: "manual",
								message: "That one exists",
							})
						} else {
							setRandErr(true)
						}

						setLoading(false)
					})
			})
		} catch (err) {
			setRandErr(true)
			setLoading(false)
		}
	}

	return (
		<LoggedOut>
			<p>{randErr && "Something went wrong, please try again"}</p>

			<div id="signup">
				<div className="card my-auto">
					<form
						onSubmit={handleSubmit(onValidSubmit)}
						className="card-body d-flex align-items-center justify-content-center flex-column"
					>
						<h1 id="title">Sign Up</h1>
						<input
							type="text"
							placeholder="username"
							className="field"
							id="uname"
							ref={register({
								required: err_msgs["required"],
								validate: value => evalUname(value),
							})}
							name="uname"
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
							className="field"
							id="pass"
							ref={register({
								required: err_msgs["required"],
								validate: {
									minmax: value =>
										((value.length < 3 || value.length > 20) &&
											err_msgs["pass_minmax"]) ||
										true,
								},
							})}
							name="pass"
						/>

						<ErrorMessage
							as="p"
							className="err_msg"
							errors={errors}
							name="pass"
						/>

						<input
							type="password"
							placeholder="confirm password"
							className="field"
							id="conf_pass"
							ref={register({
								required: "This field is required",
								validate: {
									nomatch: value =>
										value === getValues("pass") || err_msgs["pass_nomatch"],
								},
							})}
							name="conf_pass"
						/>

						<ErrorMessage
							as="p"
							className="err_msg"
							errors={errors}
							name="conf_pass"
						/>

						<div className="row no-gutters w-100 justify-content-between">
							<button
								id="btn-submit"
								type="submit"
								className="align-self-start hvr-sweep-to-top"
								disabled={loading || !isEmpty(errors)}
							>
								{loading ? dataProcessLoader : "Submit"}
							</button>
							<Link to="/login" id="btn-login" className="align-self-end mb-3">
								Log In
							</Link>
						</div>
					</form>
				</div>
			</div>
		</LoggedOut>
	)
}
