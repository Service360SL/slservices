import React from "react";
import SpCalendar from "./SpCalendar";
import '../../../../style/ServiceProvider/AvailabilityCalendar.css';

function Index() {
    return (
        <div className="index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded">
            <SpCalendar />
        </div>
    );
}

export default Index;