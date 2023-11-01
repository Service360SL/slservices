import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import loginPhoto from '../../assets/images/home/login.png'
import 'bootstrap-icons/font/bootstrap-icons.css';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import '../../style/Login.css'
import image from '../../assets/images/header/Background.png'
import { ReactLinkContext } from "../../ContextFiles/ReactLinkContext";
import { AuthenticationContext } from "../../ContextFiles/Authentication/AuthenticationContextProvider";

const StyledButton = styled.button`
        background-color: #292D32;
        width: 70%;
        @media (max-width: 768px) {
            width: 100%; 
            margin-top: 1rem; 
        }
        &:hover {
            background: #fff;
            border-color: #2596be;
            color: #9f390d;
    }
    `;

const StyledButton2 = styled.button`
        background-color: #292D32;
        width: 30%;
        @media (max-width: 768px) {
            width: 100%; 
            margin-top: 1rem; 
        }
        &:hover {
            background: #fff;
            border-color: #2596be;
            color: #9f390d;
        }
    `;

const Login = () => {

    const { login } = useContext(AuthenticationContext)

    const { CustomerSignUpLink, ServiceProviderSignUpLink, AdvertiserSignUpLink } = useContext(ReactLinkContext)

    const { ResetPasswordLink: forgotPasswordLink } = useContext(ReactLinkContext)

    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    const [passwordType, setPasswordType] = useState('password')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState(null)

    const LoginLink = (email, password) => {

        if (email === '' && password === '') {
            setErrorMessage('Please fill in all the fields')
        } else if (email === '') {
            setErrorMessage('Please enter the email address')
        } else if (email === '' && password === '') {
            setErrorMessage('Please enter the password')
        } else {
            login(email, password);
            console.log(email, password)
        }

    }

    const showHidePassword = () => {

        if (isPasswordHidden) {
            setPasswordType('text')
            setIsPasswordHidden(false)

        }
        else {

            setPasswordType('password')
            setIsPasswordHidden(true)

        }

    }

    const customFontStyle = {
        fontFamily: "Roboto",
        color: '#9F390D'
    };

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);

    return (

        <div className="h-100" style={{ backgroundImage: `url(${image})` }}>

            <section className="h-100">

                <div className="container py-5 h-100">

                    <div className="row d-flex justify-content-center align-items-center h-100">

                        <div className="col-xl-10 my-lg-1 py-lg-1 my-xl-0 py-xl-0">

                            <div className="rounded-3 text-black my-lg my-xl-0 py-xl-0" >

                                <div className="row g-0">

                                    <div className="col-lg-6">

                                        <div className="card-body  p-md-1 mx-md-4 mt-4 bg-white rounded-lg justify-content-center align-items-center shadow-lg"
                                            style={{ backgroundColor: '#ffffff', maxWidth: '600px', borderRadius: '1rem' }}>

                                            <div className="mb-0 p-0">

                                                <div className="d-flex justify-content-between">

                                                    <p className='pt-4 px-4 flex-wrap fs-5'>
                                                        welcome to <span className="fs-2 fw-bold pb-2" style={customFontStyle}>Service360</span>
                                                    </p>

                                                </div>

                                                <div className="d-flex pb-3">
                                                    <h1 className="fw-bold px-4">SignIn</h1>
                                                </div>

                                            </div>

                                            <form action="" className="my-2 mx-4">

                                                <div>
                                                    <div className="mb-3">
                                                        <p className="mb-0">Enter your email address<span style={{ color: 'red' }}>*</span></p>
                                                        <div className="input-group align-items-center">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="service360@gmail.com"
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                autoFocus
                                                                required
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="input-group mb-3">
                                                        <p className="mb-0">Enter your password<span style={{ color: 'red' }}>*</span></p>
                                                        <div className="input-group ">
                                                            <input
                                                                type={passwordType}
                                                                className="form-control"
                                                                placeholder="Enter password"
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                required
                                                            />
                                                            <span className="input-group-text">
                                                                <button
                                                                    className="btn btn-outline-dark border-0 focus-visible" // Add focus-visible class here
                                                                    type="button"
                                                                    id="button-addon1"
                                                                    onClick={showHidePassword}
                                                                >
                                                                    {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                                                </button>
                                                            </span>
                                                        </div>
                                                        {errorMessage && <p className="text-danger p-0 m-0">{errorMessage}</p>}
                                                    </div>


                                                </div>

                                                <div className="d-flex align-items-center justify-content-center pb-4">
                                                    <StyledButton
                                                        className="btn btn-dark btn-block"
                                                        type="button"
                                                        onClick={() => LoginLink(email, password)}
                                                    >
                                                        Sign in
                                                    </StyledButton>
                                                </div>

                                                <div>
                                                    {/* Your other content here */}
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <Link
                                                            className="text-primary mb-2 font-medium-bold"
                                                            style={{ textDecoration: 'none' }}
                                                            to={forgotPasswordLink}
                                                        >
                                                            Forgot password?
                                                        </Link>
                                                        <Link
                                                            className="text-primary font-medium-bold"
                                                            style={{ textDecoration: 'none' }}
                                                            onClick={toggleModal}
                                                        >
                                                            Don't have an account?
                                                        </Link>
                                                    </div>

                                                    <Modal show={showModal} onHide={toggleModal}>
                                                        <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                                                            <Modal.Title>Sign Up As</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <div className="d-flex flex-column justify-content-between mb-3">
                                                                <Link
                                                                    to={CustomerSignUpLink}
                                                                    className="text-primary mb-2 font-medium-bold p-2 m-2 rounded custom-link"
                                                                    style={{ textDecoration: 'none', background: '#f2f2f2', color: '#000' }}
                                                                >
                                                                    Customer
                                                                </Link>
                                                                <Link
                                                                    to={ServiceProviderSignUpLink}
                                                                    className="text-primary mb-2 font-medium-bold p-2 m-2 rounded custom-link"
                                                                    style={{ textDecoration: 'none', color: '#000', background: '#f2f2f2' }}
                                                                >
                                                                    Service Provider
                                                                </Link>
                                                                <Link
                                                                    to={AdvertiserSignUpLink}
                                                                    className="text-primary mb-2 font-medium-bold p-2 m-2 rounded custom-link"
                                                                    style={{ textDecoration: 'none', color: '#000', background: '#f2f2f2' }}
                                                                >
                                                                    Advertiser
                                                                </Link>
                                                            </div>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <StyledButton2 variant="secondary" onClick={toggleModal} className="btn btn-dark btn-block">
                                                                Close
                                                            </StyledButton2>
                                                        </Modal.Footer>
                                                    </Modal>

                                                </div>

                                            </form>

                                            <div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-lg-6 d-lg-flex d-none">

                                        <div className="d-lg-flex d-none">

                                            <div className="text-center">

                                                <img className="img-fluid rounded-3 h-100" src={loginPhoto} alt="LoginImage" style={{ backgroundColor: 'none' }} />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div >

            </section >

            {/*</ReactLinkContextProvider>*/}

        </div >


    )

}

export default Login