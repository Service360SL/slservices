import React from 'react';
import JobDetails from './JobDetails.js';
import '../../../../style/ServiceProvider/AcceptedJob.css';

function Index() {
    return (
        <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <JobDetails />
        </div>
    );
}

export default Index;