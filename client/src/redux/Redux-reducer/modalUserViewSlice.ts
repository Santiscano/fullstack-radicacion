import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UserAssignedAddress: "",
  UserAssignedEmail: "",
  UserAssignedExpirationDate: null,
  UserAssignedIdenfiticationDigitalCheck: '',
  UserAssignedIdentification: "",
  UserAssignedIdentificationType: "",
  UserAssignedLastname: "",
  UserAssignedName: "",
  UserAssignedPaydays: null,
  UserAssignedPhone: "",
  UserAssignedRol: 3,
  UserAssignedRoles: "",
  UserAssignedStatus: "",
  entry_date: "",
  files_account_type: "",
  files_account_type_number: "",
  files_code_accounting: null,
  files_code_treasury: null,
  files_cost_center: "",
  files_price: NaN,
  files_registered: "",
  files_states: "",
  files_states_description: "",
  files_type: "",
  idfiles: NaN,
  idfiles_states: NaN,
  idproviders: NaN,
  idroles: NaN,
  idsedes: NaN,
  idusers: NaN,
  sedes_address: "",
  sedes_city: "",
  sedes_country: "",
  sedes_name: "  - ",
  sedes_state: "",
  sedes_type: "",
  tracking_idfiles_states: NaN,
  users_address: "",
  users_email: "",
  users_identification: "",
  users_identification_digital_check: "",
  users_identification_type: "",
  users_lastname: "",
  users_name: "",
  users_phone: "",
  users_providers_expiration_date: "",
  users_providers_paydays: NaN,
  users_status: "",
}

export const modalUserViewSlice = createSlice({
  name: "modalUserView",
  initialState,
  reducers: {
    setModalUserView(state, action) {
      const newState = {...state, ...action.payload}
      return newState
    },
    setRemoveUserView(state){
      state = initialState;
    },
  },
});

export const { setModalUserView, setRemoveUserView } = modalUserViewSlice.actions;
export default modalUserViewSlice.reducer;
