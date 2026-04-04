import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const reposFetch = createAsyncThunk(
    "repos/reposFetch",
    async (_ , thunkAPI)=>{

    try {
            const req = await api.get("/api/github/repos/actives")
        const repos = req.data.repos

        return repos

    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
    }
)

const initialState = {
    repos: [],
    loading:false , 
    error:null
}

const repoSlice = createSlice({
    name:"repos",
initialState,
reducers:{},
extraReducers:(builder)=>{

    builder
    .addCase(reposFetch.rejected , (state , action)=>{

state.error = action.payload
state.loading = false         

    })
    .addCase(reposFetch.pending, (state)=>{

        state.loading = true
    })

    .addCase(reposFetch.fulfilled , (state , action)=>{

        state.loading = false 
        state.repos = action.payload

    })

}
})

export default repoSlice.reducer