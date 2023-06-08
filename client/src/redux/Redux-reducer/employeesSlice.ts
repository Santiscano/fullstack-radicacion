import { createSlice } from "@reduxjs/toolkit";

export type Employee = {
  idroles: number;
  idsedes: number;
  idusers: number;
  users_address: string;
  users_email: string;
  users_identification: string;
  users_identification_digital_check?: string;
  users_identification_type: string;
  users_lastname: string;
  users_name: string;
  users_phone: string;
  users_providers_expiration_date?: string;
  users_providers_paydays?: number;
  sedes_name?: string;
  users_status?: string;
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
