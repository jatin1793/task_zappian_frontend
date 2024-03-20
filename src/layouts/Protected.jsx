import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import DefaultLayout from './DefaultLayout'

export default function Protected() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.status);
    console.log(authStatus)

    //  useEffect(() => {
    //     if (!authStatus) { 
    //         navigate("/login");
    //     }
    // }, [authStatus]);

    return (
        // <div>
        //     {authStatus ? (
        //         <Navigate to="/" />
        //     ) : (
        //         <Outlet />
        //     )
        //     }
        //     {/* {authStatus ? (
        //         <Outlet />
        //     ) : (
        //         <Navigate to="/login" />
        //     )} */}

        // </div >
        <div>
            {children}
        </div>
    )
}
