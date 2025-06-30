import { combineReducers } from "@reduxjs/toolkit";

// reducers
import { invoiceReducer } from "./invoice/invoice.reducer";

export const rootReducer = combineReducers({
  invoice: invoiceReducer,
});
