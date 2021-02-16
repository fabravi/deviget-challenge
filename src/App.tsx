import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import { Header } from "./components/Header";
import { SplitScreen } from "./components/SplitScreen";
import { Posts } from "./components/Posts";
import { PostsDetail } from "./components/PostDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <SplitScreen left={<Posts />} right={<PostsDetail />} />
    </div>
  );
}

export default App;
