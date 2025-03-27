import { PageProps } from "$fresh/server.ts";
import { findPost } from "../../../../../../blog_posts/index.ts";
import { NavigationPath } from "../../../../../../components/NavigationPath.tsx";
import PageTitle from "../../../../../../components/PageTitle.tsx";
import Error404 from "../../../../../_404.tsx";

export default function BlogPost(props: PageProps) {
  const { year, month, day, postID } = props.params;
  const post = findPost(
    year,
    month,
    day,
    postID,
  );
  if (!post) {
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
      <PageTitle>{post.title}</PageTitle>
      <div class="text-left">
        {post.content}
      </div>
    </>
  );
}
