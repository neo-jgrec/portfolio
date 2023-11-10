import React from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projects";
import Layout from "./Layout";

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Theme from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark';

function ProjectPage() {
  const { projectName } = useParams();
  const [markdown, setMarkdown] = React.useState('');
  const [project, setProject] = React.useState(null);

  React.useEffect(() => {
    if (project)
      document.title = project.name + ' - Jean-Yanis JEFFROY';
  }, [project]);

  React.useEffect(() => {
    const project = Object.values(projects).find(project => project.dataName === projectName);
    setProject(project);
  }, [projectName]);

  React.useEffect(() => {
    if (project) {
      fetch(`https://raw.githubusercontent.com/${project.owner}/${project.dataName}/${project.branch}/README.md`)
        .then(res => res.text())
        .then(text => setMarkdown(text))
    }
  }, [project]);

  if (!project)
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
              <code {...rest} className={className}>
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
              <a className='text-blue-500 hover:underline'
                {...rest} />
            );
          }
        }}
      />
    </Layout>
  );
}

export default ProjectPage;
