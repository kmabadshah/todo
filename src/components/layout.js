import React from "react";

export default function Layout({ children }) {
  return (
    <div id="wrapper">
      <h1 id="logo">Todo APP</h1>
      {children}
    </div>
  );
}
