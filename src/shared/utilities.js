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

export const updateUser = async (token, currentUser, allUsers, setAllUsers) => {
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
		id: currentUser.id,
		todos: currentUser.todos,
	}

	await makeQuery(token, query, data)

	const tempUsers = [...allUsers]
	const userIndex = tempUsers.findIndex(
		({ uname }) => uname === currentUser.uname
	)
	tempUsers[userIndex] = currentUser
	setAllUsers(tempUsers)
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
	const user = allUsers.find(({ uname, pass }) => uname === submissionData.uname.trim()) // uname-check
	if (!user) return false

	const { compare } = await import("bcryptjs")
	const passCheck = await compare(submissionData.pass, user.pass) // passCheck
	return passCheck ? user : false
}

export const findVal = (object, key) => {
	var value
	Object.keys(object).some(function (k) {
		if (k === key) {
			value = object[k]
			return true
		}
		if (object[k] && typeof object[k] === "object") {
			value = findVal(object[k], key)
			return value !== undefined
		}
	})
	return value
}

export const isEmpty = obj => {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

export const cacheToLocalStorage = async (data, secret) => {
	const jwt = await import("jsonwebtoken")
	jwt.sign({ uname: data.uname }, secret, (err, cacheToken) => {
		localStorage.setItem("token", cacheToken)
	})
}

export const getDataFromToken = async (cachedToken, secret) => {
	const jwt = await import("jsonwebtoken")
	return jwt.verify(cachedToken, secret, (err, decryptedData) => {
		if (err) throw new Error("Invalid token")
		else return decryptedData
	})
}
