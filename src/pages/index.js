import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/css/index.css";

import Layout from "../components/layout.js";

export default function Login() {
  return (
    <Layout>
      <div className="card my-auto" id="login">
        <div className="card-body d-flex align-items-center justify-content-center flex-column">
          <h1 id="title">Log In</h1>
          <input
            type="text"
            placeholder="username"
            className="field"
            id="uname"
          />
          <input
            type="text"
            placeholder="password"
            className="field"
            id="pass"
          />

          <div className="d-flex w-100 align-items-center">
            <input name="" type="checkbox" value="" />
            <p id="rem-me">Remember me</p>
            <button
              className="ml-auto"
              onClick={() => console.log("hello")}
              id="btn-sign-up"
            >
              Sign up
            </button>
          </div>

          <button id="btn-submit" className="hvr-shutter-out-vertical">
            Submit
          </button>
        </div>
      </div>
    </Layout>
  );
}
