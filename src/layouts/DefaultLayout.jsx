import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default function Protected({ children }) {

    // useEffect(() => {
    //     console.log("called")
    // })

    return (
        <div>
            <div className="flex w-screen h-screen">
                <div>
                    <Sidebar />
                </div>
                <div className="flex flex-col w-full h-full">
                    <div className="w-full h-16 border-1 border-gray"></div>
                    <div className="p-6 h-full overflow-y-auto mb-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
