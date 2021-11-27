import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import data from "./store/reducers/data";
import ReduxThunk from "redux-thunk";
import auth from "./store/reducers/auth";


const rootReducer = combineReducers({
  allData: data,
  auth: auth
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
