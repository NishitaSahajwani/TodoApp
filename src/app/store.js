import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../slices/TodoSlice'

const store = configureStore({
    reducer:{
        todo: todoReducer,
    }
})
export default store