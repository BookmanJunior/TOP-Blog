import { ArticleProps } from "./ArticleType";

export type UserType = {
  username: string;
  role: "user" | "admin";
  bookmarks: ArticleProps[];
};

export type SetUserType = {
  setUser: (user: UserType | null) => void;
};
