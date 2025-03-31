import { Handlers, PageProps } from "$fresh/server.ts";
import { ArticleData, flatTree } from "../../../blog/index.ts";

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
    </>
  );
}
