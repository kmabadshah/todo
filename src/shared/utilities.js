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

	return makeQuery(token, query, data)
}

// prettier-ignore
export const pullAllUsers = async token => {
		return makeQuery(
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
}

// prettier-ignore
export const checkLoginData = async (allUsers, submissionData) => {
	const user = allUsers.filter(({ uname, pass }) => uname === submissionData.uname.trim())[0] // uname-check
	if (!user) return false

	const { compare } = await import("bcryptjs")
	return compare(data.pass, user.pass) // passCheck
}
