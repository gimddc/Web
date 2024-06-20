import { createSlice } from "@reduxjs/toolkit";
const initialState: { dataModelOpen: boolean; tagModelOpen: boolean } = {
  dataModelOpen: false,
  tagModelOpen: false
};
const openStore = createSlice({
  name: "open",
  initialState,
  reducers: {
    setDataModelOpen(state, action) {
      state.dataModelOpen = action.payload;
    },
    setTagModelOpen(state, action) {
      state.tagModelOpen = action.payload;
    }
  }
});
const { setDataModelOpen, setTagModelOpen } = openStore.actions;
const openReducer = openStore.reducer;

export { setDataModelOpen, setTagModelOpen };
export default openReducer;
