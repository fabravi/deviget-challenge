import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Post } from "../../types/types";

export interface PostsState {
  list: Post[];
  active: string | null;
  status: {
    [key: string]: {
      read: boolean;
      dismiss: boolean;
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
  active: null,
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
      thumbnail:
        post.data.thumbnail === "self" ? undefined : post.data.thumbnail,
    }));
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    read: (state, action: PayloadAction<string>) => {
      state.status[action.payload] = {
        ...state.status[action.payload],
        read: true,
      };
    },
    dismiss: (state, action: PayloadAction<string>) => {
      state.status[action.payload] = {
        ...state.status[action.payload],
        dismiss: true,
      };
    },
    dismissAll: (state) => {
      state.list.map((post) => {
        state.status[post.id] = {
          ...state.status[post.id],
          dismiss: true,
        };
      });
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

export const selectActivePost = (state: { posts: PostsState }) => {
  return state.posts.active;
};

export const { read, dismiss, dismissAll, setActive } = postSlice.actions;

export default postSlice.reducer;
