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
  company_phone: number | undefined;
  personale_information_viculation_date: string;
  hiring_entry_Date: string;
  hiring_departure_date: string;
  hiring_salary: number | undefined;
  hiring_cost_center: string;
  // emergency contact
  emergency_contact_name: string;
  emergency_contact_lastname: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: number | undefined;
  emergency_contact_cell_phone: number | undefined;
  // sociodemographic profile
  profile_place_birth : string,
  profile_transportation_help : string,
  profile_connectivity_help : string,
  profile_others_contracts_company : string,
  profile_working_modality : string,
  profile_title_academic_training : string,
  profile_home_tenure : string,
  profile_type_transport : string,
  profile_head_family : string,
  profile_number_children : string,
  profile_dependents : string,
  profile_dependents_disabilities : string,
  profile_monthly_family_income : string,
  profile_income_enough : string,
  profile_public_services_stratum : string,
  profile_electric_power : string,
  profile_sewerage : string,
  profile_aqueduct : string,
  profile_natural_gas_network : string,
  profile_garbage_colletion : string,
  profile_landline : string,
  profile_computer_home : string,
  profile_internet_home : string,
  profile_alcohol_consumption : string,
  profile_smoke : string,
  profile_former_smoke : string,
  profile_play_sport : string,
  profile_sport_frequency : string,
  profile_chronic_disease : string,
  profile_what_crhonic_disease : string,
  profile_take_medication : string,
  profile_what_medication_take : string,
  profile_allergic : string,
  profile_what_allergic : string,
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
  company_phone: undefined,
  hiring_entry_Date: '',
  hiring_departure_date: '',
  hiring_salary: undefined,
  hiring_cost_center: '',
  personale_information_viculation_date: '',
  // emergency contact
  emergency_contact_name: '',
  emergency_contact_lastname: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: undefined,
  emergency_contact_cell_phone: undefined,
  // sociodemographic profile
  profile_place_birth : '',
  profile_transportation_help : '',
  profile_connectivity_help : '',
  profile_others_contracts_company : '',
  profile_working_modality : '',
  profile_title_academic_training : '',
  profile_home_tenure : '',
  profile_type_transport : '',
  profile_head_family : '',
  profile_number_children : '',
  profile_dependents : '',
  profile_dependents_disabilities : '',
  profile_monthly_family_income : '',
  profile_income_enough : '',
  profile_public_services_stratum : '',
  profile_electric_power : '',
  profile_sewerage : '',
  profile_aqueduct : '',
  profile_natural_gas_network : '',
  profile_garbage_colletion : '',
  profile_landline : '',
  profile_computer_home : '',
  profile_internet_home : '',
  profile_alcohol_consumption : '',
  profile_smoke : '',
  profile_former_smoke : '',
  profile_play_sport : '',
  profile_sport_frequency : '',
  profile_chronic_disease : '',
  profile_what_crhonic_disease : '',
  profile_take_medication : '',
  profile_what_medication_take : '',
  profile_allergic : '',
  profile_what_allergic : '',
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
