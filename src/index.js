import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Reducers
import authorReducer from "./store/reducers/author";
import authorsReducer from "./store/reducers/authors";
import authReducer from "./store/reducers/authentication";
import * as actionCreators from "./store/actions";
// Components
import App from "./App";
const rootReducer = combineReducers({
  rootAuthor: authorReducer,
  rootAuthors: authorsReducer,
  rootAuth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
store.dispatch(actionCreators.checkForExpiredToken());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
