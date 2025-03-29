import { extract } from "$std/front_matter/yaml.ts";
import { render } from "@deno/gfm";

interface BlogPost {
  id: string;
  title: string;
  tags: string[] | undefined;
  rawContent: string;
  content: string;
}

type PostID = string;
type DayID = string;
type MonthID = string;
type YearID = string;

type Day = Map<PostID, BlogPost>;
type Month = Map<DayID, Day>;
type Year = Map<MonthID, Month>;
type Tree = Map<YearID, Year>;

export const blogPostTree: Tree = new Map();

const blogPostsDirPath = new URL("./posts/", import.meta.url).pathname;

loadBlogPosts();

export function postsFromYear(year: Year): BlogPost[] {
  const posts: BlogPost[] = [];
  for (const month of year.values()) {
    for (const day of month.values()) {
      for (const post of day.values()) {
        posts.push(post);
      }
    }
  }
  return posts;
}

export function findYear(yearID: YearID): Year | undefined {
  return blogPostTree.get(yearID);
}

export function findMonth(yearID: YearID, monthID: MonthID): Month | undefined {
  const year = findYear(yearID);
  if (!year) return;
  return year.get(monthID);
}

export function findDay(
  yearID: YearID,
  monthID: MonthID,
  dayID: DayID,
): Day | undefined {
  const month = findMonth(yearID, monthID);
  if (!month) return;
  return month.get(dayID);
}

export function findPost(
  yearID: YearID,
  monthID: MonthID,
  dayID: DayID,
  postID: PostID,
): BlogPost | undefined {
  const day = findDay(yearID, monthID, dayID);
  if (!day) return;
  return day.get(postID);
}

function loadBlogPosts() {
  // First depth: root of the tree, years
  root();

  function root() {
    for (const yearEntry of Deno.readDirSync(blogPostsDirPath)) {
      if (!yearEntry.isDirectory) continue;

      const yearID = yearEntry.name;
      blogPostTree.set(yearID, new Map());
      const year = blogPostTree.get(yearID)!;

      // Second depth: year, months
      readYear(yearID, year);
    }
  }

  function readYear(yearID: string, year: Year) {
    for (
      const monthEntry of Deno.readDirSync(`${blogPostsDirPath}/${yearID}/`)
    ) {
      if (!monthEntry.isDirectory) continue;

      const monthID = monthEntry.name;
      year.set(monthID, new Map());
      const month = year.get(monthID)!;

      // Third depth: month, days
      readMonth(yearID, monthID, month);
    }
  }

  function readMonth(yearID: string, monthID: string, month: Month) {
    for (
      const dayEntry of Deno.readDirSync(
        `${blogPostsDirPath}/${yearID}/${monthID}/`,
      )
    ) {
      if (!dayEntry.isDirectory) continue;

      const dayID = dayEntry.name;
      month.set(dayID, new Map());
      const day = month.get(dayID)!;

      // Fourth/final layer: day, blog posts
      readDay(yearID, monthID, dayID, day);
    }
  }

  function readDay(
    yearID: string,
    monthID: string,
    dayID: string,
    day: Day,
  ) {
    const path = `${blogPostsDirPath}/${yearID}/${monthID}/${dayID}/`;
    for (
      const postEntry of Deno.readDirSync(
        path,
      )
    ) {
      if (!postEntry.isFile) continue;

      const postFileName = postEntry.name;
      const split = postFileName.split(".");

      const postID = split[0];
      const fileExtension = split[1];

      if (fileExtension !== "md") {
        console.error(
          `Blog post "${yearID}/${monthID}/${dayID}/${postFileName}" is not a Markdown (.md) file`,
        );
      }

      const blogFileData = Deno.readFileSync(
        `${path}/${postFileName}`,
      );
      const rawMarkdown = new TextDecoder().decode(blogFileData);
      const { attrs, body } = extract(rawMarkdown);

      const lines = body.split("\n");
      const title = lines[0].replaceAll("#", "").trim();
      const content = lines.slice(1).join("\n").trim();
      const post: BlogPost = {
        id: postID,
        tags: attrs.tags?.toString().split(",").map((tag) => tag.trim()),
        title: title,
        rawContent: rawMarkdown,
        content: render(content),
      };

      day.set(postID, post);
    }
  }
}
