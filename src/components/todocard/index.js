import React from "react"
import { BsCheck } from "react-icons/bs"
import { Context } from "../wrapper"
import Todo from "./todo"

export default function TodoCard() {
	const [submitted, setSubmitted] = React.useState(false)
	const [todoText, setTodoText] = React.useState("")
	const { token, currentUser, setCurrentUser } = React.useContext(Context)

	const [todosInCurrentSet, setTodosInCurrentSet] = React.useState(
		currentUser.todos.slice(0, 5)
	)
	const [currentTodoSetNumber, setCurrentTodoSetNumber] = React.useState(0)
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
		<div id="todocard">
			<div id="card">
				<div id="todo-input">
					<input
						type="text"
						onChange={e => setTodoText(e.target.value)}
						onKeyDown={e =>
							e.key === "Enter" && todoText.trim()
								? setSubmitted(true)
								: setSubmitted(false)
						}
						id="todo-text"
						value={todoText}
						placeholder="I will meditate..."
					/>
					<button
						id="btn-submit"
						onClick={() => todoText.trim() && setSubmitted(true)}
					>
						<BsCheck />
					</button>
				</div>

				{getTodosInCurrentSet()}
				{getButtons()}
			</div>
		</div>
	)

	function getTodosInCurrentSet() {
		/* console.log(todosInCurrentSet) */
		return todosInCurrentSet.map((todo, i) => (
			<Todo
				key={i}
				index={i}
				data={{ text: todo.text, currentTodoSetNumber }}
			/>
		))
	}

	function getButtons() {
		const amountOfTodoSets = Math.ceil(currentUser.todos.length / 5)

		return [...Array(amountOfTodoSets).keys()].map((item, i) => (
			<button
				key={i}
				onClick={() => {
					setCurrentTodoSetNumber(item)
					setTodosInCurrentSet(() => {
						return currentUser.todos.slice(item * 5, item * 5 + 5)
					})
				}}
			>
				{item + 1}
			</button>
		))
	}
}
