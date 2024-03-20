import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { login } from "../../store/reducers/authSlice.js"
import { LogIn } from '../../utils/FetchData.js';
import Loader from '../Loader.jsx';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setloading] = useState(false)

  const submithandler = async (data) => {
    setloading(true)
    const res = await LogIn(data);
    if (res) {
      dispatch(login(res.data.user));
      navigate('/dashboard');
      setloading(false)
    }
  };

  return (
    loading ? (
      <Loader />
    ) : (
      <div className='w-[100vw] h-[100vh] signup flex  item-center justify-center' >
        <form onSubmit={handleSubmit(submithandler)} className="bg-gray-200 rounded-lg flex w-[40vw] flex-col gap-4 my-auto p-4">
          <span className='text-xl text-center text-black font-bold'>Welcome Back !</span>
          <div>
            <span className='text-black ml-2'>Email</span>
            <input
              type="email"
              placeholder="name@gmail.com"
              className="w-full mt-2 p-2 rounded-md outline-none text-black"
              {...register("userEmail")}
            />
          </div>

          <div>
            <span className='text-black ml-2'>Password</span>
            <input
              placeholder="Enter your password"
              type="password"
              className="w-full mt-2 p-2 rounded-md outline-none text-black"
              {...register("password")}
            />
            <div className='flex flex-col'>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" type="submit">
                Login
              </button>
            </div>

          </div>
          <p className='text-sm text-black'>Doesn't have an account ? <Link to={'/'}><button className='text-blue-500'>Sign Up</button></Link></p>
        </form>
      </div>
    )
  )
}

export default Login