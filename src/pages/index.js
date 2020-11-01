import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/css/index.css";
import { Link, navigate } from "gatsby";
import { Context } from "../components/wrapper.js";
import postcss from "postcss";
import autoprefixer from "autoprefixer";

postcss([autoprefixer]).process("../styles/css/index.css");

export default function Main() {
  const oldUser = false;
  React.useEffect(() => {
    console.log(postcss);
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
