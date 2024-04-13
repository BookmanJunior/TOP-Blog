export type CommentType = {
  user: { username: string; _id: string } | null;
  text: string;
  date: string;
  deleted: boolean;
  _id: string;
};
