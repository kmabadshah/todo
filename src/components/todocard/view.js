import React from "react"
import { BsCheck } from "react-icons/bs"
import Todo from "./todo"
import { Link } from "gatsby"

export default function View({
	data: {
		setSubmitted,
		setTodoText,
		todoText,
		currentUser: { todos },
	},
}) {
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

				{todos.map((todo, i) => {
					return <Todo key={i} index={i} data={todo} />
				})}

				<Link to="home">Home</Link>
			</div>
		</div>
	)
}
