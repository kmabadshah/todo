import React from "react";
import { Router } from "@reach/router";

export default function Users() {
  return (
    <Router basepath="/users">
      <h1 path="/">Hello</h1>
    </Router>
  );
}
