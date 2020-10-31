import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/css/index.css";
import { Link, navigate } from "gatsby";
import { Context } from "../components/wrapper.js";

export default function Main() {
  const postcss = require("postcss");
  const postcssPresetEnv = require("postcss-preset-env");

  postcss([postcssPresetEnv()]).process(
    require.resolve("../styles/css/index.css")
  );

  const oldUser = false;
  React.useEffect(() => {
    if (oldUser) navigate("/login");
    else navigate("/signup");
  }, []);

  return (
    <div id="loader">
      <div className="lds-dual-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
