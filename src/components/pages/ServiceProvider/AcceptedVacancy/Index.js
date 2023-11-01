import React from 'react';
import VacancyDetails from './VacancyDetails';
import "../../../../style/ServiceProvider/AcceptedVacancy.css";

function Index() {
  return (
    <div className='index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
      <VacancyDetails />
    </div>
  );
}

export default Index;