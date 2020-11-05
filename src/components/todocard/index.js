import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "../wrapper";
import View from "./view";

export default function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");
  const { token, currentUser } = React.useContext(Context);

  React.useEffect(() => {
    (async () => {
      if (submitted) {
        const { api } = await import("./constants");
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
        //   id: currentUser.createTodoer.id,
        // };

        setTodoText("");
      }
    })();
  }, [submitted]);

  return (
    <View
      data={{
        setSubmitted,
        setTodoText,
      }}
    />
  );
}
