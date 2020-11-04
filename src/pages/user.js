import React from "react";
import { Context } from "../components/wrapper";
import Navbar from "../components/navbar";
import TodoCard from "../components/todocard";

export default function User() {
  const { currentUser } = React.useContext(Context);

  return (
    <div id="user" className="d-lex flex-column" style={{ height: "100vh" }}>
      <Navbar />
      <TodoCard />
    </div>
  );
}
