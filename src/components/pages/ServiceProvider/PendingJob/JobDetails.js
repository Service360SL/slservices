import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function PendingJobDetails() {
    const [viewJobData, setViewJobData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate(-1);
    };

    const { id } = useParams();
    const jobId = parseInt(id, 10);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewNewJobs/${jobId}`).then((res) => {
            console.log(res.data);
            setViewJobData(res.data);
        });
    }, []);

    if (!viewJobData) return 'No jobs found!';

    const handleAddQuotation = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        axios.put(`http://localhost:8080/auth/addQuotationPdf/${jobId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res.data);
            document.getElementById('fileInput').value = '';
            showAlertWithMessage('The quotation has been successfully sent to the customer!');
        });
    };

    // Get all images from the job
    const jobImagesArray = viewJobData.jobimages;
        
    // Initialize an empty array to store all images
    const allImages = [];

    // Iterate through trainingSessionImagesArray
    jobImagesArray.forEach((sessionImages) => {
        // Check if the current object has an 'images' property
        if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
            // Concatenate the 'images' array to the 'allImages' array
            allImages.push(...sessionImages.images);
        }
    });

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
            setSelectedFile(selectedFile);
        }
    };

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
          }, 4000);
      };

    return (
        <div>
            <Row className="AcceptedJobDetails-Col-container mb-4">
                <Col className="AcceptedJobDetails-img-container col-12 col-lg-2 d-flex flex-column align-items-center">
                    <div className="AcceptedJobDetails-avatar-container mb-2">
                        <img
                            src={'data:image/jpeg;base64;' + viewJobData.jobs.customer.profilePic}
                            alt="avatar"
                            className="AcceptedJobDetails-avatar rounded-circle"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </div>
                    <div
                        className="AcceptedJobDetails-username mb-1"
                        style={{ fontSize: "18px", fontFamily: "'Rubik', sans-serif" }}
                    >
                        {viewJobData.jobs.customer.firstname}
                    </div>
                </Col>

                <Col className="AcceptedJobDetails-details-container mt-lg-0 mt-2 col-12 col-lg-10 d-flex flex-column">
                    <div className="vacancyDetails-status-container mb-2">
                        <span className="vacancyDetails-status me-2" id="vacancy-status" style={{ fontSize: "16px", fontWeight: "400", padding: "4px 6px", border: "2px solid rgb(37, 199, 37)", borderRadius: "8px" }}>
                            pending
                        </span>
                    </div>
                    <div className="AcceptedJobDetails-title-container mb-2">
                        <span className="back-button-service-provider" onClick={handleBackClick} style={{ marginRight:'50px', marginTop:'-40px', maxWidth: '110px', fontWeight:600, float:'right' }}>
                            <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                            <p className="m-0 p-0 fs-5">&nbsp; Back</p>
                        </span>
                        <span className="AcceptedJobDetails-title" style={{ fontWeight: "650" }}>{viewJobData.jobs.jobtitle}</span>
                    </div>
                    <div className="AcceptedJobDetails-category-container mb-2 d-flex flex-column">
                        <span className="AcceptedJobDetails-category" style={{ fontWeight: "650" }}>Category</span>
                        <span className="AcceptedJobDetails-category-value">{viewJobData.jobs.servicename}</span>
                    </div>
                    <div className="AcceptedJobDetails-location-container mb-2 d-flex flex-column">
                        <span className="AcceptedJobDetails-location" style={{ fontWeight: "650" }}>Location</span>
                        <span className="AcceptedJobDetails-location-value">{viewJobData.jobs.joblocation}</span>
                    </div>
                    <div className="AcceptedJobDetails-dueDate-container mb-2 d-flex flex-row">
                        <div>
                            <span className="AcceptedJobDetails-dueDate" style={{ fontWeight: "650" }}>Due Date</span>
                            <br />
                            <span className="AcceptedJobDetails-dueDate-value">{viewJobData.jobs.duedate}</span>
                        </div>
                        <div className="mx-4">
                            <span className="AcceptedJobDetails-posted" style={{ fontWeight: "650" }}>Posted</span>
                            <br />
                            <span className="AcceptedJobDetails-posted-value">{viewJobData.jobs.posteddate}</span>
                        </div>
                    </div>
                    <div className="AcceptedJobDetails-description-container d-flex flex-column mb-2">
                        <span className="AcceptedJobDetails-description" style={{ fontWeight: "650" }}>Description</span>
                        <span className="AcceptedJobDetails-description-value">
                            {viewJobData.jobs.jobdescription}
                        </span>
                    </div>
                    <div className="AcceptedJobDetails-images-container">
                        <span className="AcceptedJobDetails-images" style={{ fontWeight: "650" }}>Images</span>
                        <div className="AcceptedJobDetails-images-container-box row mt-2">
                        {allImages.map((image) => (
                            <div className="col-6 col-md-4 col-lg-3">
                            <img
                                src={`data:image/jpg;base64,${image}`}
                                alt={'job detail image'}
                                className="jobDetails-images-value-img"
                            />
                            </div>
                        ))}
                        </div>
                    </div>
                </Col>
            </Row><hr/>
            <span>Quotation</span>
            <div className="mt-2 d-flex flex-column">
                <div className="text-muted d-block mb-3">
                    You can create quotation using our website or visit the <a href="https://vyaparapp.in/tools/free-online-quotation-maker#generate-online">quotation website</a> to create a quotation.
                </div>
                <Link to={`../CreateQuotation/${jobId}`}>
                    <Button className="btn-ServiceProvider-2 AcceptedJobDetails-start" variant="primary" type="submit">
                        Create Quotation
                    </Button>
                </Link><hr/>

                <Form>
                    <div className="d-block mb-3">
                        Upload Quotation
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Control type="file" placeholder="Choose Quotation" id="fileInput" onChange={handleFileInputChange}/>
                    </Form.Group>
                    <div className="CreateBlog-button-container d-flex flex-row d-flex">
                        <Button className="ms-auto btn-ServiceProvider-1" onClick={handleAddQuotation}>Submit</Button>
                    </div>
                </Form>
            </div>

            <Alert
                show={showAlert}
                    variant="info"
                    onClose={() => setShowAlert(false)}
                    dismissible
                    style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999, // Adjust the z-index as needed
                    }}
                >
                {alertMessage}
            </Alert>
        </div>
    );
}

export default PendingJobDetails;