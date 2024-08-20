import loadingReducer from "./loadingReducer";
import cartReducer from "./cartReducer";
import totalReducer from "./calculationReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  loading: loadingReducer,
  cartAdding: cartReducer,
  totalReducer: totalReducer,
});

export default rootReducer;
