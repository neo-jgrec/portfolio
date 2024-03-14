import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projects";
import Layout from "./Layout";

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Theme from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

import logoGh from '../svg/github-mark-white.svg';
import contributions from "../data/contributions";
import NotFound from "./NotFound";

function ProjectPage() {
  const { projectName } = useParams();

  const [markdown, setMarkdown] = React.useState('');
  const [project, setProject] = React.useState(null);

  const [allDataMerge, setAllDataMerge] = React.useState(JSON.parse(sessionStorage.getItem(project?.dataName) || null));

  const [apiData, setApiData] = React.useState(sessionStorage.getItem(projectName) ? JSON.parse(sessionStorage.getItem(projectName)) : null);
  const [contributors, setContributors] = React.useState(JSON.parse(sessionStorage.getItem(projectName) || null)?.contributors || null);

  useEffect(() => {
    if (apiData && contributors)
      setAllDataMerge({ ...apiData, contributors });
  }, [apiData, contributors]);

  useEffect(() => {
    if (!project || !project.dataName)
      return;

    sessionStorage.setItem(project.dataName, JSON.stringify(allDataMerge));
  }, [allDataMerge, project]);

  useEffect(() => {
    if (project)
      document.title = project.name + ' - Jean-Yanis JEFFROY';
  }, [project]);

  useEffect(() => {
    const project = Object.values(projects).find(project => project.dataName === projectName) || Object.values(contributions).find(project => project.name === projectName);
    setProject(project);
  }, [projectName]);

  useEffect(() => {
    if (project) {
      fetch(`https://raw.githubusercontent.com/${project.owner}/${project.dataName}/${project.branch}/README.md`)
        .then(res => res.text())
        .then(text => setMarkdown(text))
    }
  }, [project]);

  useEffect(() => {
    if (apiData)
      return;

    if (project) {
      fetch(project.github, {
        headers: {
          ...(import.meta.env.VITE_GITHUB_API_TOKEN && {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`
          })
        }
      })
        .then((response) => response.json())
        .then((data) => setApiData(data));
    }
  }, [project, apiData]);

  useEffect(() => {
    if (contributors)
      return;

    if (project) {
      fetch(project.github + '/contributors', {
        headers: {
          ...(import.meta.env.VITE_GITHUB_API_TOKEN && {
            Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`
          })
        }
      })
        .then((response) => response.json())
        .then((data) => setContributors(data));
    }
  }, [project, contributors]);

  if (!project)
    return <NotFound />;

  return (
    <Layout>
      <div className="items-center justify-between w-full max-w-6xl px-4 mx-auto md:px-8">
        <Markdown
          className="markdown"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          children={markdown}
          components={{
            code(props) {
              const {children, className, node, ...rest} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  PreTag="div"
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  style={Theme}
                />
              ) : (
                <code {...rest} className={`${className} text-white bg-gray-800 rounded p-1`} inline={children.toString()}>
                  {children}
                </code>
              )
            },
            table(props) {
              const {...rest} = props;
              return (
                <table className='table-auto border-collapse' {...rest} />
              );
            },
            th(props) {
              const {...rest} = props;
              return (
                <th className='px-3 py-2 text-left border-b border-gray-600'
                  {...rest} />
              );
            },
            td(props) {
              const {...rest} = props;
              return (
                <td className='px-3 py-2 border-b border-gray-600'
                  {...rest} />
              );
            },
            tr(props) {
              const {...rest} = props;
              return (
                <tr className='px-3 py-2 border-b border-gray-600'
                  {...rest} />
              );
            },
            a(props) {
              const {...rest} = props;
              return (
                // eslint-disable-next-line jsx-a11y/anchor-has-content
                <a className='text-blue-500 hover:underline'
                  {...rest} />
              );
            },
            img(props) {
              const {...rest} = props;
              if (props.alt === 'RepoCard')
                return (
                  <img className='w-72' {...rest} alt={props.alt} />
                );
              else if (props.alt === 'badge')
                return (
                  <img className='w-32' {...rest} alt={props.alt} />
                );
              else
                return (
                  <img className='w-full h-full rounded-2xl' {...rest} alt={props.alt} style={{ padding: '0.5rem' }} />
              );
            }
          }}
        />

        <br /> <br />

        <div className="justify-between items-center px-4 lg:px-52 gap-1 grid grid-cols-2 md:grid-cols-4">
          {contributors && contributors.length > 1 && contributors.map((contributor, index) => (
            <a
              key={index}
              className="flex flex-col items-center p-4"
              href={contributor.html_url}
              target="_blank" rel="noreferrer"
            >
              <img src={contributor.avatar_url} alt={contributor.login} className="w-16 h-16 mr-2 rounded-full object-cover" style={{ imageRendering: 'pixelated' }} />
              <p className="sm:text-lg text-sm font-bold text-white items-center">
                {contributor.login}
              </p>
            </a>
          ))}
        </div>

        <br /> <br />

        <div className="flex flex-col items-center justify-center gap-y-12">
          <a
            className="flex flex-row items-center p-4 rounded-lg shadow-lg hover:bg-stone-50 hover:bg-opacity-5 transition duration-300 ease-in-out"
            href={`https://github.com/${project.owner}/${project.dataName}`}
            target="_blank" rel="noreferrer"
          >
            <img src={logoGh} alt="GitHub Logo" className="w-6 h-6 mr-2" />
            <p className="text-xl font-bold text-white items-center">
              {project.name} repository
            </p>
          </a>
          <p className="font-bold text-xl text-white items-center flex">
            Creation of the repository : {new Date(apiData?.created_at).toLocaleDateString('en-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ProjectPage;
