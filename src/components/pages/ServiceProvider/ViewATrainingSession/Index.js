import React from "react";
import TrainingDetails from "./trainingDetails";
import "../../../../style/ServiceProvider/ViewATrainingSession.css";

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 border rounded px-md-5 px-sm-3 px-2 pb-4">
            <TrainingDetails />
        </div>
    );
}

export default Index;