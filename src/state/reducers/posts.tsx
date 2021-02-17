import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Post } from "../../types/types";

export interface PostsState {
  list: Post[];
  status: {
    [key: string]: {
      read: boolean;
    };
  };
}

interface TopPostsParams {
  before?: string;
  after?: string;
  limit?: number;
}

const initialState: PostsState = {
  list: [],
  status: {},
};

export const fetchPosts = createAsyncThunk<Post[], TopPostsParams | undefined>(
  "posts/fetchPosts",
  async (params = { limit: 10 }) => {
    const response = await api.get("/top/.json", { params });
    const posts = response.data.data.children;

    return posts.map((post: any) => ({
      id: post.data.id,
      author: post.data.author,
      title: post.data.title,
      comments: post.data.num_comments,
    }));
  }
);

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
  extraReducers: {
    [fetchPosts.fulfilled.toString()]: (
      state,
      action: PayloadAction<Post[]>
    ) => {
      state.list = action.payload;
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
