import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/css/index.css";
import { Link, navigate } from "gatsby";
import { Context } from "../components/wrapper.js";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import fs from "fs";

export default function Main() {
  fs.readFile("src/app.css", (err, css) => {
    postcss([autoprefixer])
      .process(css, {
        from: "../styles/css/index.css",
        to: "../styles/css/index.css",
      })
      .then(result => {
        console.log("hello");
        fs.writeFile("../styles/css/index.css", result.css, () => true);
        if (result.map) {
          fs.writeFile("../styles/css/index.css.map", result.map, () => true);
        }
      });
  });

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
