import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import { authContext } from '../context/AuthContext'

export default function SignUp() {

  const userData = {
    email: "",
    password: "",
  }

  const [isSuccess, setSuccess] = useState(false);

  const [isError, setError] = useState(undefined);

  const [isPushed, setPushed] = useState(false)


  const navigate = useNavigate();

  const { myToken, setToken } = useContext(authContext)

  async function mySubmit(values) {

    setPushed(true)

    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((x) => {

        if (x.data.message == "success") {
          localStorage.setItem('tkn', x.data.token)
          setToken(x.data.token);

        }

        setSuccess(true)
        setError(undefined)
        setTimeout(() => {
          setSuccess(false)
          navigate('/Home')
        }, 2000);

      }).catch((x) => {

        setError(x.response.data.message)
        setSuccess(false)
        setTimeout(() => {
          setError(undefined)
        }, 2000);

      }).finally((x) => {
        setPushed(false)
      });


  }

  const myForm = useFormik({
    initialValues: userData,

    onSubmit: mySubmit,


    validate: function (values) {
      const errors = {};


      if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
        errors.email = "Make sure of your email format"
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "your password need to be at least 6 digit and less than 12 digit"
      }

      return errors
    }


  })


  return (
    <div className='mx-auto container mt-6'>

      {isSuccess ? <div className='bg-green-500 text-white p-2 text-center font-semibold rounded-md'> Welcome</div> : ""}
      {isError ? <div className='bg-red-500 text-white p-2 text-center font-semibold rounded-md'> {isError}</div> : ""}

      <form onSubmit={myForm.handleSubmit} className='flex flex-col font-semibold text-slate-600'>
        <h3 className='text-2xl mb-4'>Log in:</h3>


        <label htmlFor='email'>Email:</label>
        <input value={myForm.values.email} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="email" name="email" id="email" />
        {myForm.errors.email && myForm.touched.email ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.email}</div> : ""}


        <label htmlFor='password'>Password:</label>
        <input value={myForm.values.password} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="password" name="password" id="password" />
        {myForm.errors.password && myForm.touched.password ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.password}</div> : ""}




        <button type='submit' className='text-white my-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300 w-fit'>


          {isPushed ? <PulseLoader size={12} color='white' speedMultiplier={0.8} /> : "Log in"}


        </button>
      </form>
    </div>
  )
}
