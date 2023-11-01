import React, { useState, useContext, useEffect } from 'react';
import '../../style/ServiceProvider/ServiceProviderHeader.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/header/Frame 2.png';
import bell from '../../assets/images/header/bell.png';
import chat from '../../assets/images/header/chat.png';
import profileIcon from '../../assets/images/header/user.jpg';
import { Link } from 'react-router-dom';
import EditProfile from '../pages/User/SeviceProvider/EditProfile';
import ChatApp from '../pages/Chat/ChatApp';
import { AuthenticationContext } from './../../ContextFiles/Authentication/AuthenticationContextProvider';
import ServiceProviderEditProfile from '../pages/ServiceProvider/EditProfile/ServiceProviderEditProfile';
import axios from 'axios';
import AddReviewandRating from '../pages/User/Customer/AddReviewandRating';
import Notification from '../pages/Notification/Notification';

function ServiceProviderHeader() {

    const [showEditProfile, setShowEditProfile] = useState(false);
    const { logout } = useContext(AuthenticationContext);
    const [userDetail, setUserDetail] = useState([]);
    const [spServices, setSpServices] = useState([]);
    const [showAddReview, setShowAddReview] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    // FETCHING LOGGED IN USER DATA
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/getUserById/' + userData.userid);      
            if (response.data) {
                setUserDetail(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // FETCHING LOGGED IN USER SERVICES
    const fetchSpServices = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`);
            if (response.data) {
                setSpServices(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchSpServices();
    }, []);

    return (
        <Navbar expand="lg" bg="light" className="navbar">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} alt="Service 360 Logo" className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav className="me-auto">
                        <Nav.Link href="/ServiceProvider/ViewJobs" className='fw-bold navLink'>Jobs</Nav.Link>
                        {/* <Nav.Link href="/ServiceProvider/ViewVacancies" className='fw-bold navLink'>Vacancies</Nav.Link> */}
                        <Nav.Link className="fw-bold navLink d-lg-inline d-sm-none d-md-none d-none" onClick={() => setShowAddReview(true)}> <i className="fas fa-star-half-alt"></i></Nav.Link>
                        <AddReviewandRating show={showAddReview} onHide={() => setShowAddReview(false)} />
                        
                        <Nav.Link className="fw-bold navLink d-lg-inline d-sm-none d-md-none d-none"><i className="bi bi-bell-fill" onClick={() => setShowNotification(true)}></i></Nav.Link>

                        <Notification  show={showNotification} onHide={() => setShowNotification(false)} />
                        <Nav.Link as={Link} to="/ServiceProvider/Chat" className='fw-bold navLink d-lg-inline d-sm-none d-md-none d-none'><i className="bi bi-chat-fill"></i></Nav.Link>

                        <Nav.Link className="fw-bold navLink d-sm-inline d-md-inline d-lg-none ">Notifications</Nav.Link>

                        <Nav.Link as={Link} to="/ServiceProvider/Chat" className="fw-bold navLink d-sm-inline d-md-inline d-lg-none ">Chat</Nav.Link>

                        <NavDropdown title={userDetail.firstname} className='fw-bold' id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setShowEditProfile(true)} className="fw-bold no-hover">View Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} onClick={logout} className="fw-bold no-hover">Logout</NavDropdown.Item>
                        </NavDropdown>

                        <ServiceProviderEditProfile show={showEditProfile} onHide={() => setShowEditProfile(false)} />
                        {userDetail.profilePic ? <img src={userDetail.profilePic} alt="Profile" className="profileIcon" style={{ width: "40px", height: "40px", borderRadius: "100%", }} /> : <img src={profileIcon} alt="Profile" className="profileIcon" style={{ width: "40px", height: "40px", borderRadius: "100%", }} />}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default ServiceProviderHeader;