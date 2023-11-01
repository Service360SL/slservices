import React from 'react';
import '../../style/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/header/Frame 2.png';
import { Link } from 'react-router-dom';

function AppHeader1() {
    return (
        <Navbar expand="lg" bg="light">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} alt="Service 360 Logo" className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    <Nav>
                        <Nav.Link as={Link} to="/" className='fw-bold navLink'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/jobs" className='fw-bold navLink'>Jobs</Nav.Link>
                        <Nav.Link as={Link} to="/services" className='fw-bold navLink'>Services</Nav.Link>
                        <Nav.Link as={Link} to="/about" className='fw-bold navLink'>About</Nav.Link>
                        <Nav.Link as={Link} to="/Contactus" className='fw-bold navLink'>Contact</Nav.Link>
                        <Nav.Link as={Link} to="login" className='fw-bold navLink'>Login</Nav.Link>
                        <NavDropdown className='fw-bold' title="SignUp" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/signup/customer" className="fw-bold">Customer</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/signup/serviceProvider" className="fw-bold">Service Provider</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/signup/advertiser" className="fw-bold">Advertiser</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppHeader1;



