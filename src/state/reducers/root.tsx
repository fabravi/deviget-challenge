import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import posts from "./posts";
import gallery from "./gallery";

const persistConfigPosts = {
  key: "posts",
  storage,
  // blacklist: ["list"],
};

const persistedPosts = persistReducer(persistConfigPosts, posts);

const persistConfigGallery = {
  key: "gallery",
  storage,
};

const persistedGallery = persistReducer(persistConfigGallery, gallery);

export default combineReducers({
  posts: persistedPosts,
  gallery: persistedGallery,
});
