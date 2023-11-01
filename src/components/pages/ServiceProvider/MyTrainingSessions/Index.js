import React from 'react';
import SessionsTable from './SessionsTable.js';
import '../../../../style/ServiceProvider/MyTrainingSessions.css';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <SessionsTable />
        </div>
    );
}

export default Index;