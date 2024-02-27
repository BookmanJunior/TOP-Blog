type ArticleProps = {
  article: {
    cover: string;
    title: string;
    author: string;
    date: string;
  };
};

const mockArticles = [
  {
    cover:
      "https://ramenparados.com/wp-content/uploads/2020/03/blue-period-horizontal.jpg",
    title: "How Blue Period conveys art and discovering passion in life",
    author: "Tsubasa Yamaguchi",
    date: "2/27/2024",
  },
  {
    cover: "https://img.manga2you.de/2022/04/Berserk.jpg",
    title:
      "The struggle of life and how to become a better person conveyed by Berserk",
    author: "Kentarou Miura",
    date: "2/27/2024",
  },
];

export default function ArticleFeed() {
  return (
    <div className="article-feed">
      {mockArticles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </div>
  );
}

function Article({ article }: ArticleProps) {
  return (
    <article className="article">
      <img src={article.cover} alt="" className="article__cover" />
      <h2 className="article__title">{article.title}</h2>
      <div className="article__author-wrapper">
        <span className="article__author">{article.author} - </span>
        <span className="article__date">{article.date}</span>
      </div>
    </article>
  );
}
