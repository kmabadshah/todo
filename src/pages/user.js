import React from "react";
import { Context } from "../components/wrapper";

export default function User() {
  const { currentUser } = React.useContext(Context);
  console.log(currentUser);

  return (
    <div id="user">
      <h1>Hello World</h1>
    </div>
  );
}
