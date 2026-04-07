import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import reposSlice from './slices/repoSlices'
import authReducer from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userSlice,
        repos: reposSlice,
        loaded: false,
    }
})