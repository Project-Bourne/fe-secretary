import { combineReducers } from "@reduxjs/toolkit";
import summarySlice from './summarySlice';

const rootReducer = combineReducers({ 
    summary: summarySlice
});

export default rootReducer;