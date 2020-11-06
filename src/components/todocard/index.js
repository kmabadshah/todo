import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "../wrapper";
import diff from "lodash/difference";
import View from "./view";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const { token, currentUser, setCurrentUser } = React.useContext(Context);
  const [todos, setTodos] = React.useState(currentUser.todos);

  React.useEffect(() => {
    if (submitted) {
      const tempTodos = [...todos];
      tempTodos.unshift({ text: todoText });
      setTodos(tempTodos);
      setTodoText("");
    }
  }, [submitted]);

  React.useEffect(() => {
    console.log(todos);
    /* console.log(currentUser.todos); */
    const diff1 = diff(todos, currentUser.todos);
    const diff2 = diff(currentUser.todos, todos);
    setInterval(() => {
      /* console.log("hello2"); */
      /* if (diff2)  */
    }, 1000);
  }, []);

  return (
    <View
      data={{
        setSubmitted,
        setTodoText,
        todoText,
        currentUser,
        todos,
      }}
    />
  );
}

/*
 *   React.useEffect(() => {
 *     (async () => {
 *       if (submitted) {
 *         try {
 *           const { api } = await import("../constants");
 *           const { GraphQLClient: glClient, gql, request } = await import(
 *             "graphql-request"
 *           );
 *           const client = new glClient(`${api}/graphql`, {
 *             headers: {
 *               Authorization: `Bearer ${token}`,
 *             },
 *           });
 *           const query = gql`
 *             mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
 *               updateTodoer(
 *                 input: { where: { id: $id }, data: { todos: $todos } }
 *               ) {
 *                 todoer {
 *                   todos {
 *                     text
 *                   }
 *                 }
 *               }
 *             }
 *           `;
 *
 *           const data = {
 *             id: currentUser.id,
 *             todos: currentUser.todos
 *               ? [...currentUser.todos].concat({ text: todoText })
 *               : [{ text: todoText }],
 *           };
 *
 *           const res = await client.request(query, data);
 *           const reUser = currentUser;
 *           reUser.todos = res.updateTodoer.todoer.todos;
 *           setCurrentUser(reUser);
 *
 *           setTodoText("");
 *         } catch (err) {
 *           console.log(err);
 *         }
 *       }
 *     })();
 *   }, [submitted]); */
