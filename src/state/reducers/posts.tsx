import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../types/types";

export interface PostsState {
  list: Post[];
  status: {
    [key: string]: {
      read: boolean;
    };
  };
}

const initialState: PostsState = {
  list: [
    {
      id: "1",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veniam sit minus voluptatem illo distinctio nam voluptas corporis laboriosam dolores quisquam beatae provident inventore atque facere dignissimos, laudantium molestias ipsam?",
      author: "Author 1",
      comments: 120,
    },
    {
      id: "2",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veniam sit minus voluptatem illo distinctio nam voluptas corporis laboriosam dolores quisquam beatae provident inventore atque facere dignissimos, laudantium molestias ipsam?",
      author: "Author 2",
      comments: 120,
    },
    {
      id: "3",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veniam sit minus voluptatem illo distinctio nam voluptas corporis laboriosam dolores quisquam beatae provident inventore atque facere dignissimos, laudantium molestias ipsam?",
      author: "Author 3",
      comments: 120,
    },
    {
      id: "4",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veniam sit minus voluptatem illo distinctio nam voluptas corporis laboriosam dolores quisquam beatae provident inventore atque facere dignissimos, laudantium molestias ipsam?",
      author: "Author 3",
      comments: 120,
    },
    {
      id: "5",
      title:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum veniam sit minus voluptatem illo distinctio nam voluptas corporis laboriosam dolores quisquam beatae provident inventore atque facere dignissimos, laudantium molestias ipsam?",
      author: "Author 3",
      comments: 120,
    },
  ],
  status: {},
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    read: (state, action: PayloadAction<string>) => {
      state.status[action.payload] = {
        ...state.status[action.payload],
        read: true,
      };
    },
  },
});

export const selectPostsList = (state: { posts: PostsState }) => {
  return state.posts.list;
};

export const selectStatusMap = (state: { posts: PostsState }) => {
  return state.posts.status;
};

export const { read } = postSlice.actions;

export default postSlice.reducer;
