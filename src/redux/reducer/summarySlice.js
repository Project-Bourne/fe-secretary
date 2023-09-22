import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "Summary",
  initialState: {
    summaryId: "",
    summaryContent: "",
    summaryTitle: "", // Added summaryTitle field
    summaryContentType: "sentence", // Added summaryContentType field
    copyText: "",
    uploadedText: "",
    uploloadedUri: "",
    history: [],
    bookMark: [],
    fileName: "",
    summarizeSetting: false,
    summarizeSettingUpload: false,
    showLoader: false,
    showLoaderUpload: false,
    showSummary: false,
  },
  reducers: {
    setCopyText: (state, action) => {
      state.copyText = action.payload;
    },
    setFileUpLoadName: (state, action) => {
      state.fileName = action.payload;
    },
    setSummaryId: (state, action) => {
      state.summaryId = action.payload;
    },

    setSummaryContent: (state, action) => {
      state.summaryContent = action.payload;
    },
    setSummaryTitle: (state, action) => {
      state.summaryTitle = action.payload;
    },
    setSummarizeSetting: (state, action) => {
      state.summarizeSetting = action.payload;
    },
    setSummarizeSettingUpload: (state, action) => {
      state.summarizeSettingUpload = action.payload;
    },
    setShowLoader: (state, action) => {
      state.showLoader = action.payload;
    },
    setShowLoaderUpload: (state, action) => {
      state.showLoaderUpload = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setBookMark: (state) => {
      state.bookMark = state.history.filter((item) => item.bookmark);
    },
    setSummaryContentType: (state, action) => {
      state.summaryContentType = action.payload;
    },
    setuploadedText: (state, action) => {
      state.uploadedText = action.payload;
    },
    setuploloadedUri: (state, action) => {
      state.uploloadedUri = action.payload;
    },
  },
});

export const {
  setuploadedText,
  setuploloadedUri,
  setCopyText,
  setSummaryId,
  setSummaryContent,
  setSummaryTitle, // Export the new action
  setSummarizeSetting,
  setHistory,
  setSummaryContentType,
  setBookMark,
  setFileUpLoadName,
  setShowLoader,
  setShowLoaderUpload,
  setSummarizeSettingUpload,
} = summarySlice.actions;

export default summarySlice.reducer;
