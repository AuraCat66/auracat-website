import { extract } from "$std/front_matter/yaml.ts";
import { render } from "@deno/gfm";

export interface BlogArticle {
  id: string;
  title: string;
  tags: string[] | undefined;
  rawDate: Date;
  date: string;
  rawContent: string;
  content: string;
}

type ArticleID = string;
type DayID = string;
type MonthID = string;
type YearID = string;

export const flatTree = {
  articles: new Map<
    `${YearID}/${MonthID}/${DayID}/${ArticleID}`,
    BlogArticle
  >(),
  days: new Map<`${YearID}/${MonthID}/${DayID}`, BlogArticle[]>(),
  months: new Map<`${YearID}/${MonthID}`, BlogArticle[]>(),
  years: new Map<YearID, BlogArticle[]>(),

  pushArticle: function (
    yearID: YearID,
    monthID: MonthID,
    dayID: DayID,
    article: BlogArticle,
  ) {
    this.years.get(`${yearID}`)!.push(article);
    this.months.get(`${yearID}/${monthID}`)!.push(article);
    this.days.get(`${yearID}/${monthID}/${dayID}`)!.push(article);
    this.articles.set(`${yearID}/${monthID}/${dayID}/${article.id}`, article);
  },

  getArticle: function (
    yearID: YearID,
    monthID: MonthID,
    dayID: DayID,
    articleID: ArticleID,
  ): BlogArticle | undefined {
    return this.articles.get(`${yearID}/${monthID}/${dayID}/${articleID}`);
  },
};

function formatArticleDate(date: Date): string {
  const longFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return longFormat.format(date);
}

const blogArticlesPath = new URL("./articles/", import.meta.url).pathname;

loadBlogArticles();

function loadBlogArticles() {
  // First depth: root of the tree, years
  root();

  function root() {
    for (const yearEntry of Deno.readDirSync(blogArticlesPath)) {
      if (!yearEntry.isDirectory) continue;

      const yearID = yearEntry.name;
      flatTree.years.set(yearID, []);

      // Second depth: year, months
      readYear(yearID);
    }
  }

  function readYear(yearID: string) {
    for (
      const monthEntry of Deno.readDirSync(`${blogArticlesPath}/${yearID}/`)
    ) {
      if (!monthEntry.isDirectory) continue;

      const monthID = monthEntry.name;
      flatTree.months.set(`${yearID}/${monthID}`, []);

      // Third depth: month, days
      readMonth(yearID, monthID);
    }
  }

  function readMonth(yearID: string, monthID: string) {
    for (
      const dayEntry of Deno.readDirSync(
        `${blogArticlesPath}/${yearID}/${monthID}/`,
      )
    ) {
      if (!dayEntry.isDirectory) continue;

      const dayID = dayEntry.name;
      flatTree.days.set(`${yearID}/${monthID}/${dayID}`, []);

      // Fourth/final layer: day, blog articles
      readDay(yearID, monthID, dayID);
    }
  }

  function readDay(
    yearID: string,
    monthID: string,
    dayID: string,
  ) {
    const path = `${blogArticlesPath}/${yearID}/${monthID}/${dayID}/`;
    for (
      const articleEntry of Deno.readDirSync(
        path,
      )
    ) {
      if (!articleEntry.isFile) continue;

      const articleFileName = articleEntry.name;
      const split = articleFileName.split(".");

      const articleID = split[0];
      const fileExtension = split[1];

      if (fileExtension !== "md") {
        console.error(
          `Blog article "${yearID}/${monthID}/${dayID}/${articleFileName}" is not a Markdown (.md) file`,
        );
      }

      const blogFileData = Deno.readFileSync(
        `${path}/${articleFileName}`,
      );
      const rawMarkdown = new TextDecoder().decode(blogFileData);
      const { attrs, body } = extract(rawMarkdown);

      const rawDate = new Date(`${monthID}/${dayID}/${yearID}`);

      const article: BlogArticle = {
        id: articleID,
        tags: attrs.tags?.toString().split(",").map((tag) => tag.trim()),
        title: attrs.title as string,
        rawDate: rawDate,
        date: formatArticleDate(rawDate),
        rawContent: body,
        content: render(body),
      };

      flatTree.pushArticle(yearID, monthID, dayID, article);
    }
  }
}
