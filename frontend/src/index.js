import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./Redux/Store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import LoadingScreen from "./Containers/LoadingScreen";

// const history = createBrowserHistory();
const { store, persistor } = configureStore();
// const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
