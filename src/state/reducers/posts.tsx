import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Post, PostsStatus } from "../../types/types";
import moment from "moment";

export interface PostsState {
  list: Post[];
  activeId: string | null;
  status: PostsStatus;
  after: string | null;
  initializing: boolean;
  fetching: boolean;
}

interface TopPostsParams {
  before?: string;
  after?: string;
  limit?: number;
}

const initialState: PostsState = {
  list: [],
  activeId: null,
  status: {},
  after: null,
  initializing: true,
  fetching: true,
};

export const fetchPosts = createAsyncThunk<
  { posts: Post[]; after: string },
  TopPostsParams | undefined
>("posts/fetchPosts", async (params = { limit: 10 }) => {
  //TODO: Fix
  const response = await api.get("/top/.json", { params });
  const posts = response.data.data.children;

  return {
    posts: posts.map((post: any) => {
      const thumbnail =
        post.data.thumbnail === "default"
          ? post.data.preview?.images[0].resolutions[1].url.replaceAll(
              "amp;",
              ""
            )
          : post.data.thumbnail;
      const image = post.data.preview?.images[0].source.url.replaceAll(
        "amp;",
        ""
      );
      return {
        id: post.data.id,
        author: post.data.author,
        title: post.data.title,
        created: moment.unix(post.data.created_utc).fromNow(),
        comments: post.data.num_comments,
        thumbnail,
        image,
      };
    }),
    after: response.data.data.after,
  };
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.activeId = action.payload;
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
      if (action.payload === state.activeId) state.activeId = null;
    },
    dismissAll: (state) => {
      state.list.map((post) => {
        state.status[post.id] = {
          ...state.status[post.id],
          dismiss: true,
        };
      });
      state.activeId = null;
    },
  },
  extraReducers: {
    [fetchPosts.pending.toString()]: (state, action) => {
      state.fetching = true;
    },
    [fetchPosts.fulfilled.toString()]: (
      state,
      action: PayloadAction<{ posts: Post[]; after: string }>
    ) => {
      const { posts, after } = action.payload;

      if (state.after === null) {
        state.list = posts;
      } else {
        state.list = [...state.list, ...posts];
      }

      state.after = after;
      state.fetching = false;
      state.initializing = false;
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
  return state.posts.activeId;
};

export const selectAfter = (state: { posts: PostsState }) => {
  return state.posts.after;
};

export const selectFetching = (state: { posts: PostsState }) => {
  return state.posts.initializing;
};

export const { read, dismiss, dismissAll, setActive } = postSlice.actions;

export default postSlice.reducer;
