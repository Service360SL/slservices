import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/header/Frame 2.png';
import { Container } from 'react-bootstrap';
import Layout404 from '../components/layout/Layout404';
import image from '../assets/images/header/congrats.png';

function ActivateCustomer() {
    return (
        <Layout404>
            <Container className="text-center mt-5">
                <img src={logo} alt="Service 360 Logo" className="logo" /><br />
                <img src={image} alt="Service 360 Logo" className="logo" />
                <h1>Email Verified successfully</h1>
                <p>Click the following link to login your account</p>
                <Link to="/login">Login</Link>
                
            </Container>
        </Layout404>
    )
}

export default ActivateCustomer
