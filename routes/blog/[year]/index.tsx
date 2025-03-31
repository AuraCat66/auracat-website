import { Handlers, PageProps } from "$fresh/server.ts";
import {
  generateArticlePreviews,
  getFormattedYear,
} from "../../../blog/articleFns.tsx";
import { ArticleData, flatTree } from "../../../blog/index.ts";
import PageTitle from "../../../components/PageTitle.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { year } = ctx.params;

    const articles = flatTree.getYear(year);
    if (!articles) return await ctx.renderNotFound();

    return await ctx.render({ articles, year });
  },
};

export default function Year(
  props:
    & { data: { articles: ArticleData[]; year: string } }
    & Omit<PageProps, "data">,
) {
  const { articles, year } = props.data;

  return (
    <>
      <PageTitle>
        Blog articles from {getFormattedYear(new Date(year))}
      </PageTitle>

      <div class="text-left">
        {generateArticlePreviews(articles)}
      </div>
    </>
  );
}
