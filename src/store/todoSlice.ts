import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = 'https://to-dos-api.softclub.tj/api/to-dos';

export interface ImgObj {
    id: number;
    imageName: string;
}

export interface ObjData {
    id: number;
    name: string;
    description: string;
    images: ImgObj[];
}

interface TypeInitial {
    isLoading: boolean;
    data: ObjData[];
}

const initialState: TypeInitial = {
    isLoading: false,
    data: []
};

export const getData = createAsyncThunk('todos/getData', async () => {
    try {
        const { data } = await axios.get(apiUrl);
        return data.data;
    } catch (error) {
        console.error(error);
    }
});

export const delTask = createAsyncThunk('todos/delTask', async (id: number, { dispatch }) => {
    try {
        await axios.delete(`${apiUrl}?id=${id}`);
        dispatch(getData());
    } catch (error) {
        console.error(error);
    }
});

export const editTask = createAsyncThunk('todos/editTask', async (obj: { id: number; name: string; description: string }, { dispatch }) => {
    try {
        await axios.put(apiUrl, obj);
        dispatch(getData());
    } catch (error) {
        console.error(error);
    }
});

export const addTask = createAsyncThunk('todos/addTask', async (formData: FormData, { dispatch }) => {
    try {
        await axios.post(apiUrl, formData);
        dispatch(getData());
    } catch (error) {
        console.error(error);
    }
});

export const delImg = createAsyncThunk('todos/delImg', async (id: number, { dispatch }) => {
    try {
        await axios.delete(`${apiUrl}/images/${id}`);
        dispatch(getData());
    } catch (error) {
        console.error(error);
    }
});

export const addImg = createAsyncThunk('todos/addImg', async (formData: FormData, { dispatch }) => {
    try {
        await axios.post(`${apiUrl}/images`, formData);
        dispatch(getData());
    } catch (error) {
        console.error(error);
    }
});

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload || [];
        });
    }
});

export default todoSlice.reducer;