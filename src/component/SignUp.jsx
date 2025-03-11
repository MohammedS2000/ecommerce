import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {PulseLoader} from 'react-spinners'
export default function SignUp() {

  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
  }

  const [isSuccess, setSuccess] = useState(false);

  const [isError, setError] = useState(undefined);

  const [isPushed, setPushed] = useState(false)


  const navigate = useNavigate();

  async function mySubmit(values) {

    setPushed(true)

    const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((x) => {

        setSuccess(true)
        setError(undefined)
        setTimeout(() => {
          setSuccess(false)
          navigate('/Login')
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

      const regexName = /^[A-Z][a-z]{3,7}$/;

      if (regexName.test(values.name) == false) {
        errors.name = "Name must start with capital letter and no more than 9 letters"
      }

      if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
        errors.email = "Make sure of your email format"
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "your password need to be at least 6 digit and less than 12 digit"
      }

      if (values.rePassword !== values.password) {
        errors.rePassword = "Make sure that you entered the same password"
      }

      return errors
    }


  })


  return (
    <div className='mx-auto container'>

      {isSuccess ? <div className='bg-green-500 text-white p-2 text-center font-semibold rounded-md'> You successfuly made an account</div> : ""}
      {isError ? <div className='bg-red-500 text-white p-2 text-center font-semibold rounded-md'> {isError}</div> : ""}

      <form onSubmit={myForm.handleSubmit} className='flex flex-col font-semibold text-slate-600'>
        <h3 className='text-2xl mb-4'>Register Now:</h3>
        <label htmlFor='name'>Name:</label>
        <input value={myForm.values.name} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="text" name="name" id="name" />
        {myForm.errors.name && myForm.touched.name ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.name}</div> : ""}

        <label htmlFor='email'>Email:</label>
        <input value={myForm.values.email} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="email" name="email" id="email" />
        {myForm.errors.email && myForm.touched.email ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.email}</div> : ""}


        <label htmlFor='password'>Password:</label>
        <input value={myForm.values.password} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="password" name="password" id="password" />
        {myForm.errors.password && myForm.touched.password ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.password}</div> : ""}


        <label htmlFor='rePassword'>rePassword:</label>
        <input value={myForm.values.rePassword} onBlur={myForm.handleBlur} onChange={myForm.handleChange} className='border my-2 rounded-md px-2 border-green-600' type="password" name="rePassword" id="rePassword" />
        {myForm.errors.rePassword && myForm.touched.rePassword ? <div className='bg-red-500 rounded-md p-2 text-sm text-white'>{myForm.errors.rePassword}</div> : ""}

        <button type='submit' className='text-white my-2 font-semibold border rounded-md bg-green-600 p-2 hover:bg-green-400 duration-300 w-fit'>


          {isPushed ? <PulseLoader size={12} color='white' speedMultiplier={0.8}/> : "Sign Up"}
          

        </button>
      </form>
    </div>
  )
}
