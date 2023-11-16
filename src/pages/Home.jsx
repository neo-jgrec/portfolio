import React from "react";
import Layout from "./Layout";
import { Presentation, Projects } from "../components";
import Contributions from "../components/Contributions";

function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center gap-y-12">
        <Presentation />
        <Projects />
        <Contributions />
      </div>
    </Layout>
  );
}

export default Home;
