import React from "react";
import "./App.scss";
import { Header } from "./components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GalleryPage } from "./pages/GalleryPage";
import { PostsPage } from "./pages/PostsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path={["/gallery/:id", "/gallery/"]} component={GalleryPage} />
          <Route path={["/:id", "/"]} component={PostsPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
