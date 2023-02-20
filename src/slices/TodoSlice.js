import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import { getAllData } from '../api/todoAPI';

export const fetchAllDataAsync = createAsyncThunk('posts',()=>getAllData())

const todoSlice = createSlice({
    name: 'todo',
    initialState:{
        listOfTodo: [],
        selectedTodo : null,
        status:'init',
    },
    extraReducers:{
    //fetch
    [fetchAllDataAsync.pending]:(state)=>{
        state.status = 'fetching'
    },
    [fetchAllDataAsync.fulfilled]:(state, action)=>{
        state.status = 'fetched successfully'
        state.listOfTodo = action.payload
    },
    [fetchAllDataAsync.rejected]:(state)=>{
        state.status = 'rejected'
    },
    },
    reducers: {
        saveNewTodo: (state,action) => {
            state.listOfTodo.push(action.payload)
        },
        deleteTodo: (state,action) => {
            state.listOfTodo = state.listOfTodo.filter(value => value.id !== action.payload)
        },
        editTodo:(state,action)=>{
            const index = state.listOfTodo.findIndex(value => value.id === action.payload.id)
            state.listOfTodo[index] = action.payload
            return state
        },
        selectTodo: (state,action) => {
            state.selectedTodo = action.payload
            return state
           }
    }
}
)
export const {saveNewTodo,deleteTodo, selectTodo,editTodo} = todoSlice.actions
export const todoState = (state)=> state.todo
export default todoSlice.reducer