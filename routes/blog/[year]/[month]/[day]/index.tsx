import { PageProps } from "$fresh/server.ts";
import { flatTree } from "../../../../../blog/index.ts";
import Error404 from "../../../../_404.tsx";

export default function Day(props: PageProps) {
  const day = flatTree.days.get(
    `${props.params.year}/${props.params.month}/${props.params.day}`,
  );
  if (!day) {
    return <Error404></Error404>;
  }

  return (
    <>
    </>
  );
}
