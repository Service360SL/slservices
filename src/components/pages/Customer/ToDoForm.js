import React, { useState, useEffect } from "react";
import "../../../style/Customer/ToDoForm.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Payment from "../Payment/Payment";
// import { QrReader } from 'react-qr-reader'; // Import the QR code reader



function ToDoForm() {
  const [tasks, setTasks] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [qrScanActive, setQrScanActive] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/tododetails"
      ); // Replace with your Spring Boot API endpoint
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const allTasksCompleted = tasks.every((task) => task.completed);
    if (allTasksCompleted) {
      setShowPaymentModal(true);
    }
  }, [tasks]);

  // const toggleCompletion = taskId => {
  //   setTasks(prevTasks => {
  //     return prevTasks.map(task =>
  //       task.id === taskId ? { ...task, completed: !task.completed } : task
  //     );
  //   });
  // };
  useEffect(() => {
    if (paymentSuccess && orderID) {
      setShowPaymentModal(false);
      // handleOpenSubscripedModal(chosenPlan.id);
    }
  }, [paymentSuccess, orderID]);

  const completedTasks = tasks.filter(task => task.completed && !task.customercompleted);
  const ConfirmcompletedTasks = tasks.filter(task => task.completed && task.customercompleted);
  const nonCompletedTasks = tasks.filter(task => !task.completed);

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setShowPaymentMessage(false); // Reset the message state when modal is closed
  };

  const handleSkip = () => {
    setShowPaymentMessage(true); // Show the message when Skip is clicked
    handleClosePaymentModal(); // Close the modal
  };

  // const handleScan = data => {
  //   if (data) {
  //     // Handle the scanned QR code data here (e.g., send it to the server)
  //     console.log(data);
  //     setQrScanActive(false); // Turn off the QR scanner after a successful scan
  //   }
  // };

  // const startScan = () => {
  //   setQrScanActive(true);
  // };
  const handleConfirm = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:8080/auth/ConfirmTodoListDetails/${taskId}`, null, {
        params: {
          ccompleted: true, // Set the completed parameter to true
        }
      });

      if (response.data) {
        // Task confirmation was successful
        // You can update the task in your state if needed
        fetchData(); // Refresh the task list
      } else {
        // Handle the error
        console.error('Error confirming task:', response.data);
      }
    } catch (error) {
      console.error('Error confirming task:', error);
    }
  };

  return (
    <div className="custodo">
      <h4>Project Name : Assigned by Alex</h4>
      {nonCompletedTasks.map((task) => (
        <Card
          key={task.todolistdetailsid}
          className={`castodolist ${task.completed ? "completed" : ""}`}
        >
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              {/* <FontAwesomeIcon
                icon={task.completed ? faCheckCircle : faCircle}
                className={`check-icon ${task.completed ? 'completed' : ''}`}
                onClick={() => toggleCompletion(task.todolistdetailsid)}
              /> */}
              <p className="task-date">{task.dueDate}</p>
              <span className="task-text">{task.task}</span>
              <span className="task-text">Amount = Rs.{task.amount}</span>
            </div>
          </Card.Body>
        </Card>
      ))}

      {completedTasks.length > 0 && (
        <div className='completedTasks'>
          <h5>Confirm the Tasks Completed</h5>
          {completedTasks.map(task => (
            <Card
              key={task.todolistdetailsid}
              className={`castodolist completed`}
            >
              <Card.Body>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={`check-icon completed`}
                />
                {task.task}

                <div class="time"> worked hours:  {task.workedHours}</div>

                <Button
                  className="scanbtn"
                  onClick={() => handleConfirm(task.todolistdetailsid)}
                >Confirm</Button>

              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {ConfirmcompletedTasks.length > 0 && (
        <div className='completedTasks'>
          <h5>Completed Tasks</h5>
          {ConfirmcompletedTasks.map(task => (
            <Card
              key={task.todolistdetailsid}
              className={`castodolist completed`}
            >
              <Card.Body>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={`check-icon completed`}
                />
                {task.task}

                <div class="time"> worked hours:  {task.workedHours}</div>
                <div class="time"> Amount:  Rs.{task.amount}</div>

                {/* <Button
                  className="scanbtn"
                  onClick={() => handleConfirm(task.todolistdetailsid)}
                >Confirm</Button> */}

              </Card.Body>
            </Card>
          ))}


        </div>
      )}

      {/* Payment Modal */}
      {completedTasks.length === 0 && nonCompletedTasks.length === 0 && ConfirmcompletedTasks.length > 0 && (
      <Modal show={showPaymentModal} onHide={handleClosePaymentModal} centered>
        <Modal.Header className='cusmodaltitle'>
          <Modal.Title>Service Completed</Modal.Title>
        </Modal.Header>
        <div className='bgimagetodo'>
          <Modal.Body className='cusmodbody'>
            Your tasks are completed now. Select Payment option to Continue
          </Modal.Body>
          <Modal.Footer>
            {/* <Button className='custodobut1' onClick={handleClosePaymentModal}> */}
            <Payment
                    firstname={userDetail.firstname}
                    lastname={userDetail.lastname}
                    email={userDetail.email}
                    paymentTitle={"tile fitting"}
                    amount={10000}
                    sendUserId={userDetail.userid}
                    reciveUserID={null}
                    setPaymentSuccess={setPaymentSuccess}
                    setOrderID={setOrderID}
                  />          
                    {/* </Button> */}
            <Button className='custodobut2' variant="primary" onClick={handleSkip}>
              HandOver Directly
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    )}



    </div>
  )
}





export default ToDoForm;
