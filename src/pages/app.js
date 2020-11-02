import React from "react";
import { Router } from "@reach/router";
import App from "../components/app";
import Layout from "../components/layout";

export default function Users() {
  return (
    <Layout>
      <Router basepath="/users">
        <App path="/" />
      </Router>
    </Layout>
  );
}
