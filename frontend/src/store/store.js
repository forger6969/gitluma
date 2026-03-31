import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import reposSlice from './slices/repoSlices'

export const store = configureStore({
    reducer:{
        user:userSlice,
        repos:reposSlice
    }
})