import { combineReducers } from "redux";
import { todoPost } from "./todoPost";
export const todoFilter = combineReducers({
  todos: todoPost,
});
