import React from "react";
import { BsCheck } from "react-icons/bs";

export default async function TodoCard() {
  const [submitted, setSubmitted] = React.useState(false);
  const [todoText, setTodoText] = React.useState("");

  // async function getData() {
  //   const imp = await import("wrapper");
  //   console.log(React.useContext(imp).token);
  // }

  React.useEffect(() => {
    const { token } = React.useContext(import("wrapper").then(data => data));
    console.log(token);
  }, []);
  // React.useEffect(() => (async () => {
  //   if (submitted) {
  //     const { GraphQLClient: glClient, gql, request } = await import(
  //       "graphql-request"
  //     );

  //     const client = new glClient(`${api}/graphql`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     const query = gql`
  //       mutation($uname: String!, $pass: String!) {
  //         createTodoer(input: { data: { uname: $uname, pass: $pass } }) {
  //           todoer {
  //             uname
  //             id
  //           }
  //         }
  //       }
  //     `;

  //     setTodoText("");
  //   }
  // })(), [submitted]);

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
