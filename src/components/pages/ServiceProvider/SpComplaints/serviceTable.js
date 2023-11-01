import React from 'react'
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../../style/ServiceProvider/MyServices.css';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Alert } from 'react-bootstrap';
import { useEffect } from "react";
import axios from "axios";

function ServiceTable() {
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const [complaintData, setComplaintData] = useState({
    complainttitle: "",
    complaintdescription: "",
    users: {
        userid: userData.userid
    }
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
      e.preventDefault();

      axios.post("http://localhost:8080/auth/createcomplaints", complaintData)
          .then((response) => {
              console.log("Complaint added successfully:", response.data);
              handleClose();
              window.location.reload();

          })
          .catch((error) => {
              console.error("Error adding complaint:", error);
          });
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/auth/viewcomplaintsbyuserid/${userData.userid}`).then((res) => {
        console.log(res.data);
        setComplaintData(res.data);
    });
  }, []);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setComplaintData({ ...complaintData, [name]: value });
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const serverLink = 'http://localhost:8080';

    const fetchUserData = async () => {
        try {
            const response = await axios.get(serverLink + '/auth/getUserById/' + userData.userid);
            if (response.data) {
                // setUserDetail(response.data);
                console.log(userData.userid)
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
  }, [userData.userid]);

  const handleShowAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 4000); // 5000 milliseconds (5 seconds)
  };

  return (
    <div>
      <div className='ms-lg-2 me-lg-2'>
      <div className="my-serivice-head-container">
        <Row>
          <Col className="my-serivice-head-container-col-1">
            <span
              className="my-serivice-head-container-col-1-span ms-2"
              style={{ fontWeight: "600" }}
            >
              Complaints
            </span>
          </Col>
          <Col className="my-serivice-head-container-col-2">
              <Button
                className="btn-ServiceProvider-1 my-serivice-head-container-col-2-btn me-3"
                onClick={handleShow}
                style={{
                  borderRadius: "10px",
                }}
              >
                Add Complaints
              </Button>
          </Col>
        </Row>
      </div>
    </div>

      {/* Table*/}
      <div className="mt-4 d-flex flex-column w-100" style={{ width: '100%' }}>
        <Container className="table-responsive">
          <Table striped bordered hover size="sm" className="custom-table">
            <thead className="text-center">
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Complaint Title</th>
                <th>Complaint Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                //map
                <td className="text-center"></td>
                <td className="text-center"></td>
                <td className="text-center"></td>
                <td className="text-center"></td>
              </tr>
            </tbody>
          </Table>
        </Container>
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

      
      <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
              <Modal.Title>Make Complaints</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form className="vacancy-form" onSubmit={handleSubmit}>
                  <div className="vacancy-form-group">
                      <label htmlFor="complaintCategory">Complaint Title<span style={{ color: "red" }}>&nbsp;*</span> </label>
                      <input
                          type="text"
                          name="complainttitle"
                          className="form-control"
                          id="complainttitle"
                          placeholder="Enter your Complaint"
                          value={complaintData.complainttitle}
                          onChange={handleChange}
                      />
                      <label htmlFor="description">Description <span style={{ color: "red" }}>&nbsp;*</span> </label>
                      <textarea
                          name="complaintdescription"
                          className="form-control"
                          id="complaintdescription"
                          placeholder="Enter your Description"
                          value={complaintData.complaintdescription}
                          onChange={handleChange}
                      />
                  </div>
                  <div className="d-flex justify-content-end">
                      <Button variant='secondary' style={{ background: "#292d32", marginRight: '200px' }} type="submit">
                          Submit
                      </Button>
                      <Button variant="secondary" style={{ background: "#687699" }} onClick={handleClose}>
                          Cancel
                      </Button>
                  </div>
              </form>
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
       </Modal>

    </div>
  );
}


export default ServiceTable;