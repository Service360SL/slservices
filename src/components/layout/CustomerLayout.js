import React from 'react'
import { Outlet } from 'react-router-dom'
import AppFooter from './footer';
import CustomerSideBar from './CustomerSidebar';
import CustomerHeader from './CustomerHeader';
import '../../style/ServiceProvider/SpLayout.css';
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider';


const CustomerLayout = () => {
    return (
        <>
            <AuthenticationContextProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <CustomerHeader />
                    <div style={{ flex: 1, display: 'flex' }}>
                        <CustomerSideBar />
                        <div className="classoutlet" style={{ flex: 1 }}>
                            <Outlet />
                        </div>
                    </div>
                    <AppFooter />
                </div>
            </AuthenticationContextProvider>

        </>
    )
}

export default CustomerLayout