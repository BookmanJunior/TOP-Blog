export type commentType = {
  user: { username: string };
  text: string;
  date: string;
  _id: string;
};

export type ArticleProps = {
  cover: string;
  title: string;
  author: {
    username: string;
  };
  comments: commentType[];
  content: string;
  date: string;
  featured: boolean;
  _id: string;
};
