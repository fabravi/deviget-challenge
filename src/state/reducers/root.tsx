import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import posts from "./posts";
import gallery from "./gallery";
import moment from "moment";

const blacklist = ["allDismissed"];
const lastUpdate = window.localStorage.getItem("lastUpdate");

if (lastUpdate) {
  // Reload posts if 60 seconds has elapsed since last fetch.
  var now = moment(new Date());
  var lastUpdateDate = moment(lastUpdate);
  var duration = moment.duration(now.diff(lastUpdateDate));
  var secondsAgo = duration.asSeconds();

  if (secondsAgo > 6) {
    blacklist.push("list");
  }
}

const persistConfigPosts = {
  key: "posts",
  storage,
  blacklist,
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
