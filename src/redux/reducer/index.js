import { combineReducers } from "@reduxjs/toolkit";
import summarySlice from './summarySlice';
import tabReducer from './tabSlice';
import authSlice from './authReducer';

const rootReducer = combineReducers({ 
    summary: summarySlice,
    activeTab: tabReducer,
    auth: authSlice,
});

export default rootReducer;