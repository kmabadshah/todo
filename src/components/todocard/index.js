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
    const diff1 = diff(todos, currentUser.todos);
    const diff2 = diff(currentUser.todos, todos);
    const created = currentUser.todos[currentUser.todos.length - 1];

    let intervalId = setInterval(() => {
      const diff = checkDiff(todos, currentUser.todos);
      if (diff) {
        console.log(diff);
      }
    }, 1000);

    return () => clearInterval(intervalId);
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

function checkDiff(local, db) {
  let result = {};

  if (local.length === db.length) {
    for (let i = 0; i < local; i++) {
      if (local[i].text === db[i].text) result["equal"] = true;
      else {
        result["equal"] = false;
        break;
      }
    }
  } else if (diff(local, db).length !== 0) {
    result["created"] = diff(local, db);
  } else if (diff(db, local).length !== 0) {
    result["deleted"] = diff(db, local);
  }

  const resultIsEmpty =
    Object.keys(result).length === 0 && result.constructor === Object;

  return resultIsEmpty ? null : result;
} /*  */

/* React.useEffect(() => {
   *   (async () => {
   *     if (submitted) {
   *       try {
   *         const { api } = await import("../constants");
   *         const { GraphQLClient: glClient, gql, request } = await import(
   *           "graphql-request"
   *         );
   *         const client = new glClient(`${api}/graphql`, {
   *           headers: {
   *             Authorization: `Bearer ${token}`,
   *           },
   *         });
   *         const query = gql`
   *           mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
   *             updateTodoer(
   *               input: { where: { id: $id }, data: { todos: $todos } }
   *             ) {
   *               todoer {
   *                 todos {
   *                   text
   *                 }
   *               }
   *             }
   *           }
   *         `;
     
   *         const data = {
   *           id: currentUser.id,
   *           todos: currentUser.todos
   *             ? [...currentUser.todos].concat({ text: todoText })
   *             : [{ text: todoText }],
   *         };
     
   *        const res = await client.request(query, data);
   *        const reUser = currentUser;
   *         reUser.todos = res.updateTodoer.todoer.todos;
   *         setCurrentUser(reUser);
     
   *         setTodoText("");
   *       } catch (err) {
   *         console.log(err);
   *       }
   *     }
   *   })();
   *   /* }, [submitted]); */
