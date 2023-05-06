import { createSlice } from '@reduxjs/toolkit';

export const dataGlobalSlice = createSlice({
  name: 'dataGlobal',
  initialState:{
    titleSection: 'home',
  },
  reducers:{
    setTitleSection(state, action) {
      state.titleSection = action.payload;
    },
    changeTitleSection: (state, action) => {

    },
  },
});

export const { setTitleSection } = dataGlobalSlice.actions;
export default dataGlobalSlice.reducer;
