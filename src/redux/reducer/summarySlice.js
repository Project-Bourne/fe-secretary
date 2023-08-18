import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "Summary",
  initialState: {
    summaryId: "",
    summaryContent: "",
    summaryTitle: "", // Added summaryTitle field
    summaryLength: 0,
    history: [],
    isBookMark: false,
  },
  reducers: {
    setSummaryId: (state, action) => {
      state.summaryId = action.payload;
    },
    setSummaryContent: (state, action) => {
      state.summaryContent = action.payload;
    },
    setSummaryTitle: (state, action) => {
      state.summaryTitle = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setSummaryLength: (state, action) => {
      state.summaryLength = action.payload;
    },
    setToggleArchive: (state) => {
      state.isArchived = !state.isArchived;
    },
  },
});

export const {
  setSummaryId,
  setSummaryContent,
  setSummaryTitle, // Export the new action
  setHistory,
  setSummaryLength,
  setToggleArchive
  
} = summarySlice.actions;

export default summarySlice.reducer;
