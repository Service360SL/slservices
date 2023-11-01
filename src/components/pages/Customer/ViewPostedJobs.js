import React from 'react';
import '../../../style/ServiceProvider/ViewAJob.css';
import ViewPostedJobs1 from './ViewPostedJobs1.js';
import ViewPostedJobs2 from './ViewPostedJobs2.js';
function ViewPostedJobs() {
    return (
        <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <ViewPostedJobs1 />
            <ViewPostedJobs2 />
        </div>
    );
}

export default ViewPostedJobs;