import React from "react"
import { BsCheck } from "react-icons/bs"
import { Context } from "../wrapper"
import Todo from "./todo"

export default function TodoCard() {
	const [submitted, setSubmitted] = React.useState(false)
	const [todoText, setTodoText] = React.useState("")
	const { token, currentUser, setCurrentUser } = React.useContext(Context)

	// prettier-ignore
	const [todosInCurrentSet, setTodosInCurrentSet] = React.useState(currentUser.todos.slice(0, 5))
	const [currentTodoSetNumber, setCurrentTodoSetNumber] = React.useState(0)

	React.useEffect(() => {
		if (submitted && todoText) {
			/* update the user with new todos */
			const tempTodos = [...currentUser.todos]
			tempTodos.splice(currentTodoSetNumber * 5, 0, { text: todoText })
			const tempUser = { ...currentUser }
			tempUser["todos"] = tempTodos
			setCurrentUser(tempUser)
			setTodoText("")
			setSubmitted(false)

			/* update the todos in current set */
			const tempSet = tempTodos.slice(
				currentTodoSetNumber * 5,
				currentTodoSetNumber * 5 + 5
			)
			setTodosInCurrentSet(tempSet)
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

		return [...Array(amountOfTodoSets).keys()].map((btnNum, i) => (
			<button
				key={i}
				onClick={() => {
					setCurrentTodoSetNumber(btnNum)
					setTodosInCurrentSet(
						currentUser.todos.slice(btnNum * 5, btnNum * 5 + 5)
					)
				}}
			>
				{btnNum + 1}
			</button>
		))
	}
}
