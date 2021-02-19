import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { Post, PostsStatus } from "../../types/types";
import moment from "moment";
import { allPostsDismissed } from "../../utils/utils";

export interface PostsState {
  list: Post[];
  status: PostsStatus;
  after: string | null;
  initializing: boolean;
  fetching: boolean;
  allDismissed: boolean;
}

interface TopPostsParams {
  before?: string;
  after?: string;
  limit?: number;
}

const initialState: PostsState = {
  list: [],
  status: {},
  after: null,
  initializing: true,
  fetching: true,
  allDismissed: false,
};

//TODO: Fix Param type and default value
export const fetchPosts = createAsyncThunk<
  { posts: Post[]; after: string },
  TopPostsParams | undefined
>("posts/fetchPosts", async (params = { limit: 10 }) => {
  const response = await api.get("/top/.json", { params });
  const posts = response.data.data.children;

  return {
    posts: posts.map((post: any) => {
      let thumbnail;

      if (post.data.thumbnail !== "self") {
        thumbnail = post.data.thumbnail;
      }

      if (post.data.thumbnail === "default") {
        thumbnail = post.data.preview?.images[0].resolutions[1].url.replaceAll(
          "&amp;",
          "&"
        );
      }

      const image = post.data.preview?.images[0].source.url.replaceAll(
        "&amp;",
        "&"
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
      state.allDismissed = true;
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

      const newList = [...state.list, ...posts];
      state.allDismissed = allPostsDismissed(newList, state.status);

      if (state.after === null) {
        state.list = posts;
      } else {
        state.list = [...state.list, ...posts];
      }

      state.after = after;
      state.fetching = false;
      state.initializing = false;

      window.localStorage.setItem("lastUpdate", moment(new Date()).toString());
    },
  },
});

export const selectPostsList = (state: { posts: PostsState }) => {
  return state.posts.list;
};

export const selectStatusMap = (state: { posts: PostsState }) => {
  return state.posts.status;
};

export const selectAfter = (state: { posts: PostsState }) => {
  return state.posts.after;
};

export const selectFetching = (state: { posts: PostsState }) => {
  return state.posts.initializing;
};

export const selectAllDismissed = (state: { posts: PostsState }) => {
  return state.posts.allDismissed;
};

export const { read, dismiss, dismissAll } = postSlice.actions;

export default postSlice.reducer;
