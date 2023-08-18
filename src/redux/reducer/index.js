import { combineReducers } from "@reduxjs/toolkit";
import summarySlice from './summarySlice';
import tabReducer from './tabSlice';

const rootReducer = combineReducers({ 
    summary: summarySlice,
    activeTab: tabReducer,
});

export default rootReducer;