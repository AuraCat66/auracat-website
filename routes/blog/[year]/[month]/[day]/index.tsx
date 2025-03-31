import { Handlers, PageProps } from "$fresh/server.ts";
import { ArticleData, flatTree } from "../../../../../blog/index.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const { year, month, day } = ctx.params;

    const articles = flatTree.getDay(year, month, day);
    if (!articles) return await ctx.renderNotFound();

    return await ctx.render({ articles, year, month, day });
  },
};

export default function Day(
  props:
    & {
      data: {
        articles: ArticleData[];
        year: string;
        month: string;
        day: string;
      };
    }
    & Omit<PageProps, "data">,
) {
  const { articles, year, month, day } = props.data;

  return (
    <>
    </>
  );
}
