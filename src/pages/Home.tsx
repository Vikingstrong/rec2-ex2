import { useFormik } from 'formik';
import { useState } from 'react';



export default function Home() {
  const [data, setData] = useState([])
  const [idx, setIdx] = useState(0)

  const {values, handleChange, handleSubmit, setFieldValue, resetForm} = useFormik({
    initialValues: {
      name: '',
      job: '',
      email: '',
    },
    onSubmit: values => {
      if(idx) {
          setData((prev) => prev.map(el => 
          el.id == idx ? {
            ...el,
            ...values
          } : el
        ))
        resetForm()
      }else{
        setData((prev) => [{...values, id:Date.now()},...prev])
        resetForm()
      }
    }
  })
  

  const delUser = (id) => {
    setData((prev) => prev.filter(el => el.id != id))
  }
  const handeEdit = (el) => {
    setIdx(el.id)
    setFieldValue('name', el.name)
    setFieldValue('job', el.job)
    setFieldValue('email', el.email)
  }
  
  return (
    <>
      <div>
        <form className='flex flex-col gap-5 items-center py-10' onSubmit={handleSubmit}>
          <input className='border border-gray-400 py-2 px-4 rounded-sm' onChange={handleChange} value={values.name} name='name' type="text" />
          <input className='border border-gray-400 py-2 px-4 rounded-sm' onChange={handleChange} value={values.job} name='job' type="text" />
          <input className='border border-gray-400 py-2 px-4 rounded-sm' onChange={handleChange} value={values.email} name='email' type="text" />
          <button className='bg-green-400 w-50 py-2 text-white rounded-lg' type='submit'>{idx? 'SAVE' : 'SEND'}</button>
        </form>
      </div>
      <div className='flex flex-col items-center gap-5'>
        {
          data.map(el => (
            <div className='shadow-2xl p-5 rounded-2xl items-center flex flex-col gap-2'>
              <p>{el.id}</p>
              <h1>Name: {el.name}</h1>
              <h1>Job: {el.job}</h1>
              <h1>Email: {el.email}</h1>
              <button onClick={() => handeEdit(el)} className='bg-orange-500 py-2 px-4 text-white w-full rounded-2xl cursor-pointer'>EDIT </button>
              <button onClick={() => delUser(el.id)} className='bg-red-500 w-full py-2 px-4 text-white rounded-2xl cursor-pointer'>DELETE </button>
            </div>
          ))
        }
      </div>
    </>
  )
}
