import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import root from "../Sagas/Watchers";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { resettableReducer } from 'reduxsauce'

const resettable = resettableReducer('LOGOUT')

const reducers = combineReducers({
  auth: resettable(require("./AuthRedux").reducer),
  form: resettable(formReducer)
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
