import React from "react";
import { graphql, useStaticQuery } from "gatsby";

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

  return (
    <div id="wrapper">
      <h1 id="logo">Todo APP</h1>
      {children}
    </div>
  );
}
