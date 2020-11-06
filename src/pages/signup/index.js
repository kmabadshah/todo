import React from "react";
import Layout from "../../components/layout.js";
import { Link, navigate } from "gatsby";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { err_msgs, api } from "../../components/constants";
import { Context } from "../../components/wrapper";

import View from "./view";

export default function Signup() {
  const {
    setError,
    getValues,
    register,
    handleSubmit,
    watch,
    errors,
    clearErrors,
  } = useForm();

  const { token, setCurrentUser } = React.useContext(Context);
  const [userHasSubmitted, setUserHasSubmitted] = React.useState(false);
  const [randErr, setRandErr] = React.useState(false);

  const onValidSubmit = async data => {
    try {
      setUserHasSubmitted(true);
      setRandErr(false);

      const { GraphQLClient: glClient, gql, request } = await import(
        "graphql-request"
      );

      const client = new glClient(`${api}/graphql`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const query = gql`
        mutation($uname: String!, $pass: String!) {
          createTodoer(input: { data: { uname: $uname, pass: $pass } }) {
            todoer {
              id
              todos {
                text
              }
            }
          }
        }
      `;

      /* encryption */
      const bcrypt = await import("bcryptjs");

      bcrypt.hash(data.pass, 10, (err, hash) => {
        data.pass = hash;
        client // send data
          .request(query, data)
          .then(res => {
            setRandErr(false);
            setUserHasSubmitted(false);
            setCurrentUser({
              ...res.createTodoer.todoer,
            });
            navigate("/user");
          })
          .catch(err => {
            if (err.response) {
              err.response.errors.forEach(item => {
                if (item.extensions.exception.detail.match(/exists/gi)) {
                  setError("uname", {
                    type: "db_check",
                    message: "Username exists",
                  });
                }
              });
            } else {
              setRandErr(true);
            }

            setUserHasSubmitted(false);
          });
      });
    } catch (err) {
      setRandErr(true);
      setUserHasSubmitted(false);
    }
  };

  function evalUname(value) {
    if (value.length < 3 || value.length > 10) {
      return err_msgs["uname_minmax"];
    } else if (/[^\w-]+/g.test(value)) {
      return err_msgs["uname_regex"];
    } else {
      return true;
    }
  }

  function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  return (
    <View
      data={{
        randErr,
        handleSubmit,
        onValidSubmit,
        register,
        err_msgs,
        evalUname,
        ErrorMessage,
        errors,
        Layout,
        isEmpty,
        userHasSubmitted,
        Link,
        getValues,
      }}
    />
  );
}
