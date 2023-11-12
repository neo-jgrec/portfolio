import React, { useEffect } from "react";
import { languageColors } from "../utils";
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';

function ProjectCard({ project, setLoaded }) {
  const maxDescriptionLength = 70;

  const [allDataMerge, setAllDataMerge] = React.useState(sessionStorage.getItem(project.dataName) ? JSON.parse(sessionStorage.getItem(project.dataName)) : null);

  const [apiData, setApiData] = React.useState(sessionStorage.getItem(project.dataName) ? JSON.parse(sessionStorage.getItem(project.dataName)) : null);
  const [contributors, setContributors] = React.useState(JSON.parse(sessionStorage.getItem(project.dataName) || null)?.contributors || null);
  const [languagePercentage, setLanguagePercentage] = React.useState(JSON.parse(sessionStorage.getItem(project.dataName) || null)?.languagePercentage || null);

  useEffect(() => {
    if (apiData && contributors && languagePercentage)
      setAllDataMerge({ ...apiData, contributors, languagePercentage });
  }, [apiData, contributors, languagePercentage]);

  useEffect(() => {
    sessionStorage.setItem(project.dataName, JSON.stringify(allDataMerge));
  }, [allDataMerge, project.dataName]);

  useEffect(() => {
    if (apiData)
      return;

    fetch(project.github, {
      headers: {
        ...(process.env.REACT_APP_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
        })
      }
    })
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, [project.github]);

  useEffect(() => {
    if (contributors)
      return;

    fetch(project.github + '/contributors', {
      headers: {
        ...(process.env.REACT_APP_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
        })
      }
    })
      .then((response) => response.json())
      .then((data) => setContributors(data));
  }, [project.github]);

  useEffect(() => {
    if (languagePercentage)
      return;

    fetch(project.github + '/languages', {
      headers: {
        ...(process.env.REACT_APP_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
        })
      }
    })
      .then((response) => response.json())
      .then((data) => {
        let total = 0;
        for (const language in data)
          total += data[language];
        const languagePercentage = {};
        for (const language in data)
          languagePercentage[language] = data[language] / total;
        setLanguagePercentage(languagePercentage);
      });
  }, [project.github]);

  useEffect(() => {
    if (apiData && apiData.description && apiData.description.length > maxDescriptionLength)
      setApiData({ ...apiData, description: apiData.description.substring(0, maxDescriptionLength) + '...' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiData?.description]);

  useEffect(() => {
    let timeoutId;

    if (apiData && contributors && languagePercentage)
      setLoaded(true);
    if (!apiData || !contributors || !languagePercentage)
      timeoutId = setTimeout(() => setLoaded(3), 10000);
    return () => clearTimeout(timeoutId);
  }, [apiData, contributors, languagePercentage, setLoaded]);

  if (!apiData || !contributors || !languagePercentage)
    return null;

  return (
    <a className="p-4 rounded-lg shadow-lg hover:bg-stone-50 hover:bg-opacity-5 transition duration-300 ease-in-out aspect-w-2 aspect-h-1" href={'/project/' + project.dataName}>

      <div className="h-full w-full flex flex-col justify-between">
        <div className="grid grid-cols-3 items-center">
          <div className="col-span-1 h-32 w-32">
            <img src={'projects-data/' + project.dataName + '/image.png'} alt={project.name} className="w-full h-full rounded-lg object-contain" />
          </div>

          <div className="col-span-2 flex flex-col justify-between">
            <p className="text-2xl font-bold text-white items-center">
              {project.name}
              <ArrowTopRightOnSquareIcon className="w-6 h-6 inline-block ml-2 text-white" />
            </p>
            <p className="text-lg text-gray-400">{apiData.description}</p>

            <hr className="my-2 border-gray-700 border-opacity-50" />

            <div className="flex flex-row justify-between px-4">
              <p className="font-bold text-xl text-blue-500 items-center flex">
                <UsersIcon className="w-6 h-6 inline-block mr-2" />
                {contributors.length || 0}
              </p>

              <p className="font-bold text-xl text-green-500 items-center flex">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-6 h-6 inline-block mr-2 fill-green-500">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                {apiData.open_issues_count || 0}
              </p>

              <p className="font-bold text-xl text-yellow-400 items-center flex">
                <StarIcon className="w-6 h-6 inline-block mr-2" />
                {apiData.stargazers_count || 0}
              </p>

              <p className="font-bold text-xl text-red-500 items-center flex">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-6 h-6 inline-block mr-2 fill-red-500">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                {apiData.forks_count || 0}
              </p>
            </div>
          </div>
        </div>
        {languagePercentage &&
          <>
            <p className="text-lg font-bold text-white mt-4">Most used language : {Object.entries(languagePercentage).sort((a, b) => b[1] - a[1])[0][0]}</p>
            <div className="flex flex-row h-2 mt-2 rounded-lg">
              {Object.entries(languagePercentage).map(([language, percentage]) => (
                <div key={language} className={`h-full tooltip ${language === Object.entries(languagePercentage).sort((a, b) => b[1] - a[1])[0][0] ? 'rounded-l-lg' : language === Object.entries(languagePercentage).sort((a, b) => a[1] - b[1])[0][0] ? 'rounded-r-lg' : 'rounded-none'}`}
                  style={{ width: percentage * 100 + '%', backgroundColor: languageColors[language] }}>
                  <p className="tooltiptext">{language}</p>
                </div>
              ))}
            </div>
          </>
        }
      </div>
    </a>
  );
}

export default ProjectCard;
