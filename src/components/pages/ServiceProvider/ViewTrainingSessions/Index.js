import React from "react";
import SessionsBodyPage from './sessionsBodyPage';
import '../../../../style/ServiceProvider/ViewTrainingSessions.css';

function Index() {
    return (
        <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <SessionsBodyPage />
        </div>
    );
}

export default Index;