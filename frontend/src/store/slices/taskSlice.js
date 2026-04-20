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

            state.tasks[index] = action.payload

        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTasks.pending , (state , action)=>{
            state.loading = true
        })

        .addCase(getTasks.rejected , (state , action)=>{
            state.loading = false 
            state.error = action.payload
        })

        .addCase(getTasks.fulfilled , (state , action)=>{
            state.loading = false
            state.tasks  = action.payload.tasks
        } )
    }
})

export const {putTask , addTask} = taskSlice.actions
export default taskSlice.reducer