import { configureStore } from '@reduxjs/toolkit';

// Slices
import userSession from './Redux-reducer/userSessionSlice';
import tableFilesSlice from './Redux-reducer/tableFilesSlice';

export const store = configureStore({
  reducer: {
    userSession,
    tableFilesSlice,
  },
});

