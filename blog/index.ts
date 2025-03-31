import { extract } from "$std/front_matter/yaml.ts";
import { processRawArticle } from "./articleFns.tsx";

export interface ArticleData {
  id: string;
  title: string;
  tags: string[] | undefined;
  date: Date;
  formattedDate: string;
  dateParts: { day: DayID; month: MonthID; year: YearID };
  url: `/blog/${YearID}/${MonthID}/${DayID}/${ArticleID}`;
  content: string;
  preview: string;
}

export type ArticleID = string;
export type DayID = string;
export type MonthID = string;
export type YearID = string;

export const flatTree = {
  articles: new Map<
    `${YearID}/${MonthID}/${DayID}/${ArticleID}`,
    ArticleData
  >(),
  days: new Map<`${YearID}/${MonthID}/${DayID}`, ArticleData[]>(),
  months: new Map<`${YearID}/${MonthID}`, ArticleData[]>(),
  years: new Map<YearID, ArticleData[]>(),

  pushArticle: function (
    yearID: YearID,
    monthID: MonthID,
    dayID: DayID,
    article: ArticleData,
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
  ): ArticleData | undefined {
    return this.articles.get(`${yearID}/${monthID}/${dayID}/${articleID}`);
  },

  getDay: function (
    yearID: YearID,
    monthID: MonthID,
    dayID: DayID,
  ): ArticleData[] | undefined {
    return this.days.get(`${yearID}/${monthID}/${dayID}`);
  },

  getMonth: function (
    yearID: YearID,
    monthID: MonthID,
  ): ArticleData[] | undefined {
    return this.months.get(`${yearID}/${monthID}`);
  },

  getYear: function (yearID: YearID): ArticleData[] | undefined {
    return this.years.get(yearID);
  },
};

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
      const extractedData = extract(rawMarkdown);

      const date = new Date(`${monthID}/${dayID}/${yearID}`);

      const article = processRawArticle({
        id: articleID,
        extractedData,
        date,
        day: dayID,
        month: monthID,
        year: yearID,
      });

      flatTree.pushArticle(yearID, monthID, dayID, article);
    }
  }
}
