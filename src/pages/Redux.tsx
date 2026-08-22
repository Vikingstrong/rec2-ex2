import { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/store';
import { addData, delData, delImg, editData, getData } from '../store/slice';

export default function Redux() {
  const mainData = useSelector((store:RootState) => store.todos)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getData())
  }, [])

  const [idx, setIdx] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm()
  const onSubmit = (values)=> {
    if(idx){
      dispatch(editData({
        id: idx,
        name: values.name,
        description: values.description
      }))
      setIdx(0)
    }else{
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('images', values.files?.[0])
      dispatch(addData(formData))
    }
    reset({name: '', description: ''})
  }


  const handleEdit = (el) => {
    setIdx(el.id)
    reset(el)
  }
  

  if(mainData.isLoading){
    return(
      <div className='flex justify-center items-center w-full h-dvh'>
        <CircularProgress/>
      </div>
    )
  }
  return (
    <>
      <h1 className="text-3xl text-center font-bold">REDUX + REACT HOOK FORM</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className='flex py-10 flex-col gap-5 items-center'>
        <input type="text" {...register('name')} className='border py-2 px-4 border-gray-300 rounded-lg'  placeholder='Name' />
        <input type="text" {...register('description')} className='border py-2 px-4 border-gray-300 rounded-lg' placeholder='Desc' />
        <input type="file" {...register('files')} className={`border py-2 px-4 border-gray-300 w-55 rounded-lg ${idx ? "hidden" : "block"}`}  placeholder='Desc' />
        <button className='w-60 bg-green-400 text-white rounded-lg p-3 text-lg font-semibold cursor-pointer' type='submit'>{idx? "SAVE" : "SEND"}</button>
      </form>
      <div className='flex flex-col items-center gap-5'>
        {
          mainData.data?.map(el => (
            <div key={el.id} className='flex flex-col gap-3'>
              <div className='flex gap-5 overflow-auto'>
                {
                  el.images.map(img => (
                    <div className="flex flex-col gap-5 w-75">
                      <img className="rounded-xl w-full h-50" src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                      <Button onClick={() => dispatch(delImg(img.id))} variant='contained' color='warning'>DELETE IMAGE</Button>
                    </div>
                  ))
                }
              </div>
              <h1>{el.name}</h1>
              <h1>{el.description}</h1>
              <button onClick={() => handleEdit(el)} className='bg-black text-white'>EDIT</button>
              <Button onClick={() => dispatch(delData(el.id))} variant='contained' color='error'>DELETE</Button>
            </div>
          ))
        }
      </div>
    </>
  )
}
