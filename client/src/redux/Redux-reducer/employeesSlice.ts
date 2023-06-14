import { createSlice } from "@reduxjs/toolkit";

export type Employee = {
  // user
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
  // personal information
  compensation_fund: string;
  pension: string;
  layoffs: string;
  eps: string;
  arl: string;
  medical_emergency: string;
  arl_emergency:string;
  rh: string;
  academic_level: string;
  birthdate: string;
  gender: string;
  civil_status: string;
  city: string;
  shirt_size: string;
  pant_size: string;
  shoe_size: string;
  photo_path: string;
  // hiring
  type_contratation_name: string;
  position_name: string;
  company_name: string;
  company_address: string;
  company_phone: number;
  hiring_entry_Date: string;
  hiring_departure_date: string;
  hiring_salary: number;
  hiring_cost_center: string;
  personale_information_viculation_date: string;
  // emergency contact
  emergency_contact_name: string;
  emergency_contact_lastname: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: number;
  emergency_contact_cell_phone: number;
};

const initialState: Employee = {
  // user
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
  // personal information
  compensation_fund: '',
  pension: '',
  layoffs: '',
  eps: '',
  arl: '',
  medical_emergency: '',
  arl_emergency: '',
  rh: '',
  academic_level: '',
  birthdate: '',
  gender: '',
  civil_status: '',
  city: '',
  shirt_size: '',
  pant_size: '',
  shoe_size: '',
  photo_path: '',
  // hiring
  type_contratation_name: '',
  position_name: '',
  company_name: '',
  company_address: '',
  company_phone: NaN,
  hiring_entry_Date: '',
  hiring_departure_date: '',
  hiring_salary: NaN,
  hiring_cost_center: '',
  personale_information_viculation_date: '',
  // emergency contact
  emergency_contact_name: '',
  emergency_contact_lastname: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: NaN,
  emergency_contact_cell_phone: NaN,
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
