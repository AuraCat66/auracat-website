import { Handlers, PageProps } from "$fresh/server.ts";
import {
  generateArticlePreviews,
  getFormattedYearAndMonth,
} from "../../../../blog/articleFns.tsx";
import { ArticleData, flatTree } from "../../../../blog/index.ts";
import PageTitle from "../../../../components/PageTitle.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { year, month } = ctx.params;

    const articles = flatTree.getMonth(year, month);
    if (!articles) return await ctx.renderNotFound();

    return await ctx.render({ articles, year, month });
  },
};

export default function Month(
  props:
    & { data: { articles: ArticleData[]; year: string; month: string } }
    & Omit<PageProps, "data">,
) {
  const { articles, year, month } = props.data;

  return (
    <>
      <PageTitle>
        Blog articles from{" "}
        {getFormattedYearAndMonth(new Date(`${year}/${month}`))}
      </PageTitle>

      <div class="text-left">
        {generateArticlePreviews(articles)}
      </div>
    </>
  );
}
