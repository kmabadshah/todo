import React from "react"
import { BsCheck } from "react-icons/bs"
import { Context } from "../wrapper"
import Todo from "./todo"
import { SwitchTransition, CSSTransition } from "react-transition-group"

export default function TodoCard() {
	const [submitted, setSubmitted] = React.useState(false)
	const [todoText, setTodoText] = React.useState("")
	const { token, currentUser, setCurrentUser } = React.useContext(Context)
	const [userIsUpdaing, setUserIsUpdating] = React.useState(false)

	// prettier-ignore
	const [currentTodoSetNumber, setCurrentTodoSetNumber] = React.useState(0)

	React.useEffect(() => {
		if (submitted && todoText) {
			/* update the user with new todos */
			const tempUser = { ...currentUser }
			tempUser.todos.splice(currentTodoSetNumber * 5, 0, { text: todoText })

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
		const todosToBeReturned = []

		for (let todoIndex in currentUser.todos) {
			const minLimit = currentTodoSetNumber * 5
			const maxLimit = currentTodoSetNumber * 5 + 5
			if (todoIndex >= minLimit && todoIndex < maxLimit) {
				const { text } = currentUser.todos[todoIndex]

				todosToBeReturned.push(
					(() => {
						return (
							<Todo
								key={Math.random()}
								index={todoIndex}
								data={{ text, currentTodoSetNumber }}
							/>
						)
					})()
				)
			}
		}

		return todosToBeReturned
	}

	function getButtons() {
		const amountOfTodoSets = Math.ceil(currentUser.todos.length / 5)

		return [...Array(amountOfTodoSets).keys()].map((btnNum, i) => (
			<button
				key={i}
				className="btn-inside-btn-set"
				onClick={() => {
					setCurrentTodoSetNumber(btnNum)
				}}
			>
				{btnNum + 1}
			</button>
		))
	}
}

// style them buttons
