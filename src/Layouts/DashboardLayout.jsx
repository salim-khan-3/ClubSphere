import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../dashboard/Shared/Sidebar/Sidebar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className='max-w-7xl flex items-start gap-4 mx-auto px-4 md:px-8'>
                
                <div className="flex-1"><Sidebar ></Sidebar></div>
                <div className='w-full col-span-4'>
                    <Outlet></Outlet>
                </div>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;