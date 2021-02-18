export type Post = {
  id: string;
  title: string;
  author: string;
  created: string;
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

export type Picture = {
  id: string;
  url: string;
};
