import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Register } from '../../utils/FetchData.js'
import { login } from '../../store/reducers/authSlice.js';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false)


  const submithandler = async (data) => {
    setloading(true)
    const res = await Register(data);
    dispatch(login(res.data.user))
    navigate('/dashboard')
    if (res) setloading(false)
  }

  return (
    loading ? (
      <Loader />
    ) : (

      <div className='w-[100vw] h-[100vh] signup flex  item-center justify-center ' >
        <form onSubmit={handleSubmit(submithandler)} className="flex w-[40vw] bg-gray-200 flex-col gap-4 text-left my-auto bg-[#37393F] p-4 rounded-lg">
          <h1 className='text-black text-xl text-center font-bold'>Create an account</h1>
          <div>
            <span className='text-black ml-2'>Email</span>
            <input
              type="email"
              placeholder="name@gmail.com"
              className="w-full mt-1 p-2 rounded-md outline-none text-black"
              {...register("userEmail")}
            />
          </div>
          <div>
            <span className='text-black ml-2'>Username</span>
            <input
              type="text"
              {...register("userName")}
              placeholder="Enter you name"
              className="w-full mt-1 p-2 rounded-md outline-none text-black"
            />
          </div>
          <div>

            <span className='text-black ml-2'>Password</span>
            <input
              placeholder="Enter your password"
              className="w-full mt-1 p-2 rounded-md outline-none text-black"
              type='password'
              {...register("password")}
            />
            <button className="mt-4 px-4 py-2 bg-blue-500 w-full text-white rounded-md" type="submit">
              Register
            </button>
          </div>
          <p className='text-black text-sm'>Already have an account ? <Link to={'/login'}><button className='text-blue-500'>Login</button></Link></p>
        </form>
      </div>
    )
  )
}

export default Signup