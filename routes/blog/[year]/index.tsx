import { PageProps } from "$fresh/server.ts";
import { findYear } from "../../../blog_posts/index.ts";
import { NavigationPath } from "../../../components/NavigationPath.tsx";
import Error404 from "../../_404.tsx";

export default function Year(props: PageProps) {
  const year = findYear(props.params.year);
  if (!year) {
    return <Error404></Error404>;
  }

  return (
    <>
      <h2>
        <NavigationPath
          url={props.url}
        >
        </NavigationPath>
      </h2>
    </>
  );
}
