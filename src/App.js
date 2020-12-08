import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation/Navigation";
import PictureCard from "./components/PictureCard/PictureCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/today" exact component={PictureCard} />
            <Route path="/yesterday" exact component={PictureCard} />
            <Route path="/:date" exact component={PictureCard} />
            <Route path="/" exact component={Navigation} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
