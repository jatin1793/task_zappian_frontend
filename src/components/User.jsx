import React, { useEffect, useState } from 'react'
import { Get_user, Delete_user, Update_user } from '../utils/FetchData'
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loader from './Loader';

const User = () => {
  const [loading, setloading] = useState(false)
  const { userid } = useParams();
  const navigate = useNavigate();
  const [user, setuser] = useState('')

  const getUser = async () => {
    setloading(true)
    const res = await Get_user({ userid: userid });
    console.log(res.data[0])
    if (res) {
      setuser(res.data[0]);
      setloading(false)
    }
  }

  const deleteHandler = async (id) => {
    setloading(true)
    const res = await Delete_user({ userid: id })
    setIsDelOpen(false);
    await navigate('/dashboard')
    if (res) setloading(false)
  }

  useEffect(() => {
    getUser();
  }, [])

  const [formData, setFormData] = useState({
    userName: user.userName,
    userEmail: user.userEmail
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      setloading(true)
      const res = await Update_user({ userId: user._id, ...formData });
      setIsEditOpen(false);
      await getUser();
    } catch (error) {
      console.error('Error updating user:', error);
      setloading(false)
    }
  };

  const [isDelOpen, setIsDelOpen] = useState(false);

  const openDelModal = () => {
    setIsDelOpen(true);
  };

  const closeDelModal = () => {
    setIsDelOpen(false);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  return (
    loading ? (
      <Loader />
    ) : (
      <div>
        <div className="flex w-max flex-col gap-6 mb-4 border border-gray rounded-lg p-8">
          <div className='flex'>
            <div className="h-12 w-12 rounded-full border border-1 border-gray-300 object-cover flex items-center justify-center">
              {user?.userName?.split('')[0].toUpperCase()}
            </div>

            <div className='flex flex-col gap-6'>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user?.userName}</h2>
                <p className="text-gray-500">{user?.userEmail}</p>
              </div>

              {user.createdAt && (
                <div className='ml-4 flex gap-1'>
                  <p className='text-gray-500'>Created at </p>
                  <p className='text-gray-500'>
                    {new Date(user.createdAt).toLocaleDateString()}  {new Date(user.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              )}

              <div className="flex gap-6">
                <button onClick={openEditModal} className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 flex gap-2 items-center"><FaUserEdit /><span>Edit user</span></button>
                <button onClick={openDelModal} className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 flex gap-2 items-center"><MdDelete /><span>Delete user</span></button>
              </div>

              {isDelOpen && (
                <div className="modal-overlay">
                  <div className="modal">
                    <span className="close" onClick={closeDelModal}>
                      &times;
                    </span>
                    <div className="modal-content">
                      <p className='font-semibold text-xl mb-2'>Delete user</p>
                      <p className='font-normal'>Are you sure you want to delete this user?</p>
                      <div className='mt-4 flex gap-2'>
                        <button onClick={() => deleteHandler(user._id)} className='p-2 bg-blue-600 text-white rounded-lg'>Delete</button>
                        <button onClick={closeDelModal} className='p-2 bg-red-600 text-white rounded-lg'>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isEditOpen && (
                // <div className="modal-overlay">
                //   <div className="modal">
                //     <span className="close" onClick={closeEditModal}>
                //       &times;
                //     </span>
                //     <div className="modal-content">
                //       <p className='font-semibold text-xl mb-2'>Edit user</p>
                //       <div className='py-4 flex flex-col gap-2'>
                //         <div className='flex flex-col gap-1'>
                //           <span className='text-sm'>Email</span>
                //           <input type="email" name='userEmail' value={user.userEmail} className='py-1 px-2 outline-none rounded-md border-1 border-gray-400' />
                //         </div>
                //         <div className='flex flex-col gap-1'>
                //           <span className='text-sm'>Username</span>
                //           <input type="text" name='userName' value={user.userName} className='py-1 px-2 outline-none rounded-md border-1 border-gray-400' />
                //         </div>
                //       </div>
                //       <div className='mt-4 flex gap-2'>
                //         <button onClick={editHandler()} className='p-2 bg-blue-600 text-white rounded-lg'>Save</button>
                //         <button onClick={closeEditModal} className='p-2 bg-red-600 text-white rounded-lg'>Cancel</button>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                <div className="modal-overlay">
                  <div className="modal">
                    <span className="close" onClick={closeEditModal}>&times;</span>
                    <div className="modal-content">
                      <p className='font-semibold text-xl mb-2'>Edit user</p>
                      <div className='py-4 flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                          <span className='text-sm'>Email</span>
                          <input type="email" name='userEmail' value={formData.userEmail} onChange={handleChange} className='py-1 px-2 outline-none rounded-md border-1 border-gray-400' />
                        </div>
                        <div className='flex flex-col gap-1'>
                          <span className='text-sm'>Username</span>
                          <input type="text" name='userName' value={formData.userName} onChange={handleChange} className='py-1 px-2 outline-none rounded-md border-1 border-gray-400' />
                        </div>
                      </div>
                      <div className='mt-4 flex gap-2'>
                        <button onClick={handleSubmit} className='p-2 bg-blue-600 text-white rounded-lg'>Save</button>
                        <button onClick={closeEditModal} className='p-2 bg-red-600 text-white rounded-lg'>Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    )
  )
}

export default User