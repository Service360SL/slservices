import React from 'react';
import MyVacanciesBody from './MyVacanciesBody';
import '../../../../style/ServiceProvider/MyProjectsVacancies.css';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <MyVacanciesBody />
        </div>
    );
}

export default Index;