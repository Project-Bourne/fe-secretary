import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const summarySlice = createSlice({
  name: 'Summary',
  initialState: {
    summaryId: '',
    summaryContent: '',
    summaryTitle: '', // Added summaryTitle field
    summaryLength: 0,
    summaryContentType: 'sentence', // Added summaryContentType field
    copyText: '',
    summaryLengthRange: ['1', '2', '3', '4', '5'],
    history: [],
    bookMark: [],
    shouldFetchData: true,

  },
  reducers: {
    setCopyText: (state, action) => {
      state.copyText = action.payload;
    },
    setSummaryId: (state, action) => {
      state.summaryId = action.payload;
    },
    setSummaryLengthRange: (state, action) => {
      state.summaryLengthRange = action.payload;
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
    setSummaryContentType: (state, action) => {
      state.summaryContentType = action.payload;
    },
    setShouldFetchData: (state, action) => {
      state.shouldFetchData = action.payload;
    },
  }
});

export const {
  setCopyText,
  setSummaryId,
  setSummaryContent,
  setSummaryTitle, // Export the new action
  setHistory,
  setSummaryLength,
  setSummaryContentType,
  setToggleArchive,
  setBookMark,
  setShouldFetchData,
  setSummaryLengthRange
} = summarySlice.actions;

export default summarySlice.reducer;
