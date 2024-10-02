import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function AdminLayout(props) {
    return (
        <div className='flex min-h-screen w-full'>

            {/* admin sidebar */}
            <Sidebar />
            <div className="flex flex-1 flex-col">

                {/* admin header */}
                <Header />

                <main className='flex-1 flex bg-amber-100 p-4 md:p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;