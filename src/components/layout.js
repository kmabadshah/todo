import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { api, cred } from "./constants.js";
import axios from "axios";
import { Context } from "./wrapper";

export default function Layout({ children }) {
  const query = useStaticQuery(
    graphql`
      {
        allFile {
          edges {
            node {
              id
              extension
              publicURL
            }
          }
        }
      }
    `
  );

  const wrapperData = React.useContext(Context);
  /* console.log(wrapperData); */

  return (
    <div id="wrapper">
      <h1 id="logo">Todo APP</h1>
      {children}
    </div>
  );
}
