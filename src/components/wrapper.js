import React from "react";
import { cred, api } from "./constants.js";
import axios from "axios";
import { useStaticQuery, graphql } from "gatsby";

export const Context = React.createContext();

export default function Wrapper({ children }) {
  const [token, setToken] = React.useState();
  const [randErr, setRandErr] = React.useState();
  const {
    allStrapiTodoer: { edges: users },
  } = useStaticQuery(graphql`
    {
      allStrapiTodoer {
        edges {
          node {
            uname
            pass
          }
        }
      }
    }
  `);

  console.log(token);

  React.useEffect(() => {
    axios
      .post(`${api}/auth/local`, cred)
      .then(data => setToken(data.data.jwt))
      .catch(err => {
        console.log(err);
        setRandErr(err);
      });
  }, []);

  if (token) {
    return <Context.Provider value={{ token }}>{children}</Context.Provider>;
  } else if (randErr) {
    return <h1>Something went wrong, please try again</h1>;
  } else {
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
}
