import React from "react";
import Layout from "./Layout";
import { Projects } from "../components";
import Contributions from "../components/Contributions";

function Home() {
  return (
    <Layout>
      <Projects />
      <Contributions />
    </Layout>
  );
}

export default Home;
