import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { gql } from "graphql-request"
import { getToken } from "../shared/utilities"

export const Context = React.createContext()

export default function Wrapper({ children, location: { pathname } }) {
	const [token, setToken] = React.useState()
	const [randErr, setRandErr] = React.useState()
	const [currentUser, setCurrentUser] = React.useState()

	const loggedIn = true

	// prettier-ignore
	React.useEffect(() => {

		(async () => {
			try {
				const { getToken, pullAllUsers } = await import("../shared/utilities.js")
				const jwt = await getToken()
				setToken(jwt)
				pullAllUsers(jwt)

			} catch (err) {
				setRandErr(err)
			}

		})()

	}, [])

	React.useEffect(() => {
		currentUser &&
			import("../shared/utilities.js")
				.then(({ updateUser }) => updateUser(token, currentUser))
				.catch(err => console.log(err))
	}, [currentUser])

	if (token) {
		return (
			<Context.Provider value={{ token, currentUser, setCurrentUser }}>
				{(() => {
					if (pathname.includes("user") && !loggedIn) navigate("/login")
					else return children
				})()}
			</Context.Provider>
		)
	} else if (randErr) {
		return <h1>Something went wrong, please try again</h1>
	} else {
		return (
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
	}
}
