import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import posts from "./posts";

const persistConfig = {
  key: "posts",
  storage,
  // blacklist: ["list"],
};

const persistedReducer = persistReducer(persistConfig, posts);

export default combineReducers({
  posts: persistedReducer,
});
