import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserImg from "../../../../assets/images/header/user.jpg";
import companyimage from "../../../../assets/images/ServiceProvider/company3.jpg";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

function VacancyDetails() {
  const [viewVacancyData, setviewVacancyData] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (Data) => {
    setModalData(Data);
    setShow(true); // Show the modal
  };


  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const vacancyId = parseInt(id, 10);

  // GETTING LOGGED IN SERVICEPROVIDER ID
  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/viewNewVacancies/${vacancyId}`).then((res) => {
      console.log(res.data);
      setviewVacancyData(res.data);
    });
  }, []);

  if (!viewVacancyData) return 'No Vacancy found!';

  const handleCompleteVacancy = (vacancyId) => {
    const apiUrl = `http://localhost:8080/auth/updateVacancyStatusOngoingToCompleted/${vacancyId}?serviceproviderid=${userData.userid}`;
    axios.put(apiUrl)
      .then((res) => {
          console.log(res.data); // Log the API response
          handleBackClick();
      })
  };

  return (
    <Row className="vacancyDetails-Col-container">
      <Col className="vacancyDetails-img-container col-12 col-lg-2 d-flex flex-column align-items-center">
        <div className="vacancyDetails-avatar-container mb-2">
          <img
            src={'data:image/jpeg;base64;' + viewVacancyData.customer.profilePic}
            alt="avatar"
            className="vacancyDetails-avatar rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div
          className="vacancyDetails-username mb-1"
          style={{ fontSize: "18px", fontFamily: "'Rubik', sans-serif" }}
        >
          {viewVacancyData.customer.firstname}
        </div>
        <div className="d-flex flex-row">
          <div className="me-3">
            <a href={`tel:${viewVacancyData.customer.phonenumber}`}>
              <i className="bi bi-telephone-fill" style={{color:"black"}}></i>
            </a>
          </div>
          <div>
            <Link to="/ServiceProvider/Chat">
              <i className="bi bi-chat-fill" style={{color:"black"}}></i>
            </Link>
          </div>
        </div>
      </Col>

      <Col className="vacancyDetails-details-container col-12 col-lg-10 d-flex flex-column">
        <div className="vacancyDetails-status-container mb-2">
          <span className="vacancyDetails-status me-2" id="vacancy-status" style={{ fontSize: "16px", fontWeight: "400", padding: "4px 6px", border: "2px solid rgb(37, 199, 37)", borderRadius: "8px" }}>
            ongoing
          </span>
          <span className="vacancyDetails-status" id="vacancy-status" style={{ fontSize: "16px", fontWeight: "400", padding: "4px 6px", border: "2px solid rgb(37, 199, 37)", borderRadius: "8px" }}>
            {viewVacancyData.vacancytype}
          </span>
        </div>
        <div className="vacancyDetails-title-container mb-2">
          <span className="back-button-service-provider" onClick={handleBackClick} style={{ marginRight:'50px', marginTop:'-40px', maxWidth: '110px', fontWeight:600, float:'right' }}>
              <i className="bi bi-arrow-left-circle-fill fs-3"></i>
              <p className="m-0 p-0 fs-5">&nbsp; Back</p>
          </span>
          <span className="jobDetails-title" style={{ fontWeight: "650" }}>{viewVacancyData.vacancytitle}</span>
        </div>
        <div className="vacancyDetails-category-container mb-2 d-flex flex-column">
          <span className="jobDetails-category" style={{ fontWeight: "650" }}>Category</span>
          <span className="jobDetails-category-value">{viewVacancyData.servicename}</span>
        </div>
        <div className="vacancyDetails-location-container mb-2 d-flex flex-column">
          <span className="jobDetails-location" style={{ fontWeight: "650" }}>Location</span>
          <span className="jobDetails-location-value">{viewVacancyData.vacancylocation}</span>
        </div>
        <div className="vacancyDetails-dueDate-container mb-2 d-flex flex-row">
          <div>
            <span className="vacancyDetails-dueDate" style={{ fontWeight: "650" }}>Due Date</span>
            <br />
            <span className="vacancyDetails-dueDate-value">{viewVacancyData.duedate}</span>
          </div>
          <div className="mx-4">
            <span className="vacancyDetails-posted" style={{ fontWeight: "650" }}>Posted</span>
            <br />
            <span className="vacancyDetails-posted-value">{viewVacancyData.posteddate}</span>
          </div>
        </div>
        <div className="vacancyDetails-skills-container d-flex flex-column mb-2">
          <span className="vacancyDetails-skills" style={{ fontWeight: "650" }}>Skills & Qualifications</span>
          <span className="vacancyDetails-skills-value">
            {viewVacancyData.qualifications}
          </span>
        </div>
        <div className="vacancyDetails-responsibility-container d-flex flex-column mb-2">
          <span className="vacancyDetails-responsibility" style={{ fontWeight: "650" }}>Responsibilities</span>
          <span className="vacancyDetails-responsibility-value">
            {viewVacancyData.responsibilities}
          </span>
        </div>
        <div className="vacancyDetails-place-container d-flex flex-column mb-2">
          <span className="vacancyDetails-place-value text-success" style={{ fontWeight: "650", fontSize: "19px" }}>
            {viewVacancyData.address}
          </span>
        </div>
        <hr />
        <div className="AcceptedJobDetails-button-container mt-2 d-flex flex-row">         
            <Button className="btn-ServiceProvider-2 AcceptedJobDetails-start ms-auto" onClick={() => handleShow(viewVacancyData)}>Completed</Button>
        </div>
      </Col>

    {/* Modal for Vacancy Completion Confirmation */}
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
        <Modal.Title>Confirm Vacancy Completion</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          To mark the completion of your ongoing vacancy on Service360, please proceed with the final confirmation.
          Kindly note that this action cannot be reversed once completed.
        </p>
        <Form>
          <>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Group className="mb-3" controlId="sessionTitle">
                <Form.Label>Vacancy Title</Form.Label>
                <Form.Control type="text" value={modalData ? modalData.vacancytitle : ''} readOnly />
              </Form.Group>

              <Form.Group className="mb-3" controlId="paymentConfirmation">
                <Form.Check
                  type="checkbox"
                  label="I confirm that I want to mark this vacancy as completed."
                />
              </Form.Group>
            </Form.Group>
          </>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn-ServiceProvider-1"
            onClick={()=>{
              if(modalData) {
                console.log("Handling complete vacancy for vacancy ID:", modalData.vacancyid);
                handleCompleteVacancy(modalData.vacancyid)
              }
            }}
          >
            Confirm Completion
          </Button>
      </Modal.Footer>
    </Modal>
    </Row>
  );
}

export default VacancyDetails;
