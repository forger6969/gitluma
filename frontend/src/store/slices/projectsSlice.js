import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const getProjects = createAsyncThunk(
    "project/getProject" , 
    async (_, thunkAPI)=>{
        
        try {

            const request = await api.get("/api/project/my")
            return request.data
            
        } catch (err) {
           return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
        }

    }
)

const initialState = {
    loading:false , 
    error:null,
    projects:[]
}

const projectSlice = createSlice({
    name:"project",
initialState,
reducers:{},
extraReducers:(builder) =>{

    builder
    .addCase(getProjects.pending , (state)=>{
        state.loading = true
        state.error = null
    })
.addCase(getProjects.rejected , (state , action)=>{
    state.error = action.payload    
    state.loading = false
})

.addCase(getProjects.fulfilled , (state , action)=>{
    state.projects = Array.isArray(action.payload)
        ? action.payload
        : Array.isArray(action.payload?.projects)
            ? action.payload.projects
            : []
    state.loading = false
})
}
})

export default projectSlice.reducer

