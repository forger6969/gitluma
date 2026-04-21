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
        },
        clearCommits: (state) => {
            state.commits = []
        }
    }
})

export const { addNewCommit, clearCommits } = projectCommitsSlice.actions
export default projectCommitsSlice.reducer