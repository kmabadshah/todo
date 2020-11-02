import React from "react";
import { Router } from "@reach/router";
import App from "../components/app.js";
import Layout from "../components/layout";

export default function Users() {
  return (
    <Layout>
      <Router basepath="/app">
        <App path="/" />
      </Router>
    </Layout>
  );
}
