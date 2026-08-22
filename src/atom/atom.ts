import { atom } from 'jotai';
import { atomWithRefresh, loadable } from 'jotai/utils';
import axios from "axios"

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


export const getAtom = atomWithRefresh(async(get) => {
    try {
        const {data} = await axios.get(apiUrl)
        return data.data
    } catch (error) {
        
    }
})
export const loadData = loadable(getAtom)  

export const delAtom = atom(null,async(get, set, id) => {
    try {
        await axios.delete(`${apiUrl}?id=${id}`)
        set(getAtom)
    } catch (error) {
        
    }
})
export const addAtom = atom(null, async(get,set,obj)=>{
    try {
        await axios.post(apiUrl, obj)
        set(getAtom)
    } catch (error) {
        
    }
})
export const editAtom = atom(null, async(get, set, obj) => {
    try {
        await axios.put(apiUrl, obj)
        set(getAtom)
    } catch (error) {
        
    }
})
export const delAtomImg = atom(null, async(set,get,id) =>{
    try {
        await axios.delete(`${apiUrl}/images/${id}`)
        set(getAtom)
    } catch (error) {
        
    }
})