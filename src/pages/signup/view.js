import React from "react";
import Layout from "../../components/layout.js";

export default function View({
  data: {
    randErr,
    handleSubmit,
    onValidSubmit,
    register,
    err_msgs,
    evalUname,
    ErrorMessage,
    errors,
    register,
    err_msgs,
  },
}) {
  return (
    <Layout>
      <p>{randErr && "Something went wrong, please try again"}</p>

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
