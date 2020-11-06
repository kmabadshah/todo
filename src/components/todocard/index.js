import React from "react";
import { BsCheck } from "react-icons/bs";
import { Context } from "../wrapper";
import isEqual from "lodash/isEqual";
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

      updateDB();
    }
  }, [submitted]);

  async function updateDB() {
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
              todos {
                text
              }
            }
          }
        }
      `;

      const data = {
        id: currentUser.id,
        todos: todos,
      };

      /* const res =
       *   isEqual(todos, currentUser.todos) ||
       *   (await client.request(query, data)); */
      const res = await client.request(query, data);

      /* console.log(todos); */

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  /* React.useEffect(() => {
   *   let intervalId = setInterval(async () => {
   *     try {
   *       const { api } = await import("../constants");
   *       const { GraphQLClient: glClient, gql, request } = await import(
   *         "graphql-request"
   *       );
   *       const client = new glClient(`${api}/graphql`, {
   *         headers: {
   *           Authorization: `Bearer ${token}`,
   *         },
   *       });
   *       const query = gql`
   *         mutation($id: ID!, $todos: [editComponentMultipleTodoInput]!) {
   *           updateTodoer(
   *             input: { where: { id: $id }, data: { todos: $todos } }
   *           ) {
   *             todoer {
   *               todos {
   *                 text
   *               }
   *             }
   *           }
   *         }
   *       `;

   *       const data = {
   *         id: currentUser.id,
   *         todos: todos,
   *       };

   *       const res =
   *         isEqual(todos, currentUser.todos) ||
   *         (await client.request(query, data));

   *       console.log(todos);

   *       console.log(res);
   *     } catch (err) {
   *       console.log(err);
   *     }
   *   }, 1000);

   *   return () => clearInterval(intervalId);
   * }, [todos]); */

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

/* function checkDiff(local, db) {
 *   let result = {};
 *
 *   console.log(local, db);
 *   if (local.length === db.length) {
 *     for (let i = 0; i < local; i++) {
 *       if (local[i].text === db[i].text) result["equal"] = true;
 *       else {
 *         result["equal"] = false;
 *         break;
 *       }
 *     }
 *   } else if (diff(local, db).length !== 0) {
 *     result["created"] = diff(local, db);
 *   } else if (diff(db, local).length !== 0) {
 *     result["deleted"] = diff(db, local);
 *   }
 *
 *   const resultIsEmpty =
 *     Object.keys(result).length === 0 && result.constructor === Object;
 *
 *   return resultIsEmpty ? null : result;
 * }  */

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
