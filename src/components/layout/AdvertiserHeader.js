import React, { useState, useContext, useEffect } from "react";
import "../../style/Admin/AdminHeader.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/images/header/Frame 2.png";
import profileIcon from "../../assets/images/header/user.jpg";
import { Link } from 'react-router-dom';
import AdvertiserEditProfile from "../pages/advertiser/EditProfile/AdvertiserEditProfile";
import { AuthenticationContext } from './../../ContextFiles/Authentication/AuthenticationContextProvider';
import AddReviewandRating from "../pages/User/Customer/AddReviewandRating";
import axios from 'axios';

import Notification from "../pages/Notification/Notification";

const serverLink = 'http://localhost:8080';

function AdvertiserHeader() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { logout } = useContext(AuthenticationContext);
  const [showAddReview, setShowAddReview] = useState(false);
  const [userDetail, setUserDetail] = useState([]);

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(serverLink + '/auth/getUserById/' + userData.userid);
      if (response.data) {
        setUserDetail(response.data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [showNotification, setShowNotification] = useState(false);

  return (
    <Navbar expand="lg" bg="light" className="navbar">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Service 360 Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link
              href="#Riviews"
              className="fw-bold navLink d-lg-inline d-sm-none d-md-none d-none"
              onClick={() => setShowAddReview(true)}
            >
              <i className="fas fa-star-half-alt"></i>
            </Nav.Link>
            <AddReviewandRating
              show={showAddReview}
              onHide={() => setShowAddReview(false)}
            />
            <Nav.Link
              className="fw-bold navLink d-lg-inline d-sm-none d-md-none d-none"
            >
              <i
                className="bi bi-bell-fill"
                onClick={() => setShowNotification(true)}
              ></i>
            </Nav.Link>

            <Notification
              show={showNotification}
              onHide={() => setShowNotification(false)}
            />

            <Nav.Link
              href="#chat"
              as={Link}
              to="/Advertiser/Chat"
              className="fw-bold navLink d-lg-inline d-sm-none d-md-none d-none"
            >
              <i className="bi bi-chat-fill"></i>
            </Nav.Link>

            <Nav.Link
              href="#notifications"
              className="fw-bold navLink d-sm-inline d-md-inline d-lg-none "
            >
              Notifications
            </Nav.Link>
            <Nav.Link
              href="#chat"
              className="fw-bold navLink d-sm-inline d-md-inline d-lg-none"
            >
              Chat
            </Nav.Link>

            <NavDropdown
              title={userDetail.firstname}
              className="fw-bold"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                href="#"
                className="fw-bold no-hover"
                onClick={() => setShowEditProfile(true)}
              >
                View Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} onClick={logout} className="fw-bold no-hover">Logout</NavDropdown.Item>
            </NavDropdown>
            <AdvertiserEditProfile
              show={showEditProfile}
              onHide={() => setShowEditProfile(false)}
            />
            {userDetail.profilePic ? (
              <img
                src={userDetail.profilePic}
                alt="Profile"
                className="profileIcon"
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
              />
            ) : (
              <img
                src={profileIcon}
                alt="Profile"
                className="profileIcon"
                style={{ width: "40px", height: "40px", borderRadius: "100%" }}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdvertiserHeader;