import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/reducers/authSlice.js';
import { Get_current_user } from './utils/FetchData.js'
import DefaultLayout from './layouts/DefaultLayout.jsx'
import LoginPage from './components/auth/Login.jsx'
import SignupPage from './components/auth/Signup.jsx'
import HomePage from './components/HomePage.jsx'
import Protected from './layouts/Protected.jsx';
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import MyAccount from './components/MyAccount.jsx';

function App() {

  const dispatch = useDispatch();

  const getuser = async () => {
    const user = await Get_current_user();
    if (user) {
      dispatch(login(user.data[0]))
    }
  }

  useEffect(() => {
    getuser();
  }, [])

  return (
    <>
      <Routes>

        <Route path='/login' element={
          <LoginPage />
        }></Route>

        <Route path='/' element={
          <SignupPage />
        }></Route>

        <Route path='/dashboard' element={
          <DefaultLayout>
            <Users />
          </DefaultLayout>
        }></Route>

        <Route path='/my-account' element={
          <DefaultLayout>
            <MyAccount />
          </DefaultLayout>
        }></Route>

        <Route path='/user/:userid' element={
          <DefaultLayout>
            <User />
          </DefaultLayout>
        }></Route>

      </Routes>
      <Toaster />
    </>
  )
}

export default App
