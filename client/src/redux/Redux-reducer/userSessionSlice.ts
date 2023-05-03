import { createSlice } from '@reduxjs/toolkit';

export interface User {
  idroles: number;
  idsedes: number;
  idusers: number;
  roles: string;
  roles_description: string;
  sedes_address: string;
  sedes_city: string;
  sedes_country: string;
  sedes_name: string;
  sedes_state: string;
  sedes_type: string;
  users_address: string;
  users_email: string;
  users_identification: string;
  users_identification_digital_check: string;
  users_identification_type: string;
  users_lastname: string;
  users_name: string;
  users_phone: string;
  users_providers_expiration_date: number | null;
  users_providers_paydays: Date | null;
  users_status: string;
};

const initialState: User = {
  idusers: 34,
  idroles: 3,
  idsedes: 1,
  users_identification_type: "CEDULA CIUDADANIA",
  users_identification: "123123",
  users_identification_digital_check: "6",
  users_name: "SANTIAGO",
  users_lastname: "GH",
  users_address: "ASDASD",
  users_phone: "123123",
  users_email: "GH@GMAIL.COM",
  users_providers_paydays: null,
  users_providers_expiration_date: null,
  users_status: "ACTIVO",
  roles: "GESTIÓN HUMANA",
  roles_description: "AUDITOR",
  sedes_country: "COLOMBIA",
  sedes_city: "MEDELLÍN",
  sedes_state: "ANTIOQUIA",
  sedes_address: "CALLE 30A # 65B - 59, BARRIO FATIMA",
  sedes_name: "SOLUCIONES ENVIEXPRESS - MEDELLÍN",
  sedes_type: "PROPIA"
}

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState:{},
  reducers:{
    setUserSession(state, action) {
      return action.payload;
    },
  },
});

export const { setUserSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
