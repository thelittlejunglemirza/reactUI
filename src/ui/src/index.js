// EXTERNAL
import React from "react"
import ReactDOM from "react-dom"
// LOCAL
import App from "./App/App"
import SearchResults from "./App/Containers/SearchResults/SearchResults"
import TosData from "./App/Containers/TosData/TosData"
import ApiData from "./App/Containers/ApiData/ApiData"
import ProjectData from "./App/Containers/ProjectData/ProjectData"
import { Provider } from "mobx-react";
import { configure } from 'mobx';
import { Route, Switch, Router } from 'react-router-dom';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import AppStore from "./App/Stores/AppStore";

// === CSS
import "./index.css"


// router constants
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

// mobx global config
configure({
    enforceActions: true // only @action functions can change store observablees
});

const stores = {
  // mobx router store
  routing: routingStore,
  // ...other stores
  globalStore: AppStore,
};

const history = syncHistoryWithStore(browserHistory, routingStore);
const app = document.getElementById("root")

ReactDOM.render(
    <Provider {...stores}>
      <Router history={history}>
        <div>
          <Route path='/' component={App}></Route>
          <Switch>
            {/* #~#~#~#~# CONTAINERS #~#~#~#~# */}
            {/*   Add all containers below */}
            <Route path='/search/:value' component={SearchResults}></Route>
            <Route path='/tos/:id' component={TosData}></Route>
            <Route path='/api/:id' component={ApiData}></Route>
            <Route path='/project/:id' component={ProjectData}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  , app)
