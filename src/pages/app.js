import React from "react";
import { Router } from "@reach/router";
import X from "../components/x.js";
import Layout from "../components/layout";

export default function Users() {
  return (
    <Router basepath="/app">
      <X path="/" />
    </Router>
  );
}
