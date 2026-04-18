import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../api/api"

export const getNotifications = createAsyncThunk(
    'notifications/get',
    async (_, thunkAPI) => {

        try {
            const req = await api.get("/api/notification/my")

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
    error: null,
    loaded: false,
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
                state.error = null
            })

            .addCase(getNotifications.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
                state.loaded = true
            })

            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload.notifications
                state.loading = false
                state.loaded = true
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