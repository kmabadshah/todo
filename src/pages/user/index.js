import React from "react"
import { Context } from "../../components/wrapper"
import TodoCard from "../../components/todocard"
import LoggedIn from "../../components/layout/loggedIn.js"

export default function User() {
	return (
		<LoggedIn>
			<TodoCard />
		</LoggedIn>
	)
}
