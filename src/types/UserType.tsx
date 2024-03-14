export type UserType = {
  username: string;
  role: "user" | "admin";
};

export type SetUserType = {
  setUser: (user: UserType | null) => void;
};
