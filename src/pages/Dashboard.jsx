import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {

    const { loading: authLoading } = useSelector((state) => state.auth)
    const { loading: profileLoading } = useSelector((state) => state.profile)

    if (authLoading || profileLoading) {
        return (
            <div className='h-screen w-screen flex justify-center items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">

            <Sidebar/>

            <div className="h-[calc(100vh-3.5rem)] overflow-auto">
                <div>
                    <Outlet/>
                </div>
            </div>

        </div>
    )
}