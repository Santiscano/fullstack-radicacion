import { createSlice } from '@reduxjs/toolkit';
import { showTablePending } from '../../services/showTable.routes';


export const tableFilesSlice = createSlice({
  name: 'tableFiles',
  initialState:[],
  reducers: {
    setTableFiles(state, action){
      state = action.payload;
    },
  },
});

export const { setTableFiles } = tableFilesSlice.actions;
export default tableFilesSlice.reducer;

export const fetchTableFiles = () => async (dispatch:any) => {
  try {
    const table = await showTablePending();
    const rowsData = dispatch(setTableFiles(table?.data.data));
    console.log('rowsData: ', rowsData.payload);
    return rowsData
  }catch(error){
    console.log('error: ', error);
  }finally{}
}
