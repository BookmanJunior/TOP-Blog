import { ArticleProps } from "../../types/ArticleType";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function ArticleBody({ article }: { article: ArticleProps }) {
  return (
    <section className="article-body">
      <Markdown
        components={{
          h1: "h2",
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                children={String(children).replace(/\n$/, "")}
                language={match[1]}
                style={dracula}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {article.content}
      </Markdown>
    </section>
  );
}
