import React, { useEffect, useState } from 'react'
import { Get_all_users } from '../utils/FetchData'
import { Link } from 'react-router-dom';
import { IoAdd } from "react-icons/io5";
import { Add_user } from '../utils/FetchData'
import { useForm } from 'react-hook-form';
import Loader from '../components/Loader'
const Users = () => {
    const [loading, setloading] = useState(false)
    const [users, setusers] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm()

    const submithandler = async (data) => {
        setloading(true)
        const res = await Add_user(data);
        setIsOpen(false)
        await getUsers();
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getUsers = async () => {
        setloading(true);
        const res = await Get_all_users();
        if (res) {
            setusers(res.data);
            setloading(false)
        }
        else {
            setloading(false)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        loading ? (
            <Loader />
        ) : (
            <div className='w-full h-full'>
                <div className='w-full flex justify-between items-center'>
                    <span className='font-semibold text-2xl'>Users</span>
                    <button onClick={openModal} className='py-2 px-3 flex gap-2 items-center text-white rounded-lg bg-blue-500'>
                        <IoAdd />
                        <span>Add user</span>
                    </button>
                </div>

                <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100  dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                Edit
                            </th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {users && users.reverse().map((user) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <Link to={`/user/${user._id}`} className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <th scope="row" className="flex items-center">
                                            <div className="h-12 w-12 rounded-full border border-1 border-gray-300 object-cover items-center flex justify-center">
                                                {user.userName.split("")[0].toUpperCase()}
                                            </div>
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{user.userName}</div>
                                                <div className="font-normal text-gray-500">{user.userEmail}</div>
                                            </div>
                                        </th>
                                    </Link>
                                    <td className="px-6 py-4">
                                        {user.userName}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.userEmail}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <form onSubmit={handleSubmit(submithandler)}>
                                <div className="modal-content">
                                    <p className='font-semibold text-xl mb-2'>Add new user</p>
                                    <div className='py-4 flex flex-col gap-2'>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm'>Email</span>
                                            <input type="email" name='userEmail' className='py-1 px-2 outline-none rounded-md border-1 border-gray-400'
                                                {...register("userEmail")}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm'>Username</span>
                                            <input type="text" name='userName' className='py-1 px-2 outline-none rounded-md border-1 border-gray-400'
                                                {...register("userName")}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <span className='text-sm'>Password</span>
                                            <input type="password" name='password' className='py-1 px-2 outline-none rounded-md border-1 border-gray-400'
                                                {...register("password")}
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-4 flex gap-2'>
                                        <button type='submit' className='p-2 bg-blue-600 text-white rounded-lg'>Add</button>
                                        <button onClick={closeModal} className='p-2 bg-red-600 text-white rounded-lg'>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        )
    )
}

export default Users