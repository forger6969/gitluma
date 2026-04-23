import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice'
import reposSlice from './slices/repoSlices'
import authReducer from "./slices/authSlice";
import notificationSlice from './slices/notificationSlice'
import projectSlice from './slices/projectsSlice'
import projectCommitsSlice from './slices/projectCommitsSlice'
import rateLimitReducer from "./slices/rateLimitSlice" 
import themeReducer from "./slices/themeSlice";
import tasksSlice from './slices/taskSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    repos: reposSlice,
    notifications: notificationSlice,
    projects: projectSlice,
    projectcommits: projectCommitsSlice,
    rateLimit: rateLimitReducer,
    theme: themeReducer,
    tasks:tasksSlice
  },
});

export default store    