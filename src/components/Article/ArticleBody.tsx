import { ArticleProps } from "../../types/ArticleType";
import Markdown from "react-markdown";

export default function ArticleBody({ article }: { article: ArticleProps }) {
  return (
    <section className="article-body">
      <Markdown
        components={{
          h1: "h2",
        }}
      >
        {article.content}
      </Markdown>
    </section>
  );
}
