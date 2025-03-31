import { generateArticlePreviews } from "../../blog/articleFns.tsx";
import { flatTree } from "../../blog/index.ts";
import PageTitle from "../../components/PageTitle.tsx";

export default function Blog() {
  const articles = flatTree.articleArray;
  return (
    <>
      <PageTitle>Blog</PageTitle>
      <h3 style={{ color: "red" }}>Working on it 🏗️ ⚠️ 🚧 👷‍♀️</h3>

      <div class="text-left">
        {generateArticlePreviews(articles)}
      </div>
    </>
  );
}
