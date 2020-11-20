import React from "react"
import { BsCheck } from "react-icons/bs"
import { BiTrashAlt } from "react-icons/bi"
import { Context } from "../wrapper"
import autosize from "autosize"

export default function Todo({ data: { text }, index }) {
	const { currentUser, setCurrentUser } = React.useContext(Context)
	const [tempText, setTempText] = React.useState()
	const [isVisible, setIsVisible] = React.useState(true)
	const [editable, setEditable] = React.useState(false)
	const todoRef = React.useRef()

	React.useEffect(() => {
		todoRef.current.value = text
	}, [currentUser])

	return (
		text && (
			<div className="todo row no-gutters">
				<div className="col-8">
					<input
						className="text"
						ref={todoRef}
						type="text"
						onChange={e => setTempText(e.target.value)}
						style={{ display: editable ? "block" : "none" }}
						onBlur={() => {
							setEditable(false)
							setTempText()
							todoRef.current.value = text
						}}
						onKeyUp={e =>
							e.key === "Enter"
								? handleDone() & e.target.blur()
								: e.key === "Escape" && e.target.blur()
						}
					/>

					<p
						className="text"
						onDoubleClick={e =>
							setEditable(true) & setTimeout(() => todoRef.current.focus())
						}
						style={{ display: editable ? "none" : "block" }}
					>
						{text}
					</p>
				</div>
				<div className="col-auto ml-auto">
					<button className="icon-check" onClick={() => handleDone()}>
						<BsCheck />
					</button>
				</div>
				<div className="col-auto ml-4">
					<button className="icon-del" onClick={() => handleDelete()}>
						<BiTrashAlt />
					</button>
				</div>
			</div>
		)
	)

	function handleDone() {
		const tempUser = { ...currentUser }

		/* if (){
			 tempText
			 ? (tempUser.todos[index].text = tempText.trim())
			 : tempUser.todos.splice(index, 1)
			 } */

		if (tempText !== undefined) {
			tempText.trim()
				? (tempUser.todos[index].text = tempText.trim())
				: tempUser.todos.splice(index, 1)
		}

		setCurrentUser(tempUser)
	}

	function handleDelete() {
		const tempUser = { ...currentUser }
		tempUser.todos.splice(index, 1)
		setCurrentUser(tempUser)
	}
}
