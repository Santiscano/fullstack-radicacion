import { configureStore } from "@reduxjs/toolkit";

// Slices
import userSession from "./Redux-reducer/userSessionSlice";  //usuario en sesion
import dataGlobalSlice from "./Redux-reducer/dataGlobalSlice"; // titulo navbar
import modalUserViewSlice from "./Redux-reducer/modalUserViewSlice"; //usuario a mostrar en modal
import changeStateFileSlice from "./Redux-reducer/changeStateFileSlice"; // opciones cambio de estados
import employeesSlice from "./Redux-reducer/employeesSlice"; //empleado que se crea en seccion GH
export const store = configureStore({
  reducer: {
    userSession,
    dataGlobalSlice,
    modalUserViewSlice,
    changeStateFileSlice,
    employeesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
