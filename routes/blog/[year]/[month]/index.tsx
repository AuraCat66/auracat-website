import { PageProps } from "$fresh/server.ts";
import { findMonth } from "../../../../blog_posts/index.ts";
import { BlogHistoryPath } from "../../../../components/BlogHistoryPath.tsx";
import Error404 from "../../../_404.tsx";

export default function Month(props: PageProps) {
  const month = findMonth(props.params.year, props.params.month);
  if (!month) {
    return <Error404></Error404>;
  }

  return (
    <>
      <h2>
        <BlogHistoryPath
          path={[props.params.year]}
        >
        </BlogHistoryPath>
        {" > "}
        {props.params.month}
      </h2>
    </>
  );
}
