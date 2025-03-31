import { PageProps } from "$fresh/server.ts";
import { flatTree } from "../../../../../../blog_posts/index.ts";
import PageTitle from "../../../../../../components/PageTitle.tsx";
import Error404 from "../../../../../_404.tsx";

export default function BlogPost(props: PageProps) {
  const { year, month, day, postID } = props.params;
  const post = flatTree.allPosts.get(`${year}/${month}/${day}/${postID}`);
  if (!post) {
    return <Error404></Error404>;
  }

  return (
    <>
      <PageTitle style={{ lineHeight: "0.4em" }}>
        {post.title}
        <p style={{ color: "grey", fontSize: "0.7em" }}>{post.date}</p>
      </PageTitle>
      <div
        class="markdown-body"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: post.content }}
      >
      </div>
    </>
  );
}
