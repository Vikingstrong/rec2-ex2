import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const url =  'https://to-dos-api.softclub.tj/api/to-dos'

interface imgType{
    imageName: string,
    id: number
}
interface todoObj{
    id:number,
    name:string,
    description:string,
    images:imgType[]
}

interface mainType{
    data: todoObj[]
    isLoading: boolean
    isError: boolean
}

export const getData = createAsyncThunk('todos/getData', async() => {
    try {
        const {data} = await axios.get(url)
        return data.data
    } catch (error) {
        
    }
})
export const delData = createAsyncThunk('todos/delData', async(id:number, {dispatch}) => {
    try {
        await axios.delete(`${url}?id=${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const editData = createAsyncThunk('todos/editData', async(obj:any, {dispatch}) => {
    try {
        await axios.put(url, obj)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const delImg = createAsyncThunk('todos/delImg', async(id:number, {dispatch}) => {
    try {
        await axios.delete(`${url}/images/${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})

const initialState:mainType = {
    data: [],
    isLoading: false,
    isError: false
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getData.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false
        })
        .addCase(getData.rejected, (state) => {
            state.isLoading = false
            state.isError = true
        })
    }
})