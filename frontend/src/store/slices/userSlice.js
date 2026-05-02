import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const userFetch = createAsyncThunk(
    "user/userFetch",
    async (_, thunkAPI) => {
        try {
            const req = await api.get("/api/user/me")
            return req.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message)
        }
    }
)

export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, thunkAPI) => {
        try {
            const res = await api.get("/api/user/profile")
            return res.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || err.message)
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    user: null,
    loaded: false,
    profile: null,
    profileLoading: false,
    profileError: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFetch.pending, (state) => {
                state.loading = true
            })
            .addCase(userFetch.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(userFetch.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.loaded = true
            })

            .addCase(fetchProfile.pending, (state) => {
                state.profileLoading = true
                state.profileError = null
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.profileError = action.payload
                state.profileLoading = false
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.profileLoading = false
            })
    }
})

export default userSlice.reducer
