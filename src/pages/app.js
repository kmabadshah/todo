import React from "react";
import { Router } from "@reach/router";
import X from "../components/x.js";
import Layout from "../components/layout";

export default function Users() {
  return (
    <Layout>
      <Router basepath="/app">
        <h1>hello</h1>
      </Router>
    </Layout>
  );
}
