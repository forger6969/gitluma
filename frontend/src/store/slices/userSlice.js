import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const userFetch = createAsyncThunk(
    "user/userFetch",
    async (_ , thunkAPI ) =>{

        try {
            
            const req = await api.get("/api/user/me")
            console.log(req);
            return req.data

        } catch (err) {
            console.log(err);
           return thunkAPI.rejectWithValue(err.response?.data || err.message)
        }

    }
)


const initialState = {
    loading:false , 
    error:null,
    user:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{

        builder
        .addCase(userFetch.pending, (state)=>{
            state.loading = true    
        })

        .addCase(userFetch.rejected , (state , action)=>{
            state.error = action.payload
            state.loading = false

        })

        .addCase(userFetch.fulfilled , (state , action)=>{
            state.user = action.payload
            state.loading = false
        })

    }
})

export default userSlice.reducer
