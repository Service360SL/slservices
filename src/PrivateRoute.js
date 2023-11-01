import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthenticationContext } from './ContextFiles/Authentication/AuthenticationContextProvider';

const PrivateRoute = ({ redirectPath = '/login', children }) => {
    const { logout } = useContext(AuthenticationContext);
    const authenticated = localStorage.getItem('authenticated');
    const location = useLocation();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        if (authenticated) {
            const handleBeforeUnload = (e) => {
                if (showConfirmDialog) {
                    e.preventDefault();
                    e.returnValue = 'You have unsaved changes. Are you sure you want to leave this page?';
                }
            };

            window.addEventListener('beforeunload', handleBeforeUnload);

            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
    }, [authenticated, showConfirmDialog]);

    const handleLogout = () => {
        logout();
        return <Navigate to={redirectPath} />;
    };

    const handleCancel = () => {
        setShowConfirmDialog(false);
        window.removeEventListener('beforeunload', () => { });
    };

    if (!authenticated) {
        return <Navigate to={redirectPath} />;
    }

    const handleConfirm = () => {
        setShowConfirmDialog(true);
    };

    return (
        <>
            {children ? children : <Outlet />}
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={handleConfirm}>Leave Page</button>
            {showConfirmDialog && (
                <div className="confirm-dialog">
                    <p>Are you sure you want to leave this page?</p>
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </>
    );
};

export default PrivateRoute;
