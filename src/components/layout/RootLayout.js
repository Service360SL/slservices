import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader1 from './header';
import AppFooter from './footer';
import '../../style/Home.css'

const RootLayout = () => {
    return (
        <>
            <AppHeader1 />
            <main id="home">
                <Outlet />
            </main>
            <AppFooter />
        </>
    )
}

export default RootLayout