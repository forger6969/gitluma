import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"

const getNotifications = createAsyncThunk(
    'notification/get',
    async (_ , thunkAPI)=>{

        try {
           
            const req = await api.get("/api/notfication/my")
            return req.data
            
        } catch (err) {
           return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
        }

    }
)

const initialState = {
    notifications:[],
    loading:false ,
    error:null
}

const notificationSlice = createSlice({
    name:"notification",
    initialState,
    reducers:{

        addNotification:(state, action)=>{
            state.notifications.unshift(action.payload)
        }

    },
    extraReducers:(builder)=>{

        builder
        .addCase(getNotifications.pending , (state)=>{
            state.loading = true
        })

        .addCase(getNotifications.rejected , (state , action)=>{
            state.error = action
            state.loading = false
        })

        .addCase(getNotifications.fulfilled , (state , action)=>{
            state.notifications = action.notifications
            state.loading = false
        })

    }
})

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer