export type CommentType = {
  user: { username: string } | null;
  text: string;
  date: string;
  deleted: boolean;
  _id: string;
};
