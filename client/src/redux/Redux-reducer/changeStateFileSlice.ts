import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface changeStateFileType {
  files_states: string,
  files_states_description: string,
  idfiles_states: number | null
}

const initialState: changeStateFileType = {
  files_states: "",
  files_states_description: "",
  idfiles_states: 0
}

export const changeStateFileSlice = createSlice({
  name: "changeStateFile",
  initialState,
  reducers: {
    changeStateFile: (state, action: PayloadAction<changeStateFileType>) => {
      return action.payload;
    }
  },
});


export const { changeStateFile } = changeStateFileSlice.actions;
export default changeStateFileSlice.reducer;


