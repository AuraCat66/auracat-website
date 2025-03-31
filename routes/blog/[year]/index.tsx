import { PageProps } from "$fresh/server.ts";
import { flatTree } from "../../../blog/index.ts";
import Error404 from "../../_404.tsx";

export default function Year(props: PageProps) {
  const year = flatTree.years.get(props.params.year);
  if (!year) {
    return <Error404></Error404>;
  }

  return (
    <>
    </>
  );
}
