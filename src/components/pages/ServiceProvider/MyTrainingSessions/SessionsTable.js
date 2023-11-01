import React, { useState } from 'react';
import { Table, Container, Alert  } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { set } from 'date-fns';
import Payment from "../../Payment/Payment";

function MyTrainingSessions() {

  const [viewTrainingSessionsData, setviewTrainingSessionsData] = useState(null);

  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); 

  const [showAlertBlue, setShowAlertBlue] = useState(false);
  const [alertMessageBlue, setAlertMessageBlue] = useState(''); 

  const [showAlertRed, setShowAlertRed] = useState(false);
  const [alertMessageRed, setAlertMessageRed] = useState(''); 
  
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // State to control the user registration modal
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (rowData) => {
    setSelectedRow(rowData);
    setShow(true); // Show the modal
  };

  // Function to open the user registration modal
  const handleShowRegistrationModal = (rowData) => {  
    // Call the getRegisteredUsers function to fetch data
    getRegisteredUsers(rowData.trainingid);

    console.log(registeredUsers);
    setShowRegistrationModal(true);
  };

  // Function to close the user registration modal
  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  const [showRejectionModal, setShowRejectionModal] = useState(false);

  // Function to open the user registration modal
  const handleShowRejectionModal = (rowData) => {
    setSelectedRow(rowData);
    setShowRejectionModal(true);
  };

  // Function to close the user registration modal
  const handleCloseRejectionModal = () => {
    setShowRejectionModal(false);
  };

  // Number of cards (training sessions) to display per page
  const cardsPerPage = 10;

  // State to keep track of the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // State to store the selected date
  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedRowTitle, setSelectedRowTitle] = useState(null);

  useEffect(() => {
    if (paymentSuccess && orderID) {
        if (paymentSuccess) {
              axios.put(`http://localhost:8080/auth/publishTrainingSession/${selectedRowId}`).then((res) => {
                console.log(res.data);

                if(!res){
                  handleShowAlertRed("Payment unsuccessful.");    
                }
                else{
                  handleShowAlertBlue("Payment successful. Your training session has been published.");
                  setviewTrainingSessionsData((prevData) =>
                    prevData.map((session) =>
                      session.trainingid === selectedRowId ? { ...session, status: "Published" } : session
                    )
                  );
                  handleClose();
                }
            })
        } else {
          handleShowAlertRed("Payment Failed, Please try again!");
        }
    }
}, [paymentSuccess, orderID]);
  

  // Function to handle page change when the user clicks on pagination buttons
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setCurrentPage(1);   // Reset current page to 1 when search term changes
  };

  // Function to handle date changes
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentPage(1); // Reset current page to 1 when date changes
  };

  // GETTING LOGGED IN SERVICEPROVIDER ID

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const handleSetSelectedData = (session) => {
    if (session && session.trainingid && session.trainingtitle) {
      setSelectedRowId(session.trainingid);
      setSelectedRowTitle(session.trainingtitle);
    }
  };

  const getRegisteredUsers = (trainingsessionid) => {
    axios
      .get(`http://localhost:8080/auth/GetTrainingSessionRegisteredUsers`,{
        params: {
          trainingsessionid: trainingsessionid,
        },
      }).then((res) => {
        console.log(res.data);
        setRegisteredUsers(res.data);
      })
      .catch((error) => {
        // Handle errors
      });
  };

  useEffect(() => {
    axios.get('http://localhost:8080/auth/viewMyTrainingSessions',{
      params: {
        serviceproviderid: userData.userid
      },
    }).then((res) => {
        console.log(res.data);
        setviewTrainingSessionsData(res.data);
    });
  }, []);

  if (!viewTrainingSessionsData) return 'No jobs found!';
  
  // Filter training sessions based on search term and selected date
  const filteredSessions = viewTrainingSessionsData.filter((session) => {
    const sessionDate = new Date(session.trainingdate);
    const selected = selectedDate ? new Date(selectedDate) : null;

    return (
      (!selected || sessionDate.toDateString() === selected.toDateString()) &&
      (session.trainingtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.traininglocation.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  function convertTo12HourFormat(time24) {
    const [hour, minute] = time24.split(":");
    const hourInt = parseInt(hour);
    const amPm = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
  
    return `${hour12}:${minute} ${amPm}`;
  }

  // Calculate the start and end indices of the displayed training sessions for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Create a subset of training sessions to be displayed on the current page
  const displayedSessions = filteredSessions.slice(startIndex, endIndex);

  const handleShowAlert = (message) => {
      setAlertMessage(message);
      setShowAlert(true);

      // Automatically hide the alert after 5 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // 5000 milliseconds (5 seconds)
  };

  const handleShowAlertBlue = (message) => {
      setAlertMessageBlue(message);
      setShowAlertBlue(true);

      // Automatically hide the alert after 5 seconds
      setTimeout(() => {
        setShowAlertBlue(false);
      }, 5000); // 5000 milliseconds (5 seconds)
  };

  const handleShowAlertRed = (message) => {
      setAlertMessageRed(message);
      setShowAlertRed(true);

      // Automatically hide the alert after 5 seconds
      setTimeout(() => {
        setShowAlertRed(false);
      }, 5000); // 5000 milliseconds (5 seconds)
  };

  return (
    <div>

      {/* Custom styles */}
      <style>
        {`
          /* Customize the width of the modal for different screen sizes */
          @media (max-width: 768px) {
            .custom-modal {
              max-width: 90%;
            }
          }

          @media (min-width: 769px) and (max-width: 1200px) {
            .custom-modal {
              max-width: 70%;
            }
          }

          @media (min-width: 1201px) {
            .custom-modal {
              max-width: 50%;
            }
          }

          /* Add any additional custom styles here */
        `}
      </style>

      {/* Page Title*/}
      <span className="ms-3 align-self-start" style={{ fontSize: "28px", fontWeight: "600" }}>My Training Sessions</span>


      {/* Body Nav */}
      <Navbar className="mt-4 ms-2 me-2">
        <div className='training-nav-container d-flex flex-row col-12'>
          <div className='d-flex flex-row'>
            {/* Search Input */}
            <input
              type="text"
              className="form-control training-nav-input"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <span className="input-group-text training-nav-input">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <div className='training-nav-datepicker-container d-flex flex-row ms-sm-auto'>
            {/* Date Picker */}
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control date-picker-input training-nav-input"
              placeholderText="Filter by Date"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span className="input-group-text training-nav-input">
              <i class="bi bi-calendar2-week"></i>
            </span>
          </div>
        </div>
      </Navbar>


      {/* Table*/}
      <div className="mt-3 d-flex flex-column w-100" style={{ width: '100%' }}>
        <Container className="table-responsive">
          <Table striped bordered hover size="sm" className="My-training-session-table">
            <thead className="text-center">
              <tr>
                <th>Session ID</th>
                <th style={{ width: '25%' }}>Training Session Title</th>
                <th style={{ width: '13%' }}>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the displayed training sessions and render each row */}
              {displayedSessions.map((session) => (
                <tr key={session.trainingid} className="custom-table-row">
                  <td className="text-center">{String(session.trainingid).padStart(3, '0')}</td>
                  <td className="text-center" style={{ width: '25%' }}>{session.trainingtitle}</td>
                  <td className="text-center" style={{ width: '13%' }}>{session.trainingdate}</td>
                  <td className="text-center">{convertTo12HourFormat(session.trainingstarttime)} - {convertTo12HourFormat(session.trainingendtime)}</td>
                  <td className="text-center">{session.traininglocation}</td>
                  <td className="text-center">{session.status}</td>
                  <td className="text-center">
                    {session.status === 'Pending' ? (
                      <i
                        className={`bi-info-circle-fill fs-5 mx-2 my-2`}
                        onClick={() => handleShowAlert('Your training session is under review by the admin')}
                      ></i>
                    ) : session.status === 'Payment Pending' ? (
                      <i
                        className={`bi bi-cash fs-5 mx-2 my-2`}
                        onClick={() => {
                          handleShow(session);
                          handleSetSelectedData(session);
                      }}
                      ></i>
                    ) : session.status === 'Published' ? (
                      <i
                        className={`bi bi-eye-fill fs-5 mx-2 my-2`}
                        onClick={() => handleShowRegistrationModal(session)}
                      ></i>
                    ) : session.status === 'Rejected' ? (
                      <i
                        className={`bi bi-info-circle-fill fs-5 mx-2 my-2`}
                        onClick={() => handleShowRejectionModal(session)}
                      ></i>
                    ) : session.status === 'Completed' ? (
                      <i
                      className={`bi bi-eye-fill fs-5 mx-2 my-2`}
                      onClick={() => handleShowRegistrationModal(session)}
                      ></i>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>


      {/* Pagination */}
      <div className="pagination justify-content-center">
        {/* Create pagination buttons for each page */}
        {Array.from({ length: Math.ceil(filteredSessions.length / cardsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''
              }`}
            style={{ backgroundColor: '#292D32', color: '#fff' }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal for Payment Confirmation */}
      <Modal show={show && selectedRow !== null} onHide={handleClose} centered>
        
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Pay for Training Session</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            To publish your training session post on Service360, you need to make a payment of 1000.00 LKR. Please
            confirm your payment below
          </p>
          <Form>
            {selectedRow && (
              <>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Group className="mb-3" controlId="sessionTitle">
                    <Form.Label>Session Title</Form.Label>
                    <Form.Control type="text" value={selectedRow ? selectedRow.trainingtitle : ''} onreadOnly />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" value="1000.00 LKR" readOnly />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="paymentConfirmation">
                    <Form.Check
                      type="checkbox"
                      label="I confirm that I want to proceed with the payment."
                    />
                  </Form.Group>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={handleClose}>
            Close
          </Button>
          <Payment
            firstname={userData.firstname}
            lastname={userData.lastname}
            email={userData.email}
            paymentTitle={selectedRow ? selectedRow.trainingtitle : ''}
            amount={1000}
            sendUserId={userData.userid}
            reciveUserID={null}
            setPaymentSuccess={setPaymentSuccess}
            setOrderID={setOrderID}
          />
          {/* <Button
            className="btn-ServiceProvider-1"
            onClick={() => {
              if (selectedRow) {
                handlePublish(selectedRow.trainingid,selectedRow.trainingtitle);
              }
              handleClose();
            }}
          >
            Pay & Publish
          </Button> */}
        </Modal.Footer>
      </Modal>


      {/* Modal for ServiceProviders Registration */}
      <Modal show={showRegistrationModal} onHide={handleCloseRegistrationModal} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Registered Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>Email</th>
                <th>Phone Number</th>
                <th>Registration Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registeredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.mobilenumber}</td>
                  <td className="text-center">{user.registrationdate}</td>
                  <td className="text-center">{user.paymentstatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={handleCloseRegistrationModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Rejection */}
      <Modal show={showRejectionModal} onHide={handleCloseRejectionModal} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
          <Modal.Title>Training Session Rejection Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This training session has been rejected by the admin due to the following reason
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control type="text" value={selectedRow ? selectedRow.reason : ''} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-ServiceProvider-2" onClick={handleCloseRejectionModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert
        show={showAlert}
        variant="secondary"
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
      
      <Alert
        show={showAlertRed}
            variant="danger"
            onClose={() => setShowAlertRed(false)}
            dismissible
            style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999, // Adjust the z-index as needed
            }}
        >
        {alertMessageRed}
      </Alert>   

      <Alert
        show={showAlertBlue}
            variant="info"
            onClose={() => setShowAlertBlue(false)}
            dismissible
            style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 9999, // Adjust the z-index as needed
            }}
        >
        {alertMessageBlue}
      </Alert>       

    </div>

  );
}

export default MyTrainingSessions;