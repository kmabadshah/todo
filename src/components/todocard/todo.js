import React from "react"
import { BsCheck } from "react-icons/bs"
import { BiTrashAlt } from "react-icons/bi"
import { Context } from "../wrapper"
import autosize from "autosize"

export default function Todo({ data: { text, currentTodoSetNumber }, index }) {
	const { currentUser, setCurrentUser } = React.useContext(Context)
	const [tempText, setTempText] = React.useState(text)
	const [isVisible, setIsVisible] = React.useState(true)
	const [editable, setEditable] = React.useState(false)
	const todoRef = React.useRef()

	React.useEffect(() => {
		todoRef.current.value = text
	}, [currentUser])

	React.useEffect(() => {
		console.log(currentTodoSetNumber)
	}, [currentTodoSetNumber])

	const [tappedOnce, setTappedOnce] = React.useState(false)

	// prettier-ignore
	const onTap = () => {
		if (tappedOnce) {
			setEditable(true)
			setTimeout(() => todoRef.current.focus())
		} else {
			setTappedOnce(true)
			setTimeout(() => setTappedOnce(false), 600)
		}
	}

	return (
		text && (
			<div className="todo">
				<div className="col-text">
					<input
						className="text"
						ref={todoRef}
						type="text"
						onChange={e => setTempText(e.target.value)}
						style={{ display: editable ? "block" : "none" }}
						onBlur={() => {
							setEditable(false)
							handleDone()
						}}
						onKeyUp={e => e.key === "Enter" && e.target.blur()}
					/>

					<p
						className="text"
						onClick={() => onTap()}
						style={{
							display: editable ? "none" : "block",
							userSelect: "none",
						}}
					>
						{text}
					</p>
				</div>
				<div className="col-icons">
					<button className="icon-check" onClick={() => handleDone()}>
						<BsCheck />
					</button>

					<button className="icon-del" onClick={() => handleDelete()}>
						<BiTrashAlt />
					</button>
				</div>
			</div>
		)
	)

	function handleDone() {
		const tempUser = { ...currentUser }

		if (tempText !== undefined) {
			tempText.trim()
				? (tempUser.todos[index].text = tempText.trim())
				: tempUser.todos.splice(index, 1)
		}

		setCurrentUser(tempUser)
		setTempText()
	}

	function handleDelete() {
		const tempUser = { ...currentUser }
		tempUser.todos.splice(index, 1)
		setCurrentUser(tempUser)
	}
}
