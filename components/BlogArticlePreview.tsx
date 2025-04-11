import { ArticleData } from "../blog/index.ts";

interface ArticlePreviewProps {
  data: ArticleData;
}

export default function ArticlePreview(
  { data: articleData }: ArticlePreviewProps,
) {
  return (
    <div class="blog-article-preview">
      <p class="blog-article-date">{articleData.formattedDate}</p>
      <a
        key={articleData.id}
        href={articleData.url}
        class="preview-title"
      >
        <h1>
          {articleData.title}
        </h1>
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
