import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { appReducer } from "./app";
import { headerReducer } from "./header";
import { proceduresReducer } from "./procedures";
import { tasksReducer } from "./tasks";

export default combineReducers({
  routing: routerReducer,
  app: appReducer,
  procedures: proceduresReducer,
  header: headerReducer,
  tasks: tasksReducer
});
