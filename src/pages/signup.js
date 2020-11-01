import React from "react";
import Layout from "../components/layout.js";
import { Link } from "gatsby";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { err_msgs, api } from "../components/constants";
import { Context } from "../components/wrapper.js";
import axios from "axios";

const { GraphQLClient: glClient, gql, request } = require("graphql-request");

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

  const { token } = React.useContext(Context);
  const [userHasSubmitted, setUserHasSubmitted] = React.useState(false);

  const onValidSubmit = async data => {
    try {
      setUserHasSubmitted(true);

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
            }
          }
        }
      `;

      const res = await client.request(query, data);
      setUserHasSubmitted(false);
    } catch (err) {
      setUserHasSubmitted(false);
      setError("uname", {
        type: "db_check",
        message: "Username exists",
      });
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
    <Layout>
      <div id="signup">
        <div className="card my-auto">
          <form
            onSubmit={handleSubmit(onValidSubmit)}
            className="card-body d-flex align-items-center justify-content-center flex-column"
          >
            <h1 id="title">Sign Up</h1>
            <input
              type="text"
              placeholder="username"
              className="field"
              id="uname"
              ref={register({
                required: err_msgs["required"],
                validate: value => evalUname(value),
              })}
              name="uname"
            />

            <ErrorMessage
              as="p"
              className="err_msg"
              errors={errors}
              name="uname"
            />

            <input
              type="password"
              placeholder="password"
              className="field"
              id="pass"
              ref={register({
                required: err_msgs["required"],
                validate: {
                  minmax: value =>
                    ((value.length < 3 || value.length > 20) &&
                      err_msgs["pass_minmax"]) ||
                    true,
                },
              })}
              name="pass"
            />

            <ErrorMessage
              as="p"
              className="err_msg"
              errors={errors}
              name="pass"
            />

            <input
              type="password"
              placeholder="confirm password"
              className="field"
              id="conf_pass"
              ref={register({
                required: "This field is required",
                validate: {
                  nomatch: value =>
                    value === getValues("pass") || err_msgs["pass_nomatch"],
                },
              })}
              name="conf_pass"
            />

            <ErrorMessage
              as="p"
              className="err_msg"
              errors={errors}
              name="conf_pass"
            />

            <div className="row no-gutters w-100 justify-content-between">
              <button
                id="btn-submit"
                type="submit"
                className="align-self-start hvr-sweep-to-top"
                disabled={userHasSubmitted || !isEmpty(errors)}
              >
                {userHasSubmitted ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <Link to="/login" id="btn-login" className="align-self-end mb-3">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

/* const { queryData } = axios
 *   .post(
 *     `${api}/todoers`,
 *     { username: data.uname, password: data.pass },
 *     {
 *       headers: {
 *         Authorization: `Bearer ${token}`,
 *       },
 *     }
 *   )
 *   .then(data => {
 *     console.log(data);
 *     setUserHasSubmitted(false);
 *     return data;
 *   })
 *   .catch(err => {
 *     console.log(err.response);
 *     setUserHasSubmitted(false);
 *   }); */
