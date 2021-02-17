import React from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { SplitScreen } from "./components/SplitScreen";
import { Posts } from "./components/Posts";
import { PostsDetail } from "./components/PostDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/gallery">
            <div>gallery</div>
          </Route>
          <Route path="/:id">
            <SplitScreen left={<Posts />} right={<PostsDetail />} />
          </Route>
          <Route path="/">
            <SplitScreen left={<Posts />} right={<PostsDetail />} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
