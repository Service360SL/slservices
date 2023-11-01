import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";

const SubscriptionHistoryModal = ({ userid, show, onHide }) => {
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);
  const [subscriptionHistory, setSubscriptionHistory] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get(`http://localhost:8080/auth/subscriptionHistory/${userDetail.userid}`)
      .then((res) => {
        // console.log(res.data);
        setSubscriptionHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userid]);


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#292D32", color: "#ffffff" }}
      >
        <Modal.Title>Subscription History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Start Date</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionHistory.map((record, index) => (
              <tr key={index}>
                <td>{record.planName}</td>
                <td>{record.planPrice}</td>
                <td>{record.createdAt}</td>
                <td>{record.startDate}</td>
                <td>{record.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionHistoryModal;
