import { Card } from "#components/ui/card";
import { useEffect, useState } from "react";
import { addImg, addTask, delImg, delTask, editTask, getData } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { Button } from "@base-ui/react/button";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home(){

    const mainData = useSelector((state:RootState) => state.todos)
    const {data} = useSelector((state:RootState) => state.todos)
    const dispatch = useDispatch<AppDispatch>()
    

    useEffect(() => {
        dispatch(getData())
    },[])
    
    
    const [openAddImgMenu, setOpenAddImgMenu] = useState(false)
    const [fileImages, setFileImages] = useState<FileList | null>(null)

    
    const [openAdd, setOpenAdd] = useState(false)
    const [addName, setAddName] = useState('')
    const [addDesc, setAddDesc] = useState('')
    const [addFile, setAddFile] = useState<FileList | null>(null)


    function send(){
        const formData = new FormData()
        formData.append("name", addName)
        formData.append("description", addDesc)
        if(addFile){
            for (const file of Array.from(addFile)) {
                formData.append('images', file)
            }
        }
        dispatch(addTask(formData))

        setAddName('')
        setAddDesc('')
        setAddFile(null)
        setOpenAdd(false)
    }

    const [edit, setEdit] = useState({
        id: 0,
        name: '',
        description: ''
    })
    const [openEdit, setOpenEdit] = useState(false)

    function openEditMenu(obj: any){
        setOpenEdit(true)
        setEdit({
            id: obj.id,
            name: obj.name,
            description: obj.description
        })
    }

    function addNewImages(){
        const formData = new FormData();
        if(fileImages){
            for (const file of Array.from(fileImages)) {
                formData.append('images', file)
            }
        }
        dispatch(addImg(formData))
    }

    if(mainData.isLoading){
        return(
            <div className="flex w-full h-dvh items-center justify-center">
                <h1>LOADING</h1>
            </div>
        )
    }
    return(
        <>
            <div className="flex pt-10 justify-center">
                <button onClick={() => setOpenAdd(true)} className='bg-green-400 cursor-pointer py-4 px-2 w-50 text-white font-bold rounded-lg' >ADD NEW</button>
            </div>
            <div className="flex flex-wrap gap-5 py-25 max-w-300 m-auto">
                {
                    data.map((el: any) => (
                        <Card key={el.id} className="bg-black text-white p-5 text-center w-[23%] items-center transition-all hover:scale-105 hover:rounded-4xl duration-250">
                            <Swiper
                              slidesPerView="auto"
                              spaceBetween={20} 
                              navigation 
                              pagination={{ clickable: true }} 
                              className=""
                            >
                              {el.images?.map((img: any) => (
                                <SwiperSlide 
                                  key={img.id} 
                                  className="w-!80 shrink-0" >
                                  <div className="flex flex-col gap-5 items-center">
                                    <img 
                                      className="w-full rounded-2xl h-50 object-cover" 
                                      src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} 
                                      alt={img.imageName || "Image"} 
                                    />
                                    <Button onClick={() => dispatch(delImg(img.id))} className='bg-red-500 py-2 px-4 rounded-lg text-lg hover:bg-red-700 w-25 cursor-pointer transition-all'>DELETE</Button>
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                            <h1 className="text-2xl font-bold">{el.name}</h1>
                            <p className="">{el.description}</p>
                            <div className="flex gap-5 justify-center">
                                <Button onClick={() => openEditMenu(el)} className='bg-amber-500 py-2 px-4 rounded-lg text-lg hover:bg-amber-700 w-20 cursor-pointer transition-all'>Edit</Button>
                                <Button onClick={() => dispatch(delTask(el.id))} className='bg-red-500 py-2 px-4 rounded-lg text-lg hover:bg-red-700 w-25 cursor-pointer transition-all'>Delete</Button>
                            </div>
                            <button onClick={() => {
                                setOpenAddImgMenu(true)
                                }} className='bg-green-500 hover:bg-green-700 transition cursor-pointer py-4 px-2 w-50 text-white font-bold rounded-lg' >ADD NEW IMG</button>
                        </Card>
                    ))
                }
            </div>
            <dialog className="absolute top-50 z-100 left-140" open={openAdd} onClose={() => setOpenAdd(false)}>
                <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
                    <input onChange={(e) => setAddName(e.target.value)} value={addName} className="border p-3 border-gray-400" type="text" placeholder="name" />
                    <input onChange={(e) => setAddDesc(e.target.value)} value={addDesc} className="border p-3 border-gray-400" type="text" placeholder="Desc" />
                    <input multiple onChange={(e) => setAddFile(e.target.files)} className="border p-3 border-gray-400" type="file" placeholder="Desc" />
                    <div className="flex justify-center gap-5">
                        <Button onClick={() => send()} className='bg-green-500 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-700 w-25 cursor-pointer transition-all'>Save</Button>
                    </div>
                </div>
            </dialog>

            <dialog className="absolute z-100 top-50 left-155" open={openEdit} onClose={() => setOpenEdit(false)}>
                <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
                    <input onChange={(e) => setEdit({...edit, name: e.target.value})} value={edit.name} className="border p-3 border-gray-400" type="text" placeholder="name" />
                    <input onChange={(e) => setEdit({...edit, description: e.target.value})} value={edit.description} className="border p-3 border-gray-400" type="text" placeholder="Desc" />
                    <div className="flex justify-center gap-5">
                        <Button onClick={() => {
                            dispatch(editTask(edit))
                            setOpenEdit(false)
                        }} className='bg-green-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-900 w-25 cursor-pointer transition-all'>Save</Button>
                    </div>
                </div>
            </dialog>
            <dialog className="absolute z-100 top-65 left-140" open={openAddImgMenu} onClose={() => setOpenAddImgMenu(false)}>
                <div className="flex flex-col gap-5 p-5 bg-white rounded-lg">
                    <input multiple onChange={(e) => setFileImages(e.target.files)} className="border p-3 border-gray-400" type="file" placeholder="Desc" />
                    <div className="flex justify-center gap-5">
                        <Button onClick={() => {
                            addNewImages()
                        }} className='bg-green-600 text-white py-2 px-4 rounded-lg text-lg hover:bg-green-900 w-25 cursor-pointer transition-all'>Save</Button>
                    </div>
                </div>
            </dialog>
        </>
    )
}