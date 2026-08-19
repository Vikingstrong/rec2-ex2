import { asyncThunkCreator, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";

const apiUrl = 'https://to-dos-api.softclub.tj/api/to-dos'


interface imgObj{
    id: number,
    imageName:string
}

interface objData{
    id: number,
    name: string,
    description: string,
    images:imgObj[]
}

interface typeInitial{
    isLoading: boolean,
    data: objData[]
}
const initialState:typeInitial = {
    isLoading: false,
    data:[]
}

export const getData = createAsyncThunk('todos/getData',async() => {
    try {
        const {data} = await axios.get(apiUrl)
        return data.data
    } catch (error) {
        
    }
})
export const delTask = createAsyncThunk('todos/delTask', async(id:number, {dispatch}) => {
    try {
        await axios.delete(`${apiUrl}?id=${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const editTask = createAsyncThunk('todos/editTask', async(obj, {dispatch}) => {
    try {
        await axios.put(apiUrl, obj)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const addTask = createAsyncThunk('todos/addTask', async(obj, {dispatch}) => {
    try {
        await axios.post(apiUrl, obj)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const delImg = createAsyncThunk('todos/delImg', async(id, {dispatch})=>{
    try {
        await axios.delete(`${apiUrl}/images/${id}`)
        dispatch(getData())
    } catch (error) {
        
    }
})
export const addImg = createAsyncThunk('todos/addImg', async(img, {dispatch}) => {
    try {
        await axios.post(apiUrl, img)
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
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
    }
})


export default todoSlice.reducer