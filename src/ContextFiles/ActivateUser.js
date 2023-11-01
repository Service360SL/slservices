import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/header/Frame 2.png';
import { Container } from 'react-bootstrap';
import Layout404 from '../components/layout/Layout404';
import image from '../assets/images/header/congrats.png';

function ActivateUser() {
    return (
        <Layout404>
            <Container className="text-center mt-5">
                <img src={logo} alt="Service 360 Logo" className="logo" /><br />
                <img src={image} alt="Service 360 Logo" className="logo" />
                <h1>Email Verified successfully</h1>
                <p>Please wait until your details are verified. We will email you if your details are successfully verified.</p>
                <p>Visit our page through this <Link to={'/'}>link</Link></p>
                <p className='text-secondary'>If any futher details contact with us via <Link to="#">chat</Link></p>     
            </Container>
        </Layout404>
    )
}

export default ActivateUser
