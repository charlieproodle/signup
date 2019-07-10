import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import root from "../Sagas/Watchers";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// import { connectRouter, routerMiddleware } from 'connected-react-router'
// import { createBrowserHistory } from 'history'

// export const history = createBrowserHistory()

const reducers = combineReducers({
  // router: connectRouter(history),
  auth: require("./AuthRedux").reducer,
  form: formReducer
});

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        // routerMiddleware(history),
        thunkMiddleware, 
        sagaMiddleware))
  );
  sagaMiddleware.run(root);
  return store;
}
