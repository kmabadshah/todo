import React from "react"
import { Context } from "../wrapper"
import View from "./view"

export default function TodoCard() {
	const [submitted, setSubmitted] = React.useState(false)
	const [todoText, setTodoText] = React.useState("")
	const { token, currentUser, setCurrentUser } = React.useContext(Context)
	/* const [todos, setTodos] = React.useState(currentUser.todos); */

	React.useEffect(() => {
		if (submitted && todoText) {
			const tempTodos = [...currentUser.todos]
			tempTodos.unshift({ text: todoText })

			const tempUser = { ...currentUser }
			tempUser["todos"] = tempTodos
			setCurrentUser(tempUser)
			setTodoText("")
			setSubmitted(false)
		}
	}, [submitted])

	return (
		<View
			data={{
				setSubmitted,
				setTodoText,
				todoText,
				currentUser,
			}}
		/>
	)
}
