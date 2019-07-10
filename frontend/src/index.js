import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import configureStore from "./Redux/Store";
import { Provider } from "react-redux";

// import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
