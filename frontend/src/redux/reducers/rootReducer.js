import { combineReducers } from "redux";
import { viewMarketReducer } from "../reducers/viewMarketReducer";
import { themeChangeReducer } from "./themeChangeReducer";
import { flexReducer, ImageToggleReducer } from "../reducers/categoryReducer";
import { adminIDCheckReducer } from "../reducers/adminIDCheck";
import { postDataReducer } from "./postDataCheck";
import authReducer from "../autheticateReducer/auth";
import likePostReducer from "../autheticateReducer/likePost";
import commentPostReducer from "../autheticateReducer/commentPost";
import {  protectedReducer } from "../reducers/protectedReducer";


const rootReducer = combineReducers({
  viewMarketReducer,
  themeChangeReducer,
  flexReducer,
  ImageToggleReducer,
  adminIDCheckReducer,
  postDataReducer,
  authReducer,
  likePostReducer,
  commentPostReducer,
  protectedReducer
});

export default rootReducer;
