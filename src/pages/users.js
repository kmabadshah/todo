import React from "react";
import { Router } from "@reach/router";
import X from "../components/x.js";

export default function Users() {
  return (
    <Router>
      <X path="/" />
    </Router>
  );
}
