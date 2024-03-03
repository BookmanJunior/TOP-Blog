export type UserType = {
  user: {
    username: string;
  };
};

export type SetUserType = {
  setUser: (user: UserType | null) => void;
};
