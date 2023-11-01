import React from 'react';
import Cards from './cards.js';
import Analysis from './AnalysisSp.js'
import Overview from './overview.js';

function Index() {
    return (
        <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <Overview />
            <Analysis />
            <Cards />
        </div>
    );
}

export default Index;