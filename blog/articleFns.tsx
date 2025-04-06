import { Extract } from "@std/front-matter/any";
import { assert } from "@std/assert";
import { render } from "@deno/gfm";
import { ArticleData, ArticleID, DayID, MonthID, YearID } from "./index.ts";
import ArticlePreview from "../components/BlogArticlePreview.tsx";

const articleContentMaxLength = 1000;

export function processRawArticle(rawData: {
  id: ArticleID;
  extractedData: Extract<unknown>;
  date: Date;
  day: DayID;
  month: MonthID;
  year: YearID;
}): ArticleData {
  const { id, extractedData, date, day, month, year } = rawData;
  const { attrs, body } = extractedData;
  assert(typeof attrs === "object", "attrs should be an object");

  let preview = body.slice(0, articleContentMaxLength);
  if (body.length > articleContentMaxLength) {
    preview += "...";
  }

  return {
    id,
    title: attrs.title as string,
    tags: attrs.tags?.toString().split(",").map((tag) => tag.trim()),
    date,
    formattedDate: getFormattedFullDate(date),
    dateParts: { day, month, year },
    url: `/blog/${year}/${month}/${day}/${id}`,
    content: render(body),
    preview: render(preview),
  };
}

function getFormattedFullDate(date: Date): string {
  const longFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return longFormat.format(date);
}

export function getFormattedYear(date: Date): string {
  const yearFormat = new Intl.DateTimeFormat("en-US", { year: "numeric" });
  return yearFormat.format(date);
}

export function generateArticlePreviews(articles: ArticleData[]) {
  return articles.map((articleData) => (
    <ArticlePreview
      key={articleData.id}
      data={articleData}
    />
  ));
}
