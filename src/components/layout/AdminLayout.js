import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AppFooter from './footer';
import AdminSidebar from './AdminSidebar';
import '../../style/ServiceProvider/SpLayout.css';
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider';

const AdminLayout = () => {
    return (
        <>
            <AuthenticationContextProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <AdminHeader />
                    <div style={{ display: 'flex', flex: 1 }}>
                        <AdminSidebar />
                        <div className="classoutlet" style={{ flex: 1, overflow: 'auto' }}>
                            <Outlet />
                        </div>
                    </div>
                    <AppFooter />
                </div>
            </AuthenticationContextProvider>
        </>
    );
};

export default AdminLayout;