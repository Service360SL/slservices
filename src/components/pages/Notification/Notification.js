import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "../../../style/advertiser/AdIndex.css";

const Notification = ({ show, onHide }) => {
  const response = sessionStorage.getItem("authenticatedUser");
  const userData = JSON.parse(response);
  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:8080/auth/notification/${userData.userid}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response.data);
        setNotification(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userData.userid]);

  function frontbuttonClick(link, id) {
    markAsRead(id);
    if (link !== "") {
     window.location.href = "http://localhost:3000/" + link;
    }
    
  }

  function bebuttonClick(link, id) {
    const apiUrl = `http://localhost:8080/auth/` + link;

    axios
      .put(apiUrl)
      .then((response) => {
        // console.log(response.data);
        markAsRead(id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function markAsRead(id) {
    const apiUrl = `http://localhost:8080/auth/notification/update/${id}`;

   axios
     .put(apiUrl)
     .then((response) => {
      //  console.log(response.data);
       // Remove the item from the notifications list
       setNotification((prevNotifications) =>
         prevNotifications.filter((noti) => noti.id !== id)
       );
     })
     .catch((error) => {
       console.error("Error fetching data:", error);
     });
  }

  function markAllAsRead() {
    const apiUrl = `http://localhost:8080/auth/notification/updateAll/${userData.userid}`;

    axios
      .put(apiUrl)
      .then((response) => {
        // console.log(response.data);
        setNotification([]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifications.length !== 0 && (
          <div className="ml-auto">
            <p
            
              className="text-right markAllNoti"
              style={{ cursor: "pointer" }}
              onClick={() => markAllAsRead()}
            >
              Mark All as Read
            </p>
          </div>
        )}
        {notifications
          .filter((noti) => noti.status === "UNREAD")
          .map((noti, index) => (
            <div className="notification-container py-1 px-2" key={index}>
              <div className="noti-time d-flex flex-row-reverse gap-3">
                <p className="text-muted text-right">{noti.createdAt}</p>
              </div>

              <div className="px-3 notification-header">
                <p className="notification-title">
                  <b>{noti.title}</b>
                </p>
                <p className="notification-message">{noti.message}</p>
              </div>

              <div className="d-flex justify-content-end gap-3">
                {noti.febutton1 && (
                  <div className="notification-button">
                    <button
                      className="notiFrontbut px-3"
                      onClick={() =>
                        frontbuttonClick(noti.febutton1Link, noti.id)
                      }
                    >
                      {noti.febutton1}
                    </button>
                  </div>
                )}

                {noti.bebutton1 && (
                  <div className="notification-button">
                    <button
                      className="notiGoodBut px-3"
                      onClick={() => bebuttonClick(noti.bebutton1Link, noti.id)}
                    >
                      {noti.bebutton1}
                    </button>
                  </div>
                )}

                {noti.bebutton2 && (
                  <div className="notification-button">
                    <button
                      className="notificationDangerBut px-3"
                      onClick={() => bebuttonClick(noti.bebutton2Link, noti.id)}
                    >
                      {noti.bebutton2}
                    </button>
                  </div>
                )}

                <span className="read-icon">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ cursor: "pointer" }}
                    onClick={() => frontbuttonClick("", noti.id)}
                  />
                </span>
              </div>
            </div>
          ))}{" "}
        {notifications.length === 0 && (
          <div className="notification-container py-1 px-2">
            <p className="text-center">No new notifications</p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Notification;
