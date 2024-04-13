import { ArticleProps } from "./ArticleType";

export type UserType = {
  username: string;
  _id: string;
  role: "user" | "admin";
  bookmarks: ArticleProps[];
};

export type SetUserType = {
  setUser: (user: UserType | null) => void;
};
