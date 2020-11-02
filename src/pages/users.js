import React from "react";
import { Router } from "@reach/router";
import X from "../components/x";

export default function Users() {
  return (
    <Router basepath="/users">
      <X path="/" />
    </Router>
  );
}
