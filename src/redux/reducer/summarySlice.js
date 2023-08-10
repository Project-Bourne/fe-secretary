import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const summarySlice = createSlice({
    name: "Summary",
    initialState: {
      summaryId: "",
      summaryContent: "",
      history: [],
    },
  
    reducers: {
      setSummaryId: (state, action) => {
        state.summaryId = action.payload;
      },
      setSummaryContent: (state, action) => {
        state.summaryContent = action.payload;
      },
      setHistory: (state, action) => {
        state.history = action.payload;
      },
    },
  });
  
  
  export const { setSummaryId, setSummaryContent, setHistory } = summarySlice.actions;
  export default summarySlice.reducer;