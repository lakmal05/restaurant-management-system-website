import { combineReducers } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = combineReducers({
  reducer: rootReducer,
});

export default store;
