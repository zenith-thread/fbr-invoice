import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { rootReducer } from "./root-reducer";

const logger = createLogger({
  collapsed: true,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({
      serializableCheck: false,
    }).concat(logger),
});
