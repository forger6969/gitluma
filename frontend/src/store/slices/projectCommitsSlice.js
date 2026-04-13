const { createSlice } = require("@reduxjs/toolkit");

const initalState = {
    commits:[],
    loading:false,
    error:null
}


const projectCommitsSlice = createSlice({
    name:"projectCommits",
initialState:initalState,
reducers:{
    addNewCommit:(state , action)=>{
        state.commits.unshift(action.payload)
    }
}
})


export const {addNewCommit} = projectCommitsSlice.actions
export default projectCommitsSlice.reducer