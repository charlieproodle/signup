import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import root from "../Sagas/Watchers";
import { reducer as formReducer } from "redux-form";
import { resettableReducer } from "reduxsauce";

// Redux Persist
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import ImmutablePersistenceTransform from "../Services/ImmutablePersistenceTransform";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [ImmutablePersistenceTransform],
};

const resettable = resettableReducer("LOGOUT");

const rootReducer = combineReducers({
  auth: resettable(require("./AuthRedux").reducer),
  form: resettable(formReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    // rootReducer,
    persistedReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware, sagaMiddleware))
  );
  let persistor = persistStore(store);
  sagaMiddleware.run(root);
  return { store, persistor };
  // return store
}
