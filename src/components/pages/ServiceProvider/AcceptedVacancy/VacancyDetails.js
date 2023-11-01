import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserImg from "../../../../assets/images/header/user.jpg";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function VacancyDetails() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Row className="AcceptedvacancyDetails-Col-container mb-4">
                <Col className="AcceptedvacancyDetails-img-container col-12 col-lg-2 d-flex flex-column align-items-center">
                    <div className="AcceptedvacancyDetails-avatar-container mb-2">
                        <img
                            src={UserImg}
                            alt="avatar"
                            className="AcceptedvacancyDetails-avatar rounded-circle"
                            style={{ width: "50px", height: "50px" }}
                        />
                    </div>
                    <div
                        className="AcceptedvacancyDetails-username mb-1"
                        style={{ fontSize: "18px", fontFamily: "'Rubik', sans-serif" }}
                    >
                        Aptinex
                    </div>
                    <div className="d-flex flex-row">
                        <div className="me-3">
                            <i class="bi bi-telephone-fill"></i>
                        </div>
                        <div>
                            <i class="bi bi-chat-fill"></i>
                        </div>
                    </div>
                </Col>

                <Col className="AcceptedvacancyDetails-details-container col-12 col-lg-10 d-flex flex-column">
                    <div className="AcceptedvacancyDetails-status-container mb-2">
                        <span className="AcceptedvacancyDetails-status" id="vacancy-status" style={{ fontSize: "16px", fontWeight: "400", padding: "4px 6px", border: "2px solid rgb(37, 199, 37)", borderRadius: "8px" }}>
                            Full-time
                        </span>
                    </div>
                    <div className="AcceptedvacancyDetails-title-container mb-2">
                        <span className="AcceptedJobDetails-title" style={{ fontWeight: "650" }}>Electronics Technician</span>
                    </div>
                    <div className="AcceptedvacancyDetails-category-container mb-2 d-flex flex-column">
                        <span className="AcceptedJobDetails-category" style={{ fontWeight: "650" }}>Category</span>
                        <span className="AcceptedJobDetails-category-value">Electricians</span>
                    </div>
                    <div className="AcceptedvacancyDetails-location-container mb-2 d-flex flex-column">
                        <span className="AcceptedJobDetails-location" style={{ fontWeight: "650" }}>Location</span>
                        <span className="AcceptedJobDetails-location-value">Wellawatte</span>
                    </div>
                    <div className="AcceptedvacancyDetails-dueDate-container mb-2 d-flex flex-row">
                        <div>
                            <span className="AcceptedvacancyDetails-dueDate" style={{ fontWeight: "650" }}>Due Date</span>
                            <br />
                            <span className="AcceptedvacancyDetails-dueDate-value">Urgent</span>
                        </div>
                        <div className="mx-4">
                            <span className="AcceptedvacancyDetails-posted" style={{ fontWeight: "650" }}>Posted</span>
                            <br />
                            <span className="AcceptedvacancyDetails-posted-value">06-07-2023</span>
                        </div>
                    </div>
                    <div className="AcceptedvacancyDetails-skills-container d-flex flex-column mb-2">
                        <span className="AcceptedvacancyDetails-skills" style={{ fontWeight: "650" }}>Skills & Qualifications</span>
                        <span className="AcceptedvacancyDetails-skills-value">
                            Candidates with a minimum of 1 year and above work experience and trainees. <br />
                            Basic knowledge of laying the wiring using conduit and casing. <br />
                            Good communication skills <br />
                            Valid riding/ driving license will be a value-added qualification.
                        </span>
                    </div>
                    <div className="AcceptedvacancyDetails-responsibility-container d-flex flex-column mb-2">
                        <span className="AcceptedvacancyDetails-responsibility" style={{ fontWeight: "650" }}>Skills & Qualifications</span>
                        <span className="AcceptedvacancyDetails-responsibility-value">
                            Perform routine maintenance and troubleshooting of electronic equipment.  <br />
                            Identify and resolve electronic equipment malfunctions or failures by conducting diagnostic tests, analyzing circuitry.  <br />
                            Assist in designing and modifying electronic circuits, including PCB layout, component selection, and soldering.  <br />
                            Maintain accurate records of equipment maintenance, repair activities, and component inventory.
                        </span>
                    </div>
                    <div className="AcceptedvacancyDetails-place-container d-flex flex-column mb-2">
                        <span className="AcceptedvacancyDetails-place-value text-success" style={{ fontWeight: "650", fontSize: "19px" }}>
                            Aptinex <br />
                            No: 44, T13, T14, Dedicated Economic Center Kirimandala Mawatha, Colombo -5
                        </span>
                    </div>
                </Col>
            </Row>
            <span>Todo List</span>
            <div className="AcceptedJobDetails-button-container mt-2 d-flex flex-row">
                <Button className="btn-ServiceProvider-1">Start Todo List</Button>
                <Button className="btn-ServiceProvider-2 AcceptedJobDetails-start ms-auto">View Todo List</Button>
            </div>
            <hr />
            <div className="AcceptedJobDetails-button-container mt-2 d-flex flex-row">
                <Button className="btn-ServiceProvider-1" onClick={handleShow}>Schedule Project</Button>
                <Button className="btn-ServiceProvider-3 AcceptedJobDetails-start ms-auto">Start Project</Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Schedule Visitation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control className='mb-2' type="date" placeholder="" autoFocus />

                            <Form.Label>Start Time</Form.Label>
                            <Form.Control className='mb-2' type="time" placeholder="" autoFocus />

                            <Form.Label>End Time</Form.Label>
                            <Form.Control className='mb-2' type="time" placeholder="" autoFocus />

                            <Form.Label>Description</Form.Label>
                            <Form.Control className='mb-2' type="text" placeholder="" autoFocus />

                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className='btn-ServiceProvider-2' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='btn-ServiceProvider-1' onClick={handleClose}>
                        Schedule
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default VacancyDetails;