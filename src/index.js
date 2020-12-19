// redux set up
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { StoreReducer } from "./Reducers/Reducers";
// thunk and logger console logs every dispatch from redux
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
// holds initial state,reducers and actions
const store = createStore(StoreReducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);
