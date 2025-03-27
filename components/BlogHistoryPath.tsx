import { JSX } from "preact/jsx-runtime/src/index.d.ts";

const blogRoot = "/blog";

interface BlogHistoryProps {
  path?: string[];
}
export function BlogHistoryPath(props: BlogHistoryProps) {
  let currentPath = blogRoot;

  const elements: JSX.Element[] = [];

  if (props.path) {
    props.path.map((e, i) => {
      currentPath += `/${e}`;
      elements.push(
        <>
          <a href={currentPath}>{e}</a>
          {i < (props.path!.length - 1) ? " > " : ""}
        </>,
      );
    });
  }

  elements.unshift(
    <>
      <a href={blogRoot}>Home</a>
      {" > "}
    </>,
  );

  return <>{...elements}</>;
}
