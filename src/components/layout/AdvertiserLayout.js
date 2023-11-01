import React from 'react'
import { Outlet } from 'react-router-dom'
import AdvertiserHeader from './AdvertiserHeader';
import AdvertiserSidebar from './AdvertiserSidebar';
import AppFooter from './footer';
import "../../style/ServiceProvider/SpLayout.css";
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider';

const AdvertiserLayout = () => {
  return (
    <>
      <AuthenticationContextProvider>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", }}>
          <AdvertiserHeader />
          <div style={{ display: 'flex', flex: 1 }}>
            <AdvertiserSidebar />
            <div className="classoutlet" style={{ flex: 1, overflow: 'auto' }}>
              <Outlet />
            </div>
          </div>
          <AppFooter />
        </div>
      </AuthenticationContextProvider>
    </>
  );
}

export default AdvertiserLayout