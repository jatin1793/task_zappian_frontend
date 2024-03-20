import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useContext, createContext, useState } from "react"
import { logout } from '../../store/reducers/authSlice'
import { LogOut } from '../../utils/FetchData'
import { MdArrowBackIosNew } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdArrowForwardIos } from "react-icons/md";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.userData);
  console.log(userData);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const LogoutHandler = async () => {
    const response = await LogOut();
    if (response) {
      dispatch(logout());
      localStorage.removeItem("jwt_token");
      navigate("/login");
    }
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
              }`}
          >
            App Name
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
          </button>
        </div>

        <div className="border-t flex p-3 mb-6">
          <div className="h-12 w-12 rounded-full border border-1 border-gray-300 object-cover mx-auto flex items-center justify-center">
            {userData?.userName.split("")[0].toUpperCase()}
          </div>
          <div
            className={`
                  flex justify-between items-center
                  overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
              `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{userData?.userName}</h4>
              <span className="text-xs text-gray-600">{userData?.userEmail}</span>
            </div>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <li
          onClick={openModal}
          className={`
              relative flex items-center py-2 px-3 my-1 mx-3 mb-4
              font-medium rounded-md cursor-pointer
              transition-colors group hover:bg-indigo-50 text-gray-600"
          `}
        >
          <CiLogout />
          <span
            className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
              }`}
          >
            Log Out
          </span>

          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[9999]
            `}
            >
              Log Out
            </div>
          )}
        </li>

      </nav>
      {isOpen && (
        <div className="modal-overlay z-[9999]">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-content">
              <p className='font-semibold text-xl mb-2'>Log out account</p>
              <p className='font-normal'>Are you sure you want to log out this account?</p>
              <div className='mt-4 flex gap-2'>
                <button onClick={LogoutHandler} className='p-2 bg-blue-600 text-white rounded-lg'>Log out</button>
                <button onClick={closeModal} className='p-2 bg-red-600 text-white rounded-lg'>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export function SidebarItem({ icon, text, url }: { icon: React.ReactNode, text: string, url: string }) {

  const { expanded } = useContext(SidebarContext) as { expanded: any };


  return (
    <Link to={url}>
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group hover:bg-indigo-50 text-gray-600"
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
          {text}
        </span>


        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[9999]
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  )
}




