import React from "react"
import { cred, api } from "./constants.js"
import { useStaticQuery, graphql, navigate } from "gatsby"

export const Context = React.createContext()

export default function Wrapper({ children, location: { pathname } }) {
	const [token, setToken] = React.useState()
	const [randErr, setRandErr] = React.useState()
	const [currentUser, setCurrentUser] = React.useState()

	const loggedIn = true

	React.useEffect(() => {
		import("axios").then(axios =>
			axios
				.post(`${api}/auth/local`, cred)
				.then(data => {
					setToken(data.data.jwt)
				})
				.catch(err => {
					setRandErr(err)
				})
		)
	}, [])

	React.useEffect(() => {
		currentUser &&
			(async updatedTodos => {
				try {
					const { api } = await import("./constants")
					const { GraphQLClient: glClient, gql, request } = await import(
						"graphql-request"
					)
					const client = new glClient(`${api}/graphql`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					const query = gql`
						mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
							updateTodoer(
								input: { where: { id: $id }, data: { todos: $todos } }
							) {
								todoer {
									id
								}
							}
						}
					`

					const data = {
						id: currentUser.id,
						todos: updatedTodos,
					}

					await client.request(query, data)
				} catch (err) {
					console.log(err)
				}
			})(currentUser.todos)
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
