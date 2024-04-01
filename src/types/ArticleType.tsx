import { CommentType } from "./CommentType";

export type ArticleProps = {
  cover: string;
  title: string;
  author: {
    username: string;
  };
  comments: CommentType[];
  content: string;
  date: string;
  featured: boolean;
  _id: string;
};
