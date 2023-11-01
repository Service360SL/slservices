import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserImg from "../../../assets/images/header/user.jpg";
import SofaCleaning from "../../../assets/images/Customer/SofaCleaning.jpg";
import SofaCleaning2 from "../../../assets/images/Customer/SofaCleaning2.jpg";
import SofaCleaning3 from "../../../assets/images/Customer/SofaCleaning3.jpeg";
import SofaCleaning4 from "../../../assets/images/Customer/SofaCleaning4.jpeg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ViewPostedJobs2 from "./ViewPostedJobs2";
import axios from "axios";

function ViewPostedJobs1() {
  const [job, setJob] = useState({});
  const jobId = window.location.pathname.split("/").pop(); // Get the job ID from the URL
  useEffect(() => {
    // Fetch job details by ID from the backend
    axios
      .get(`http://localhost:8080/auth/viewjobs/${jobId}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [jobId]);

  return (
    
    <Row className="JobDetails-Col-container">
      <Col className="jobDetails-img-container col-12 col-lg-2 d-flex flex-column align-items-center">
        <div className="jobDetails-avatar-container mb-2">

        </div>
        <div
          className="jobDetails-username mb-1"
          style={{ fontSize: "18px", fontFamily: "'Rubik', sans-serif" }}
        >
        </div>

      </Col>
      <Col className="jobDetails-details-container col-12 col-lg-10 d-flex flex-column">
        <div className="jobDetails-status-container mb-2">

        </div>
        <div className="jobDetails-title-container mb-2">
          <span className="jobDetails-title" style={{ fontWeight: "650" }}>{job.jobtitle}</span>
        </div>
        <div className="jobDetails-category-container mb-2 d-flex flex-column">
          <span className="jobDetails-category" style={{ fontWeight: "650" }}>Category</span>
          <span className="jobDetails-category-value">{job.servicename}</span>
        </div>
        <div className="jobDetails-location-container mb-2 d-flex flex-column">
          <span className="jobDetails-location" style={{ fontWeight: "650" }}>Location</span>
          <span className="jobDetails-location-value">{job.joblocation}</span>
        </div>
        <div className="jobDetails-dueDate-container mb-2 d-flex flex-row">
          <div>
            <span className="jobDetails-dueDate" style={{ fontWeight: "650" }}>Due Date</span>
            <br />
            <span className="jobDetails-dueDate-value">{job.duedate}</span>
          </div>
          <div className="mx-4">
            <span className="jobDetails-posted" style={{ fontWeight: "650" }}>Posted</span>
            <br />
            <span className="jobDetails-posted-value">{job.posteddate}</span>
          </div>
        </div>
        <div className="jobDetails-description-container d-flex flex-column mb-2">
          <span className="jobDetails-description" style={{ fontWeight: "650" }}>Description</span>
          <span className="jobDetails-description-value">
            {job.jobdescription}
          </span>
        </div>
        <div className="jobDetails-images-container">
          <span className="jobDetails-images" style={{ fontWeight: "650" }}>Images</span>
          <div className="jobDetails-images-container-box row mt-2">
            {job.images && job.images.map((image, index) => (
              <div key={index} className="col-6 col-md-4 col-lg-3">
                <img
                  src={image}
                  alt={`job detail image ${index}`}
                  className="jobDetails-images-value-img"
                />
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ViewPostedJobs1;