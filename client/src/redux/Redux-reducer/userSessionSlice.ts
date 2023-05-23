import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idroles:NaN,
  idsedes:NaN,
  idusers:NaN,
  roles:"",
  sedes_city:"",
  sedes_name:"",
  users_email:"",
  users_identification:"",
  users_identification_type:"",
  users_lastname:"",
  users_name:"",
  users_status:"",
};

export const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers:{
    setUserSession(state, action) {
      return action.payload;
    },
    setRemoveUserSession: () => {
      return initialState;
    },
  },
});

export const { setUserSession, setRemoveUserSession } = userSessionSlice.actions;
export default userSessionSlice.reducer;
