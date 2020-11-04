import React from "react";
import { Context } from "../components/wrapper";

export default function User() {
  const { currentUser } = React.useContext(Context);

  return (
    <div id="user">
      <Navbar />
      <TodoCard />
    </div>
  );
}
