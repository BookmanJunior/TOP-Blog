export type ArticleProps = {
  cover: string;
  title: string;
  author: {
    username: string;
  };
  content: string;
  date: string;
  featured: boolean;
  _id: string;
};
