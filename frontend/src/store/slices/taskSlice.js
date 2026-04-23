import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getTasks = createAsyncThunk(
    'tasks/getTask',
   async (projectid,thunkAPI)=>{

    try {
        
        const request = await api.get(`/api/task/project/${projectid}`)
        return request.data

    } catch (err) {
       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message)
    }

   }
)



const initialState = {
    loading:false ,
    error:null,
    tasks:[]
}


const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        addTask:(state , action)=>{
            state.tasks.push(action.payload)
        },
        putTask:(state , action)=>{

            const index = state.tasks.findIndex((f)=> f._id === action.payload._id) 

            if (index === -1) {
                state.tasks.push(action.payload)
                return
            }

            state.tasks[index] = action.payload

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTasks.pending , (state)=>{
            state.loading = true
        })

        .addCase(getTasks.rejected , (state , action)=>{
            state.loading = false 
            state.error = action.payload
        })

        .addCase(getTasks.fulfilled , (state , action)=>{
            state.loading = false
            state.tasks = action.payload.tasks || []
        } )
    }
})

export const {putTask , addTask} = taskSlice.actions
export const selectTasks = (state) => state.tasks.tasks
export const selectTasksByStatus = (status) => (state) =>
    state.tasks.tasks.filter((task) => task.status === status)
export const selectTaskById = (taskId) => (state) =>
    state.tasks.tasks.find((task) => task._id === taskId) || null
export default taskSlice.reducer
