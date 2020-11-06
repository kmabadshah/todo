import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "../wrapper";
import isEqual from "lodash/isEqual";
import View from "./view";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const { token, currentUser, setCurrentUser } = React.useContext(Context);
  /* const [todos, setTodos] = React.useState(currentUser.todos); */

  React.useEffect(() => {
    console.log("---------------------------------");
    /* console.log("Hello"); */
    console.log(currentUser);
    if (submitted) {
      const tempTodos = [...currentUser.todos];
      tempTodos.unshift({ text: todoText });
      console.log(tempTodos);
      /* setTodos(tempTodos); */

      const tempUser = { ...currentUser };
      currentUser["todos"] = tempTodos;
      setCurrentUser(tempUser);
      setTodoText("");
      console.log(currentUser.todos);

      updateDB(tempTodos);
    }
  }, [submitted]);

  async function updateDB(tempTodos) {
    try {
      const { api } = await import("../constants");
      const { GraphQLClient: glClient, gql, request } = await import(
        "graphql-request"
      );
      const client = new glClient(`${api}/graphql`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const query = gql`
        mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
          updateTodoer(input: { where: { id: $id }, data: { todos: $todos } }) {
            todoer {
              id
            }
          }
        }
      `;

      const data = {
        id: currentUser.id,
        todos: tempTodos,
      };

      const res = await client.request(query, data);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View
      data={{
        setSubmitted,
        setTodoText,
        todoText,
        currentUser,
      }}
    />
  );
}
