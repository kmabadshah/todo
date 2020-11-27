// prettier-ignore
export const getToken = async () => {
	try {
		const axios = await import ("axios")
		const { cred, api } = await import("./constants.js")
		const {data:{ jwt }} = await axios.post(`${api}/auth/local`, cred)
		return jwt

	} catch (err) {
		console.log("err")
	}
}

// prettier-ignore
export const makeQuery = async (token, query, data=null) => {
	try {
		const { GraphQLClient: glClient, request } = await import("graphql-request")
		const { api } = await import("./constants.js")

		const client = new glClient(`${api}/graphql`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		return client.request(query, data)

	} catch (err) {
		console.log(err)
	}
}

export const updateUser = async (token, { id, todos }) => {
	const query = `
		mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
			updateTodoer(input: { where: { id: $id }, data: { todos: $todos } }) {
				todoer {
					id
				}
			}
		}
	`
	const data = {
		id,
		todos,
	}

	const res = makeQuery(token, query, data)
	return res
}

export const pullAllUsers = async token => {
	try {
		const res = await makeQuery(
			token,
			`query {
					todoers {
						id
						uname
						pass
						todos {
							text
						}
					}
				}`
		)

		console.log(res)
	} catch (err) {
		console.log("Err: ", err)
	}
}
