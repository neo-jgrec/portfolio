import React from "react";
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
  const [apiData, setApiData] = React.useState(null);
  const [contributors, setContributors] = React.useState(null);

  React.useEffect(() => {
    if (project)
      document.title = project.name + ' - Jean-Yanis JEFFROY';
  }, [project]);

  React.useEffect(() => {
    const project = Object.values(projects).find(project => project.dataName === projectName) || Object.values(contributions).find(project => project.name === projectName);
    setProject(project);
  }, [projectName]);

  React.useEffect(() => {
    if (project) {
      fetch(`https://raw.githubusercontent.com/${project.owner}/${project.dataName}/${project.branch}/README.md`)
        .then(res => res.text())
        .then(text => setMarkdown(text))
    }
  }, [project]);

  React.useEffect(() => {
    if (project) {
      fetch(project.github, {
        headers: {
          ...(process.env.REACT_APP_GITHUB_API_TOKEN && {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
          })
        }
      })
        .then((response) => response.json())
        .then((data) => setApiData(data));
    }
  }, [project]);

  React.useEffect(() => {
    if (project) {
      fetch(project.github + '/contributors', {
        headers: {
          ...(process.env.REACT_APP_GITHUB_API_TOKEN && {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
          })
        }
      })
        .then((response) => response.json())
        .then((data) => setContributors(data));
    }
  }, [project]);

  if (!project)
    return <NotFound />;

  if (!apiData || !contributors)
    return null;

  return (
    <Layout>
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
                <div className='w-full h-full p-5'>
                  <img className='w-full h-full rounded' {...rest} alt={props.alt} />
                </div>
            );
          }
        }}
      />

      <br /> <br />

      <div className="flex flex-row justify-between items-center px-4 lg:px-52">
        {contributors && contributors.length > 1 && contributors.map((contributor, index) => (
          <a
            key={index}
            className="flex flex-col items-center p-4"
            href={contributor.html_url}
            target="_blank" rel="noreferrer"
          >
            <img src={contributor.avatar_url} alt={contributor.login} className="w-16 h-16 mr-2 rounded-full object-cover" style={{ imageRendering: 'pixelated' }} />
            <p className="text-lg font-bold text-white items-center">
              {contributor.login}
            </p>
          </a>
        ))}
      </div>

      <br /> <br />

      <div className="flex flex-row justify-between px-4">
        <a
          className="flex flex-row items-center p-4 rounded-lg shadow-lg hover:bg-stone-50 hover:bg-opacity-5 transition duration-300 ease-in-out"
          href={apiData?.html_url}
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
    </Layout>
  );
}

export default ProjectPage;
