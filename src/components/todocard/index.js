import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "../wrapper";
import View from "./view";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const { token, currentUser, setCurrentUser } = React.useContext(Context);
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    if (submitted) {
      setTodos(todos.concat({ text: todoText }));
      setTodoText("");
    }
  }, [submitted]);

  /* React.useEffect(() => {
   *   setInterval(() => {
   *     /* if (currentUser.todos) null; */
  *   }, 1000);
* }, []); */

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
