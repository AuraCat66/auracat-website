import { PageProps } from "$fresh/server.ts";
import { flatTree } from "../../../../blog_posts/index.ts";
import Error404 from "../../../_404.tsx";

export default function Month(props: PageProps) {
  const month = flatTree.months.get(
    `${props.params.year}/${props.params.month}`,
  );
  if (!month) {
    return <Error404></Error404>;
  }

  return (
    <>
    </>
  );
}
