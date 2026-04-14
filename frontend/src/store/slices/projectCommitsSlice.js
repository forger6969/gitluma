import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    commits: [],
    loading: false,
    error: null
}

const projectCommitsSlice = createSlice({
    name: "projectCommits",
    initialState,
    reducers: {
        addNewCommit: (state, action) => {
            state.commits.unshift(action.payload)
        }
    }
})

export const { addNewCommit } = projectCommitsSlice.actions
export default projectCommitsSlice.reducer