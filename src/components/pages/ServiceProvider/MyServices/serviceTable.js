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

  const [myservicesData, setMyservicesData] = useState([]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [serviceToEnable, setServiceToEnable] = useState(null);
  const [serviceToDisable, setServiceToDisable] = useState(null);

  const [showEnableModal, setShowEnableModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [myServicesCount, setMyServicesCount]= useState(0);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');  

  const handleClose = () => setShowEditModal(false);

  const handleShow = (rowData) => {
    setSelectedRow(rowData);
    setShowEditModal(true); // Show the modal
  };

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const handleFileInputChange = (e) => {
    const selectedFilesArray = Array.from(e.target.files);

        
    if (selectedFilesArray.length + selectedFiles.length > 5) {
      handleShowAlert('You can select a maximum of 5 documents') 
      return;
    }

    const selectedFileNames = selectedFilesArray.map((file) => file);

    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...selectedFileNames]);
  };

  const handleRemoveFile = (indexToRemove) => {
      setSelectedFiles((prevSelectedFiles) =>
          prevSelectedFiles.filter((_, index) => index !== indexToRemove)
      );
  };

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


  useEffect(() => {
    axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`).then((res) => {
        console.log(res.data);
        setMyservicesData(res.data);
        const numberOfRows = res.data.length;
        setMyServicesCount(numberOfRows);
    });

  }, []);

  const handleEnableService = () => {
    if (serviceToEnable) {
      axios
        .put(`http://localhost:8080/auth/enableMyService/${serviceToEnable}`)
        .then((response) => {
          setServiceToEnable(null);
        })
        .catch((error) => {
          console.error('Error enabling service:', error);
        });

        setMyservicesData((prevData) =>
          prevData.map((service) =>
            service.serviceProviderServicesId === serviceToEnable
              ? { ...service, status: 'active' }
              : service
          )
        );
        setShowEnableModal(false);
    }
  };

  const handleDisableService = () => {
    if (serviceToDisable) {
      axios
        .put(`http://localhost:8080/auth/disableMyService/${serviceToDisable}`)
        .then((response) => {
          setServiceToDisable(null);
          // setShowDisableModal(false);
        })
        .catch((error) => {
          console.error('Error disabling service:', error);
        });

        setMyservicesData((prevData) =>
          prevData.map((service) =>
            service.serviceProviderServicesId === serviceToDisable
              ? { ...service, status: 'inactive' }
              : service
          )
        );
        setShowDisableModal(false);
    }
  };

  const handleAddQualificationFiles = (event) => {
    event.preventDefault();

    // Create a FormData object to send the data
    const formData = new FormData();

    // Append each selected file to the FormData object    
    selectedFiles.map((file) => {
        formData.append("files", file);
    });

    formData.append("serviceproviderid", userData.userid);
 
    axios
        .post('http://localhost:8080/auth/addQualifcationCertificates', formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log('Files Added successfully:', response.data);

        // Clear the selected files
        setSelectedFiles([]);
        setShowEditModal(false);
        handleShowAlert('your certificates and achievements added succesfully')     
        })
        .catch((error) => {
            console.error('Error creating blog:', error);
        });
  };

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
              My Services
            </span>
            <span
              className="my-serivice-head-container-col-1-no"
              style={{
                backgroundColor: "none",
                border: "2px solid black",
                color: "black",
                borderRadius: "10px",
              }}
            >
              {myServicesCount}
            </span>
          </Col>
          <Col className="my-serivice-head-container-col-2">
            <Link to="/ServiceProvider/AddNewServices">
              <Button
                className="btn-ServiceProvider-2 my-serivice-head-container-col-2-btn me-3"
                style={{
                  borderRadius: "10px",
                }}
              >
                <i className="fas fa-plus pe-2"></i>
                Add Services
              </Button>
            </Link>
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
                <th>Service Name</th>
                <th>Service Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the displayed training sessions and render each row */}
              {myservicesData.map((service) => (
                <tr key={service.id}>
                  <td className="text-center">{service.serviceName}</td>
                  <td className="text-center">{service.serviceCategoryName}</td>
                  <td className="text-center">
                    {service.status === 'active' ? (
                      <span style={{ color: '#4CAF50' }}>
                        active
                      </span>
                    ) : (
                      <span style={{ color: '#FF5733' }}>
                        inactive
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    {service.status === "active" ? (
                      <>
                          <i
                            className="fas fa-times-circle fs-3 me-2"
                            onClick={() => {
                              setServiceToDisable(service.serviceProviderServicesId);
                              setShowDisableModal(true);
                            }}
                          ></i>
                      </>
                      ) : (
                      <>
                          <i
                            className="fas fa-check-circle fs-3 me-2"
                            onClick={() => {
                              setServiceToEnable(service.serviceProviderServicesId);
                              setShowEnableModal(true);
                            }}
                          ></i>
                      </>
                    )}
                      <i
                          className="fas fa-pen-square fs-3"
                          onClick={() => {
                            handleShow(service);
                          }}
                      ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>

      {/* Modal for enabling a service */}
      <Modal show={showEnableModal} onHide={() => setShowEnableModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Enable Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to enable this service?</Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={() => setShowEnableModal(false)}>
            Cancel
          </Button>
          <Button className="btn-ServiceProvider-1" onClick={handleEnableService}>
            Enable
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for disabling a service */}
      <Modal show={showDisableModal} onHide={() => setShowDisableModal(false)} centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Disable Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to disable this service?</Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={() => setShowDisableModal(false)}>
            Cancel
          </Button>
          <Button className="btn-ServiceProvider-1" onClick={handleDisableService}>
            Disable
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => {setShowEditModal(false);setSelectedFiles([]);}} centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Add Qualification Certificate(s)</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Service</Form.Label>
              <Form.Control className='mb-2' type="text" value={selectedRow ? selectedRow.serviceName : ''} readOnly />
            </Form.Group>
              
            <Form.Group className="mb-3" controlId="formBasicFiles">
                <Form.Label>Upload Relevant Files</Form.Label><Form.Text className="text-muted"></Form.Text><br />
                <Button className="btn-ServiceProvider-1" onClick={() => document.getElementById('fileInput').click()}>Select Files</Button>
                <input
                    type="file"
                    multiple
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileInputChange}
                />
                <div className="selected-images">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="selected-image">
                            <span>{file.name}</span>
                            <Button variant="link" onClick={() => handleRemoveFile(index)}><i class="bi bi-x bi-lg" style={{ color: 'black' }}></i></Button>
                        </div>
                    ))}
                </div>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn-ServiceProvider-2' onClick={() => {setShowEditModal(false);setSelectedFiles([]);}}>
            Cancel
          </Button>
          <Button className='btn-ServiceProvider-1' onClick={handleAddQualificationFiles}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

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


export default ServiceTable;