import { extract } from "$std/front_matter/yaml.ts";
import { render } from "@deno/gfm";

interface BlogPost {
  id: string;
  title: string;
  tags: string[] | undefined;
  // rawDate: Date;
  // date: string;
  rawContent: string;
  content: string;
}

type PostID = string;
type DayID = string;
type MonthID = string;
type YearID = string;

export const flatTree = {
  allPosts: new Map<`${YearID}/${MonthID}/${DayID}/${PostID}`, BlogPost>(),
  days: new Map<`${YearID}/${MonthID}/${DayID}`, BlogPost[]>(),
  months: new Map<`${YearID}/${MonthID}`, BlogPost[]>(),
  years: new Map<YearID, BlogPost[]>(),

  pushPost: function (
    yearID: YearID,
    monthID: MonthID,
    dayID: DayID,
    //
    post: BlogPost,
  ) {
    this.years.get(`${yearID}`)!.push(post);
    this.months.get(`${yearID}/${monthID}`)!.push(post);
    this.days.get(`${yearID}/${monthID}/${dayID}`)!.push(post);
    this.allPosts.set(`${yearID}/${monthID}/${dayID}/${post.id}`, post);
  },
};

const blogPostsDirPath = new URL("./posts/", import.meta.url).pathname;

loadBlogPosts();

function loadBlogPosts() {
  // First depth: root of the tree, years
  root();

  function root() {
    for (const yearEntry of Deno.readDirSync(blogPostsDirPath)) {
      if (!yearEntry.isDirectory) continue;

      const yearID = yearEntry.name;
      flatTree.years.set(yearID, []);

      // Second depth: year, months
      readYear(yearID);
    }
  }

  function readYear(yearID: string) {
    for (
      const monthEntry of Deno.readDirSync(`${blogPostsDirPath}/${yearID}/`)
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
        `${blogPostsDirPath}/${yearID}/${monthID}/`,
      )
    ) {
      if (!dayEntry.isDirectory) continue;

      const dayID = dayEntry.name;
      flatTree.days.set(`${yearID}/${monthID}/${dayID}`, []);

      // Fourth/final layer: day, blog posts
      readDay(yearID, monthID, dayID);
    }
  }

  function readDay(
    yearID: string,
    monthID: string,
    dayID: string,
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

      // const rawDate = new Date(`${monthID}/${dayID}/${yearID}`);

      const post: BlogPost = {
        id: postID,
        tags: attrs.tags?.toString().split(",").map((tag) => tag.trim()),
        title: attrs.title as string,
        rawContent: body,
        content: render(body),
        // rawDate
      };

      flatTree.pushPost(yearID, monthID, dayID, post);
    }
  }
}
