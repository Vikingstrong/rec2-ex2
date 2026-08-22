import { addAtom } from './../atom/atom';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch } from "react-redux"

const apiUrl = 'https://to-dos-api.softclub.tj/api/to-dos'


export interface imgType{
    imageName: string,
    id: number
}
export interface objTask{
    name:string,
    description:string,
    id:number,
    images:imgType[]
}
interface mainType{
    isLoading:boolean,
    error: boolean
    data:objTask[]
}


const initialState:mainType = {
    isLoading:false,
    error: false,
    data: [],
}

export const getData = createAsyncThunk("todos/getData", async() => {
    try {
        const {data} = await axios.get(apiUrl)
        return data.data
    } catch (error) {
        
    }
})
export const delData = createAsyncThunk('todos/delData', async(id:number, {dispatch}) => {
    try {
        await axios.delete(`${apiUrl}?id=${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const addData = createAsyncThunk('todos/addData', async(obj:any, {dispatch}) => {
    try {
        await axios.post(apiUrl, obj)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const editData = createAsyncThunk('todos/ediData', async(obj:any, {dispatch}) => {
    try {
        await axios.put(apiUrl, obj)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const delImg = createAsyncThunk('todos/delImg', async(id:number, {dispatch}) => {
    try {
        await axios.delete(`${apiUrl}/images/${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getData.fulfilled, (state,action) => {
            state.data = action.payload
            state.isLoading = false
        })
    }
})