import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"

export const getNotifications = createAsyncThunk(
    'notifications/get',
    async (_, thunkAPI) => {

        try {

            const req = await api.get("/api/notification/my")
            console.log("notifications:", req.data);

            return req.data

        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
        }

    }
)

export const markAllAsRead = createAsyncThunk(
    "notifications/markAllAsRead",
    async (_, thunkAPI) => {
        try {
            await api.patch("/api/notification/read-all")
            return true
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response?.data?.message || err.message
            )
        }
    }
)

const initialState = {
    notifications: [],
    loading: false,
    error: null
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

        addNotification: (state, action) => {
            state.notifications.unshift(action.payload)
        }

    },
    extraReducers: (builder) => {

        builder
            .addCase(getNotifications.pending, (state) => {
                state.loading = true
            })

            .addCase(getNotifications.rejected, (state, action) => {
                state.error = action
                state.loading = false
            })

            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload.notifications
                state.loading = false
            })

            .addCase(markAllAsRead.fulfilled, (state) => {
                state.notifications.forEach(n => {
                    n.read = true
                })
            })

    }
})


export const { addNotification } = notificationSlice.actions
export default notificationSlice.reducer