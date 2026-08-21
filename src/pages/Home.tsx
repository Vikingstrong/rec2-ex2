import { useFormik } from 'formik';


export default function Home() {
  const {values, handleChange} = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    onSubmit: values => {
      console.log('submit')
    }
  })


  return (
    <>
      <form className='flex flex-col gap-5'>
        
      </form>
    </>
  )
}
