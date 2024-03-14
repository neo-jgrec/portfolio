import React, { useEffect, useRef, useState } from "react";
import { languageColors } from "../utils";
import {
  ArrowTopRightOnSquareIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline';

function ProjectCard({ project, setLoaded }) {
  const maxDescriptionLength = 70;

  const [allDataMerge, setAllDataMerge] = useState(sessionStorage.getItem(project.dataName) ? JSON.parse(sessionStorage.getItem(project.dataName)) : null);

  const [apiData, setApiData] = useState(sessionStorage.getItem(project.dataName) ? JSON.parse(sessionStorage.getItem(project.dataName)) : null);
  const [contributors, setContributors] = useState(JSON.parse(sessionStorage.getItem(project.dataName) || null)?.contributors || null);
  const [languagePercentage, setLanguagePercentage] = useState(JSON.parse(sessionStorage.getItem(project.dataName) || null)?.languagePercentage || null);

  const glossyRef = useRef(null);
  const [lightPosition, setLightPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let glossy = null;

    const handleMouseMove = (e) => {
      const boundingRect = glossyRef.current.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;

      setLightPosition({ x: mouseX, y: mouseY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      glossyRef.current.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      glossyRef.current.removeEventListener('mousemove', handleMouseMove);
    };

    const interval = setInterval(() => {
      try {
        glossyRef.current.addEventListener('mouseenter', handleMouseEnter);
        glossyRef.current.addEventListener('mouseleave', handleMouseLeave);
        glossy = glossyRef.current;
        clearInterval(interval);
      } catch (e) {
        // console.log(e);
      }
    }, 100);

    return () => {
      const interval = setInterval(() => {
        try {
          glossy.removeEventListener('mouseenter', handleMouseEnter);
          glossy.removeEventListener('mouseleave', handleMouseLeave);
          glossy.removeEventListener('mousemove', handleMouseMove);
          clearInterval(interval);
        } catch (e) {
          // console.log(e);
        }
      }, 100);
    };
  }, []);

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
        ...(import.meta.env.VITE_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        })
      }
    })
      .then((response) => response.json())
      .then((data) => setApiData(data));
  }, [project.github, apiData]);

  useEffect(() => {
    if (contributors)
      return;

    fetch(project.github + '/contributors', {
      headers: {
        ...(import.meta.env.VITE_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`
        })
      }
    })
      .then((response) => response.json())
      .then((data) => setContributors(data));
  }, [project.github, contributors]);

  useEffect(() => {
    if (languagePercentage)
      return;

    fetch(project.github + '/languages', {
      headers: {
        ...(import.meta.env.VITE_GITHUB_API_TOKEN && {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`
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
  }, [project.github, languagePercentage]);

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
    <a
      ref={glossyRef}
      className="py-4 rounded-lg shadow-lg bg-stone-50 bg-opacity-[7%] aspect-w-2 aspect-h-1 border-[1px] border-gray-700 border-opacity-50
      transition-all duration-500 ease-in-out group relative"
      href={'/project/' + project.dataName}
    >

    <div className="h-full w-full absolute top-0 left-0 rounded-lg transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0"
      style={{
        backgroundSize: '100% 100%',
        backgroundImage: `radial-gradient(circle at ${lightPosition.x}px ${lightPosition.y}px, rgba(255, 255, 255, 7%) 1%, rgba(0, 0, 0, 0%) 99%)`
      }}></div>

      <div className="h-full w-full flex flex-col justify-between px-4">
        <div className="grid lg:grid-cols-3 items-center">

          <div className="col-span-1 h-32 w-32">
            <img src={'projects-data/' + project.dataName + '/image.png'} alt={project.name} className={`w-full h-full rounded-lg object-contain ${isHovered ? 'scale-105' : ''} transition duration-300 ease-in-out`} />
          </div>

          <div className="col-span-2 flex flex-col justify-between">
            <p className="text-2xl font-bold text-white items-center">
              {project.name}
              <ArrowTopRightOnSquareIcon className="w-6 h-6 inline-block ml-2 text-white" />
            </p>

            <p className="text-lg text-gray-400">{apiData.description}</p>

            <hr className="my-2 border-gray-700 border-opacity-50" />

            <div className="justify-between w-full gap-1 grid grid-cols-2 md:grid-cols-4">
              <p className="text-xl text-white items-center flex border border-gray-600 justify-center w-full py-1 rounded-lg">
                <UsersIcon className="w-5 h-5 inline-block mr-2" />
                {contributors.length || 0}
              </p>

              <p className="font-sans text-xl items-center flex border border-gray-600 justify-center w-full py-1 rounded-lg text-white">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-5 h-5 inline-block mr-2 fill-white">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                </svg>
                {apiData.open_issues_count || 0}
              </p>

              <p className="font-sans text-xl items-center flex border border-gray-600 justify-center w-full py-1 rounded-lg text-white">
                <StarIcon className="w-5 h-5 inline-block mr-2" />
                {apiData.stargazers_count || 0}
              </p>

              <p className="font-sans text-xl items-center flex border border-gray-600 justify-center w-full py-1 rounded-lg text-white">
                <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-5 h-5 inline-block mr-2 fill-white">
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                </svg>
                {apiData.forks_count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      {(languagePercentage) &&
      <div className="flex flex-row h-2 mt-2 rounded-lg">
        {Object.entries(languagePercentage).map(([language, percentage]) => (
          <div key={language} className={`h-full tooltip ${language === Object.entries(languagePercentage).sort((a, b) => b[1] - a[1])[0][0] ? 'rounded-bl-lg' : language === Object.entries(languagePercentage).sort((a, b) => a[1] - b[1])[0][0] ? 'rounded-br-lg' : 'rounded-none'}`}
            style={{ width: percentage * 100 + '%', backgroundColor: languageColors[language] }}>
            <div className="tooltiptext text-sm">
              <p className="text-white">{language}</p>
              <p className="text-gray-400">{(percentage * 100).toFixed(2)}%</p>
            </div>
          </div>
        ))}
      </div>
    }
    </a>
  );
}

export default ProjectCard;
