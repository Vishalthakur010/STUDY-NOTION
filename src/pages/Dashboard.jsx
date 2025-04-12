import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/core/Dashboard/Sidebar";

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
        <div className="relative flex h-[calc(100vh-3.5rem)] bg-richblack-600 overflow-hidden">

            <Sidebar/>

            <div className="w-full bg-richblack-900 overflow-y-auto">
                <Outlet/>
            </div>

        </div>
    )
}