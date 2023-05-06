import { configureStore } from "@reduxjs/toolkit";

// Slices
import userSession from "./Redux-reducer/userSessionSlice";
import tableFilesSlice from "./Redux-reducer/tableFilesSlice";
import dataGlobalSlice from "./Redux-reducer/dataGlobalSlice";

export const store = configureStore({
  reducer: {
    userSession,
    tableFilesSlice,
    dataGlobalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
