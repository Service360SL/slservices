import React from 'react';
import JobsBodyPage from './jobsBodyPage.js';
import '../../../../style/ServiceProvider/ViewJobs.css'

function Index() {

    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <JobsBodyPage />
        </div>
    );
}

export default Index;