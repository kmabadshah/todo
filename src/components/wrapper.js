import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { gql } from "graphql-request"
import { getToken, getDataFromToken } from "../shared/utilities"
import { initLoader, jwtSecret } from "../shared/constants"

export const Context = React.createContext()

export default function Wrapper({ children, location: { pathname } }) {
	const [token, setToken] = React.useState()
	const [randErr, setRandErr] = React.useState()
	const [currentUser, setCurrentUser] = React.useState()
	const [allUsers, setAllUsers] = React.useState()
	const [userIsLoading, setUserIsLoading] = React.useState(true)
	const [x, setX] = React.useState(69)

	// prettier-ignore
	React.useEffect(() => {

		(async () => {
			try {
				const { getToken, pullAllUsers } = await import("../shared/utilities.js")
				const jwt = await getToken(); setToken(jwt)
				const { todoers } = await pullAllUsers(jwt); setAllUsers(todoers)
				const cachedToken = localStorage.getItem('token')
				
				if (cachedToken) {
					getDataFromToken(cachedToken, jwtSecret).then(cachedData => {
							const user = todoers.find(({ uname }) => uname === cachedData.uname)
							setCurrentUser(user)
							setUserIsLoading(false)

						}).catch(() => setUserIsLoading(false))
				} else {
					setUserIsLoading(false)
				}


			} catch (err) {
				setRandErr(err)
			}

		})()

	}, [])

	// prettier-ignore
	React.useEffect(() => {
		if (currentUser) {
			console.log(currentUser.todos)
			import("../shared/utilities.js")
				.then(async ({ updateUser }) => updateUser(token, currentUser, allUsers, setAllUsers))
				.catch(err => console.log(err))
		}
	}, [currentUser])

	if (token) {
		return (
			<Context.Provider
				value={{ token, currentUser, setCurrentUser, allUsers, setAllUsers }}
			>
				{(() => {
					if (userIsLoading) return initLoader
					if (pathname.includes("user") && !currentUser) navigate("/login")
					else return children
				})()}
			</Context.Provider>
		)
	} else if (randErr) {
		return <h1>Something went wrong, please try again</h1>
	} else return initLoader
}
