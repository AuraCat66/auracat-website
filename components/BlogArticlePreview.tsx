import { ArticleData } from "../blog/index.ts";

export default function ArticlePreview(
  { data: articleData }: { data: ArticleData },
) {
  return (
    <div class="blog-article-preview">
      <p class="blog-article-date">{articleData.formattedDate}</p>
      <a
        key={articleData.id}
        href={articleData.url}
        class="preview-title"
      >
        <h2>
          {articleData.title}
        </h2>
      </a>
      <div class="preview-content markdown-body">
        <div
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: articleData.preview }}
        >
        </div>
        <div class="link-to-article">
          ... Click{" "}
          <a
            href={articleData.url}
          >
            here
          </a>{" "}
          to read the full article.
        </div>
      </div>
    </div>
  );
}
