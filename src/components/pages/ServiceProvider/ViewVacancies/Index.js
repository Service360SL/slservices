import React from 'react';
import VacanciesBodyPage from './vacanciesBodyPage.js';
import '../../../../style/ServiceProvider/ViewVacancies.css'

function Index() {
    return (
        <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <VacanciesBodyPage />
        </div>
    );
}

export default Index;