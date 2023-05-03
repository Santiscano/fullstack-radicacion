import { createSlice } from '@reduxjs/toolkit';


export const tableFilesSlice = createSlice({
  name: 'tableFiles',
  initialState:[],
  reducers: {
    setTableFiles(state, action){
      return action.payload;
    },
  },
});

export const { setTableFiles } = tableFilesSlice.actions;
export default tableFilesSlice.reducer;

export const fetchTableFiles = () => async () => {
  try {

  }catch(error){}finally{}
}
