import React from 'react';
import "../../../../style/ServiceProvider/AddNewServices.css";
import AddServiceForm from './AddServiceForm';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <AddServiceForm />
        </div>
    );
}

export default Index;