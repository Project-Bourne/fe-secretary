import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const summarySlice = createSlice({
  name: 'Summary',
  initialState: {
    summaryId: '',
    summaryContent: '',
    summaryTitle: '', // Added summaryTitle field
    summaryLength: 0,
    history: [],
    bookMark: [],
    shouldFetchData: true,
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
    setBookMark: state => {
      state.bookMark = state.history.filter(item => item.bookmark);
    },
    setSummaryLength: (state, action) => {
      state.summaryLength = action.payload;
    },
    setShouldFetchData: (state, action) => {
      state.shouldFetchData = action.payload;
    },
  }
});

export const {
  setSummaryId,
  setSummaryContent,
  setSummaryTitle, // Export the new action
  setHistory,
  setSummaryLength,
  setToggleArchive,
  setBookMark,
  setShouldFetchData
} = summarySlice.actions;

export default summarySlice.reducer;
