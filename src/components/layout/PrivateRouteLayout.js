import React, { useContext } from 'react';
import '../../style/ServiceProvider/SpLayout.css';
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider';
import PrivateRoute from '../../PrivateRoute';

const PrivateRouteLayout = () => {
    return (
        <>
            <AuthenticationContextProvider>
                <PrivateRoute />
            </AuthenticationContextProvider>
        </>
    );
};

export default PrivateRouteLayout;