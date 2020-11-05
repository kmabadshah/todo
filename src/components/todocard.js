import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "./wrapper";

export default async function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const { token, currentUser } = React.useContext(Context);

  React.useEffect(
    () =>
      (async () => {
        if (submitted) {
          const { GraphQLClient: glClient, gql, request } = await import(
            "graphql-request"
          );

          const client = new glClient(`${api}/graphql`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const query = gql`
            mutation($id: ID!) {
              updateTodoer(
                input: { where: { id: $id }, data: { todos: $todos } }
              ) {
                todoer {
                  uname
                  id
                }
              }
            }
          `;

          console.log(currentUser);

          // const data = {
          //   id: currentUser.createTodoer.id
          // };

          setTodoText("");
        }
      })(),
    [submitted]
  );

  return (
    <div id="todocard">
      <div id="card">
        <input
          type="text"
          onChange={e => setTodoText(e.target.value)}
          onKeyDown={e =>
            e.key === "Enter" ? setSubmitted(true) : setSubmitted(false)
          }
          id="todo-text"
          value={todoText}
          placeholder="I will meditate..."
        />
        <button id="btn-submit" onClick={() => setSubmitted(true)}>
          <BsCheck />
        </button>
      </div>
    </div>
  );
}
