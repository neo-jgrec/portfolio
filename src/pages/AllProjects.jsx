import React from "react";
import Layout from "./Layout";
import projects from "../data/projects";
import { ProjectCard } from "../components";
import { BellAlertIcon } from "@heroicons/react/24/outline";

function AllProjects() {
  const projectsArray = Object.values(projects);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    document.title = "All Projects - Jean-Yanis JEFFROY";
  }, []);

  return (
    <Layout>
      <div className="items-center justify-between w-full max-w-6xl px-4 mx-auto md:px-8">
        <h1 className="text-4xl font-bold text-white my-5">All Projects</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projectsArray.map((project) => {
                return <ProjectCard project={project} key={project.name} setLoaded={setLoaded} />;
            })}
        </div>
        {loaded === false &&
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        }
        {loaded === 3 &&
          <div className="flex items-center justify-center w-full h-full">
            <div className="rounded-lg p-4 bg-red-500 items-center grid grid-row-2">
              <div className="flex flex-row items-center">
                <BellAlertIcon className="w-6 h-6 inline-block mr-2 text-white" />
                <p className="text-lg text-white">Failed to load projects, please try again later.</p>
              </div>
              <div className="flex flex-col justify-end pt-2 max-w-[500px]">
                <p className="text-white">It may be because of the GitHub API rate limit (60 requests per hour), please try again later.</p>
                <p className="text-white">If the problem persists, please contact me.</p>
              </div>
            </div>
          </div>
        }
      </div>
    </Layout>
  );
}

export default AllProjects;
