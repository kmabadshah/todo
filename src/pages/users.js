import React from "react";
import { Router } from "@reach/router";
import App from "../components/app";

export default function Users() {
  return (
    <Router basepath="/users">
      <App path="/" />
    </Router>
  );
}
