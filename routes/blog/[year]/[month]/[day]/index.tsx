import { PageProps } from "$fresh/server.ts";
import { findDay } from "../../../../../blog_posts/index.ts";
import { NavigationPath } from "../../../../../components/NavigationPath.tsx";
import Error404 from "../../../../_404.tsx";

export default function Day(props: PageProps) {
  const day = findDay(props.params.year, props.params.month, props.params.day);
  if (!day) {
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
