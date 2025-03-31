import { Handlers, PageProps } from "$fresh/server.ts";
import { ArticleData, flatTree } from "../../../../../../blog/index.ts";

import PageTitle from "../../../../../../components/PageTitle.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { year, month, day, articleID } = ctx.params;

    const article = flatTree.getArticle(year, month, day, articleID);
    if (!article) return await ctx.renderNotFound();

    return await ctx.render(article);
  },
};

export default function Article(
  props: { data: ArticleData } & Omit<PageProps, "data">,
) {
  const article = props.data;
  return (
    <>
      <PageTitle style={{ marginBottom: 0 }}>
        {article.title}
      </PageTitle>
      <p class="blog-article-date">
        {article.formattedDate}
      </p>
      <div
        class="markdown-body"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: article.content }}
      >
      </div>
    </>
  );
}
