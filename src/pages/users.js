import React from "react";
import { Router } from "@reach/router";
import X from "../components/x.js";

export default function Users() {
  return (
    <Router basepath="/users">
      <X path="1" />
    </Router>
  );
}
