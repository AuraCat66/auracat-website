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
  isAttrsValid(attrs);

  let preview = body.slice(0, articleContentMaxLength);
  if (body.length > articleContentMaxLength) {
    preview += "...";
  }

  return {
    id,
    title: attrs.title,
    tags: attrs.tags.map((tag) => {
      assert(typeof tag === "string");
      return tag.trim();
    }),
    date,
    formattedDate: getFormattedFullDate(date),
    dateParts: { day, month, year },
    url: `/blog/${year}/${month}/${day}/${id}`,
    content: render(body),
    preview: render(preview),
  };
}

function isAttrsValid(
  attrs: unknown,
): asserts attrs is { title: string; tags: unknown[] } {
  assert(
    typeof attrs === "object" && attrs !== null,
    "attrs should be an object",
  );
  assert(
    "title" in attrs && typeof attrs.title === "string",
    "title should be present in attrs and should be a string",
  );
  assert(
    "tags" in attrs && Array.isArray(attrs.tags),
    "tags should be present in attrs and should be an array",
  );
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
