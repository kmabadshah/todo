import React from "react";
import { Router } from "@reach/router";
import X from "../components/x.js";

export default function App() {
  return (
    <Router basepath="/users">
      <X path="/" />
    </Router>
  );
}
