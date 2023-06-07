import { createSlice } from "@reduxjs/toolkit";

export type Employee = {
  idusers: number;
  idroles: number;
  idsedes: number;
  sedes_name: string;
  users_name: string;
  users_lastname: string;
  users_address: string;
  users_phone: string;
  users_email: string;
  users_identification: string;
  users_identification_type: string;
};

const initialState: Employee = {
  idusers: 0,
  idroles: 11,
  idsedes: NaN,
  sedes_name: '',
  users_name: '',
  users_lastname: '',
  users_address: '',
  users_phone: '',
  users_email: '',
  users_identification: '',
  users_identification_type: '',
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployee(state, action) {
      const newState = {...state, ...action.payload}
      return newState;
    },
    setRemoveEmployee(state){
      state = initialState;
    },
  },
});

export const { setEmployee, setRemoveEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
