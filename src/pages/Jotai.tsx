import { useAtom } from "jotai"
import { addAtom, delAtom, delAtomImg, editAtom, getAtom, loadData, type objTask } from "../atom/atom"
import { Button, CircularProgress } from "@mui/material"
import { useState } from "react"
import { useFormik } from 'formik';
import { delImg } from "../store/slice";


export default function Jotai() {
  const [dataState] = useAtom(loadData)
  const [, delTask] = useAtom(delAtom)
  const [, addTask] = useAtom(addAtom)
  const [, editTask] = useAtom(editAtom)
  const [, delImg] = useAtom(delAtomImg)

  const [idx, setIdx] = useState(0)

  
  const {values, handleChange, handleSubmit, resetForm, setFieldValue} = useFormik({
    initialValues: {
      name: '',
      description: '',
      files: []
    },
    onSubmit: (values) => {
      if(idx){
        const obj = {
          id: idx,
          name: values.name,
          description: values.description
        };
        editTask(obj)
        resetForm()
        setIdx(0)
      }else{
        postTask()
        resetForm()
      }
    }
  })
  function postTask(){
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    for (const file of values.files) {
      formData.append('images', file)
    }
    addTask(formData)
  }

  function handleEdit(el){
    setFieldValue('name', el.name)
    setFieldValue('description', el.description)
  }

  console.log(dataState)
  if(dataState.state == 'loading'){
    return(
      <CircularProgress/>
    )
  }
  return (
      <>
        <h1 className="text-3xl text-center font-bold">JOTAI + FORMIK</h1>
        <form onSubmit={handleSubmit} className='flex py-10 flex-col gap-5 items-center'>
          <h1 className="text-2xl font-bold">{idx ? "EDIT MENU" : "ADD MENU"}</h1>
          <input onChange={handleChange} value={values.name} type="text" name="name" className='border py-2 px-4 border-gray-300 rounded-lg' placeholder='Name' />
          <input onChange={handleChange} value={values.description} type="text" name="description" className='border py-2 px-4 border-gray-300 rounded-lg' placeholder='Desc' />
          <input multiple onChange={(e) =>  setFieldValue('files', e.target.files)} type="file" name="files" className={`border py-2 px-4 border-gray-300 w-55 rounded-lg ${idx ? "hidden" : "block"}`}  placeholder='Desc' />
          <Button sx={{width:210}} variant="contained" color="success" type='submit'>{idx? "SAVE" : "SEND"}</Button>
        </form>

        <div className="flex flex-col gap-15 items-center">
          <div className="flex flex-col items-center gap-5">
            {
              dataState.data?.map((el:objTask) => (
                <div className="flex flex-col gap-5">
                  <div className="flex gap-3 flex-col items-center w-90 rounded-xl p-5 shadow-[0_0_10px_gray]">
                    {
                      el.images.map(img => (
                        <div className="flex flex-col gap-5 w-75 overflow-auto ">
                          <img className="rounded-xl w-full h-50" src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                          <Button onClick={() => delImg(img.id)} variant='contained' color='error'>DELETE IMAGE</Button>
                        </div>
                      ))
                    }
                    <h1 className="text-2xl font-semibold">{el.name}</h1>
                    <p>{el.description}</p>
                    <Button onClick={() => {
                        handleEdit(el)
                        setIdx(el.id)}} variant="contained" color="warning" sx={{width:'100%'}}>Edit</Button>
                    <Button onClick={() => delTask(el.id)} variant="contained" color="error" sx={{width:'100%'}}>Delete</Button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </>
  )
}
