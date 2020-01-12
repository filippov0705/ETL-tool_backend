import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
