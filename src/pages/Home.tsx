import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { delData, delImg, editData, getData } from '../store/slice';
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css"
import 'swiper/css/navigation'
import 'swiper/css/pagination';

export default function Home() {

  const mainData = useSelector((store:RootState) => store.todos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getData())
  },[])
  console.log(mainData)


  const [idEdit,setIdEdit] = useState(0)
  const {values, handleChange, handleSubmit, setFieldValue, resetForm} = useFormik({
    initialValues: {
      id: idEdit,
      name: '',
      description: '',
    },
    onSubmit: values => {
      dispatch(editData(values))
      resetForm()
      setFieldValue('id', 0)
    }})
  

  const handeEdit = (el) => {
    setIdEdit(el.id)
    setFieldValue('name', el.name)
    setFieldValue('description', el.description)
    setFieldValue('id', el.id); 
  }
  
  if(mainData.isError){
    return(
      <div className='flex flex-col'>
        <h1>ERROR</h1>
      </div>
    )
  }
  if(mainData.isLoading){
    return(
      <div className='flex justify-center items-center w-full h-dvh'>
        <h1 className='text-6xl font-bold'>LOADING</h1>
      </div>
    )
  }
  return (
    <>
      <div className='flex flex-col gap-20 py-25'>
        <button className='bg-green-400 w-100 self-center text-white'>ADD</button>
        <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3'>
          <h1>{idEdit ? "EDIT MENU" : "ADD MENU"}</h1>
          <input className='border px-4 py-2 rounded-lg border-gray-400' onChange={handleChange} value={values.name} type="text" name='name' />
          <input className='border px-4 py-2 rounded-lg border-gray-400' onChange={handleChange} value={values.description} type="text" name='description' />
          <button className="bg-black w-100 p-3 rounded-lg text-white">{idEdit ? 'SAVE' : 'SEND'}</button>
        </form>

        <div className='flex flex-col items-center gap-10'>
          {
            mainData.data.map(el => (
              <div key={el.id} className='flex flex-col gap-5 items-center text-center shadow-[1px_1px_5px_gray] rounded-2xl p-5 w-150 transition-all hover:scale-110 duration-250'>
                <div className='w-full overflow-hidden'>
                  <Swiper 
                  slidesPerView={1}
                  spaceBetween={20}
                  navigation
                  >
                    {
                      el.images.map(img => (
                        <SwiperSlide key={img.id}>
                          <img className='w-full h-100 object-cover' src={`https://to-dos-api.softclub.tj/images/${img.imageName}`} alt="" />
                          <button onClick={() => dispatch(delImg(img.id))} className='my-5 bg-red-500 w-full text-white rounded-lg p-3 text-lg font-bold cursor-pointer'>DEL IMG</button>
                        </SwiperSlide>
                      ))
                    }
                  </Swiper>
                </div>
                <h1>{el.name}</h1>
                <h1>{el.description}</h1>
                <button onClick={() => handeEdit(el)} className='w-full bg-orange-500 cursor-pointer text-white p-3 rounded-2xl'>EDIT</button>
                <button onClick={() => dispatch(delData(el.id))} className='w-full bg-red-500 cursor-pointer text-white p-3 rounded-2xl'>DELETE</button>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
