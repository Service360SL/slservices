import React from 'react';
import HistoryTable from './HistoryTable.js';
import '../../../../style/ServiceProvider/ViewHistory.css';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <HistoryTable />
        </div>
    );
}

export default Index;