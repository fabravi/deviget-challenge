export type Post = {
  id: string;
  title: string;
  author: string;
  comments: number;
  thumbnail: string;
  read?: boolean;
};

export type PostsStatus = {
  [key: string]: {
    read: boolean;
    dismiss: boolean;
  };
};
