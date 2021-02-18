export type Post = {
  id: string;
  title: string;
  author: string;
  comments: number;
  thumbnail: string;
  read?: boolean;
  image?: string;
};

export type PostsStatus = {
  [key: string]: {
    read: boolean;
    dismiss: boolean;
  };
};
