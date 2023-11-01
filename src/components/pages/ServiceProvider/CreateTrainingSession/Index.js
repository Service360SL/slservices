import React from 'react';
import CreateSessionForm from './CreateSessionForm';
import '../../../../style/ServiceProvider/CreateTrainingSession.css';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <CreateSessionForm />
        </div>
    );
}

export default Index;