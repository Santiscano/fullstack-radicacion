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
  users_cellphone: string;
  users_providers_expiration_date?: string;
  users_providers_paydays?: number;
  sedes_name?: string;
  users_status?: string;
  // personal information
  residence_municipality:string;
  compensation_fund: string;
  pension: string;
  layoffs: string;
  eps: string;
  arl: string;
  medical_emergency: string;
  arl_emergency:string;
  rh: string;
  academic_level: string;
  birthdate: string | null;
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
  // files upload
  cv_document: string;
  document_type_document: string;
  driveing_license_document: string;
  military_card_document: string;
  vehicle_documents: string;
  notary_document:string;
  bachelor_document:string;
  technique_document: string;
  technology_document: string;
  professional_document:string;
  postgraduate_document:string;
  bank_certificate_document:string;
  personal_reference_document:string;
  academic_reference_document:string;
  work_reference_document:string;
  employment_work_reference :string;
  employment_academic_reference: string;
  employment_personal_reference: string;
  // hiring
  work_contract: string;
  another_if: string;
  confidentiality_agreement: string;
  auth_owner_information: string;
  siplaft_query: string;
  job_description: string;
  induction:string;
  apprentice_cover_letter: string;
  human_management_concept:string;
  home_visit:string;
  fingerprint_registration: string;
  // health safety at work
  medical_examination_admission: string;
  periodic_medical_examination: string;
  disabilities: string;
  permit_request:string;
  endowment: string;
  performance_evaluation:string;
  delivery_work_tools:string;
  // beneficiary
  marriage_certificate:string;
  beneficiary_identity_card:string;
  childrens_civil_registry:string;
  childrens_identity_card:string;
  childrens_study_certificate:string;
  // membership
  social_security_payment:string;
  eps_certificate: string;
  eps_affiliation_certificate: string;
  fp_certificate: string;
  affiliation_certificate_compensation_box: string;
  layyoffs_certificate: string;
  arl_affiliation_certificate:string;
  // social benefit
  premium_services:string;
  vacation:string;
  severance_withdrawal_request:string;
  proof_of_severance_pay:string;
  // withdrawal
  letter_of_resignation:string;
  letter_of_acceptance:string;
  contract_termination:string;
  letter_withdrawal_medical_examination:string;
  withdrawal_medical_examination:string;
  final_settlement:string;
  eps_withdrawal :string;
  layoffs_withdrawal :string;
  arl_withdrawal :string;
  compensation_box_withdrawal :string;
  delivery_work_tool:string;
  // deductions
  dp:string;
  order:string;
  payroll_deduction_authorization_events:string;
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
  users_cellphone:'',
  users_email: '',
  users_identification: '',
  users_identification_type: '',
  users_status: '',
  // personal information
  residence_municipality:'',
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
  // file upload
  cv_document: '',
  document_type_document: '',
  driveing_license_document: '',
  military_card_document: '',
  vehicle_documents: '',
  notary_document:'',
  bachelor_document:'',
  technique_document: '',
  technology_document: '',
  professional_document:'',
  postgraduate_document:'',
  bank_certificate_document:'',
  personal_reference_document:'',
  academic_reference_document:'',
  work_reference_document:'',
  employment_work_reference :'',
  employment_personal_reference: '',
  employment_academic_reference: '',
  // hiring
  work_contract: '',
  another_if: '',
  confidentiality_agreement: '',
  auth_owner_information: '',
  siplaft_query: '',
  job_description: '',
  induction: '',
  apprentice_cover_letter: '',
  human_management_concept: '',
  home_visit: '',
  fingerprint_registration: '',
  // health safety at work
  medical_examination_admission:  '',
  periodic_medical_examination:  '',
  disabilities:  '',
  permit_request: '',
  endowment:  '',
  performance_evaluation: '',
  delivery_work_tools: '',
  // beneficiary
  marriage_certificate: '',
  beneficiary_identity_card: '',
  childrens_civil_registry: '',
  childrens_identity_card: '',
  childrens_study_certificate: '',
  // membership
  social_security_payment: '',
  eps_certificate:  '',
  eps_affiliation_certificate:  '',
  fp_certificate:  '',
  affiliation_certificate_compensation_box:  '',
  layyoffs_certificate:  '',
  arl_affiliation_certificate: '',
  // social benefit
  premium_services: '',
  vacation: '',
  severance_withdrawal_request: '',
  proof_of_severance_pay: '',
  // withdrawal
  letter_of_resignation: '',
  letter_of_acceptance: '',
  contract_termination: '',
  letter_withdrawal_medical_examination: '',
  withdrawal_medical_examination: '',
  final_settlement: '',
  eps_withdrawal : '',
  layoffs_withdrawal : '',
  arl_withdrawal : '',
  compensation_box_withdrawal : '',
  delivery_work_tool: '',
  // deductions
  dp: '',
  order: '',
  payroll_deduction_authorization_events: '',
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployee(state, action) {
      return {...state, ...action.payload}
    },
    setRemoveEmployee(state){
      return {...initialState}
    },
  },
});

export const { setEmployee, setRemoveEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
