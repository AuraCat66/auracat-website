import { extractYaml } from "@std/front-matter";
import { processRawArticle } from "./articleFns.tsx";
import { fromFileUrl, join } from "@std/path";

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
  articleArray: [] as ArticleData[],
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
    this.articleArray.push(article);
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

const blogArticlesPath = join(
  fromFileUrl(import.meta.url),
  "..",
  "articles",
);

loadBlogArticles();

function loadBlogArticles() {
  // First depth: root of the tree, years
  root();

  function root() {
    const path = blogArticlesPath;
    const yearEntries = Deno.readDirSync(path).toArray().reverse();

    for (const yearEntry of yearEntries) {
      if (!yearEntry.isDirectory) continue;

      const yearID = yearEntry.name;
      flatTree.years.set(yearID, []);

      // Second depth: year, months
      readYear(yearID);
    }
  }

  function readYear(yearID: string) {
    const path = `${blogArticlesPath}/${yearID}/`;
    const monthEntries = Deno.readDirSync(path)
      .toArray()
      .reverse();

    for (const monthEntry of monthEntries) {
      if (!monthEntry.isDirectory) continue;

      const monthID = monthEntry.name;
      flatTree.months.set(`${yearID}/${monthID}`, []);

      // Third depth: month, days
      readMonth(yearID, monthID);
    }
  }

  function readMonth(yearID: string, monthID: string) {
    const path = `${blogArticlesPath}/${yearID}/${monthID}/`;
    const dayEntries = Deno.readDirSync(
      path,
    ).toArray().reverse();

    for (const dayEntry of dayEntries) {
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
    const articleEntries = Deno.readDirSync(path).toArray().reverse();

    for (const articleEntry of articleEntries) {
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

      // const filePath = join(path, articleEntry.name);
      // const fileInfo = Deno.lstatSync(filePath);

      const blogFileData = Deno.readFileSync(
        `${path}/${articleFileName}`,
      );
      const rawMarkdown = new TextDecoder().decode(blogFileData);
      const extractedData = extractYaml(rawMarkdown);

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
