import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import loginPhoto from '../../assets/images/home/customerSignUP.png'
import styled from 'styled-components';
import validator from "validator";
import '../../style/Login.css'
import { Alert } from 'react-bootstrap';
import image from '../../assets/images/header/Background.png'
import { AuthenticationContext } from "../../ContextFiles/Authentication/AuthenticationContextProvider";
import { Spinner } from 'react-bootstrap';

const customFontStyle = {
    fontFamily: "Roboto",
    color: '#9F390D'
};

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


const CustomerSignUP = () => {

    const { login } = useContext(AuthenticationContext);

    const { customerSignUp } = useContext(AuthenticationContext);

    const { loading } = useContext(AuthenticationContext);

    const [data, setdata] = useState({
        email: '',
        firstName: '',
        lastName: '',
        nicNumber: '',
        contactNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
        confirmPasswordErrorMessage: '',
        emailStatus: false,
        passwordType: 'password',
        isPasswordHidden: true,
        errorMessageStatus: false,
        confirmPasswordStatus: false,
        emailErrorMessage: '',
        firstNameErrorMessage: '',
        lastNameErrorMessage: '',
        nicNumberErrorMessage: '',
        contactNumberErrorMessage: '',
        addressErrorMessage: '',
        firstNameErrorMessage: '',
        lastNameErrorMessage: '',
        nicNumberErrorMessage: '',
        contactNumberErrorMessage: '',
        addressErrorMessage: '',
        passwordErrorMessage: '',
    });

    const errorMessage = 'Password requires to have atleast one lower case, one uppercase, one number, one symbol and be minimum of 8 characters in lengths';

    const showHidePassword = () => {
        if (data.isPasswordHidden) {
            setdata({ ...data, passwordType: 'text', isPasswordHidden: false });
        } else {
            setdata({ ...data, passwordType: 'password', isPasswordHidden: true });
        }
    };

    const validatePassword = (passwordInputValue) => {
        if (validator.isStrongPassword(passwordInputValue, {
            minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1
        })) {
            setdata({ ...data, password: passwordInputValue, errorMessageStatus: false });
        } else {
            setdata({ ...data, password: passwordInputValue, errorMessageStatus: true });
        }
    };

    const validateConfirmPassword = (confirmPasswordInputValue) => {
        if (data.password === confirmPasswordInputValue) {
            setdata({ ...data, confirmPassword: confirmPasswordInputValue, confirmPasswordErrorMessage: 'Password matches', confirmPasswordStatus: false });
        } else {
            setdata({ ...data, confirmPassword: confirmPasswordInputValue, confirmPasswordErrorMessage: 'Passwords do not match', confirmPasswordStatus: true });
        }
    };

    const validateEmail = (emailInputValue) => {
        if (validator.isEmail(emailInputValue)) {
            setdata({ ...data, email: emailInputValue, emailStatus: true, emailErrorMessage: '' });
        } else {
            setdata({ ...data, email: emailInputValue, emailStatus: false, emailErrorMessage: 'Invalid email' });
        }
    };

    const createUser = () => {
        let isError = false;
        let emailErrorMessage = '';
        let firstNameErrorMessage = '';
        let lastNameErrorMessage = '';
        let nicNumberErrorMessage = '';
        let contactNumberErrorMessage = '';
        let addressErrorMessage = '';
        let passwordErrorMessage = '';
        let confirmPasswordErrorMessage = '';

        if (data.email.trim() === '') {
            isError = true;
            emailErrorMessage = 'Email is required';
        }

        if (!validator.isAlpha(data.firstName)) {
            isError = true;
            firstNameErrorMessage = 'Should contain only letters';
        }

        if (!validator.isAlpha(data.lastName)) {
            isError = true;
            lastNameErrorMessage = 'Should contain only letters';
        }

        if (!validator.isNumeric(data.contactNumber)) {
            isError = true;
            contactNumberErrorMessage = 'Should contain only digits';
        }

        if (data.contactNumber.length !== 10) {
            isError = true;
            contactNumberErrorMessage = 'Invalid contact number';
        }

        if (!/^(\d{9}[vV]|\d{12})$/.test(data.nicNumber)) {
            isError = true;
            nicNumberErrorMessage = 'Invalid NIC number';
        }

        if (data.firstName.trim() === '') {
            isError = true;
            firstNameErrorMessage = 'First name is required';
        }

        if (data.lastName.trim() === '') {
            isError = true;
            lastNameErrorMessage = 'Last name is required';
        }

        if (data.nicNumber.trim() === '') {
            isError = true;
            nicNumberErrorMessage = 'NIC is required';
        }

        if (data.contactNumber.trim() === '') {
            isError = true;
            contactNumberErrorMessage = 'Number is required';
        }

        if (data.address.trim() === '') {
            isError = true;
            addressErrorMessage = 'Address is required';
        }

        if (data.password.trim() === '') {
            isError = true;
            passwordErrorMessage = 'Password is required';
        }

        if (data.confirmPassword.trim() === '') {
            isError = true;
            confirmPasswordErrorMessage = 'Confirm password is required';
        }

        setdata({
            ...data,
            emailErrorMessage,
            firstNameErrorMessage,
            lastNameErrorMessage,
            nicNumberErrorMessage,
            contactNumberErrorMessage,
            addressErrorMessage,
            passwordErrorMessage,
            confirmPasswordErrorMessage,
        });

        if (!isError) {
            customerSignUp({
                email: data.email,
                password: data.password,
                firstname: data.firstName,
                lastname: data.lastName,
                nic: data.nicNumber,
                phonenumber: data.contactNumber,
                address: data.address,
            });
        }
    };

    return (

        <div className="h-100" style={{ backgroundImage: `url(${image})` }}>

            <section className="h-100">

                <div className="container h-100">

                    <div className="row d-flex justify-content-center align-items-center h-100">

                        <div className="col-xl-10 offset-sm-2 offset-lg-4 offset-xl-0 my-lg-1 py-lg-1 my-xl-0 py-xl-0">

                            <div className="rounded-3 text-black my-lg my-xl-0 py-xl-0">

                                <div className="row g-0">

                                    <div className="col-xl-6">

                                        <div className="p-md-1 mx-md-2 my-5 bg-white rounded-lg justify-content-center align-items-center shadow-lg"
                                            style={{ backgroundColor: '#ffffff', maxWidth: '600px', borderRadius: '1rem' }}>

                                            <div className="mb-0 p-0">

                                                <div className="d-flex justify-content-between">

                                                    <p className='pt-4 px-4 flex-wrap fs-5'>
                                                        welcome to <span className="fs-2 fw-bold pb-2" style={customFontStyle}>Service360</span>
                                                    </p>

                                                </div>

                                                <div className="d-flex pb-1">
                                                    <h1 className="fw-bold px-4">SignUp</h1>
                                                </div>

                                            </div>

                                            {loading && (
                                                <div className="text-center">
                                                    <Spinner animation="border" variant="primary" />
                                                </div>
                                            )}

                                            <form action="" className="my-2 mx-4">

                                                <div className="mb-2">
                                                    <p className="mb-0">Enter your email address<span style={{ color: 'red' }}>*</span></p>
                                                    <div className="align-items-center">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Service360@gmail.com"
                                                            value={data.email}
                                                            onChange={(e) => validateEmail(e.target.value)}
                                                            autoFocus
                                                            required
                                                        />
                                                        {data.emailErrorMessage && <p className="text-danger p-0 m-0">{data.emailErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="justify-content-between mb-3 d-flex">
                                                    <div className='me-0 col-sm-6'>
                                                        <p className="mb-0">First Name<span style={{ color: 'red' }}>*</span></p>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="First Name"
                                                            value={data.firstName}
                                                            onChange={(e) => setdata({ ...data, firstName: e.target.value })}
                                                            required
                                                        />
                                                        {data.firstNameErrorMessage && <p className="text-danger p-0 m-0">{data.firstNameErrorMessage}</p>}
                                                    </div>

                                                    <div className='col-sm-5'>
                                                        <p className="mb-0">Last Name<span style={{ color: 'red' }}>*</span></p>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last Name"
                                                            value={data.lastName}
                                                            onChange={(e) => setdata({ ...data, lastName: e.target.value })}
                                                            required
                                                        />
                                                        {data.lastNameErrorMessage && <p className="text-danger p-0 m-0">{data.lastNameErrorMessage}</p>}
                                                    </div>

                                                </div>

                                                <div className="justify-content-between mb-3 d-flex ">
                                                    <div className='me-0 col-sm-5 col-sm-6'>
                                                        <p className="mb-0">NIC Number<span style={{ color: 'red' }}>*</span></p>
                                                        <input type="text" className="form-control"
                                                            placeholder="Enter NIC number"
                                                            value={data.nicNumber}
                                                            onChange={(e) => setdata({ ...data, nicNumber: e.target.value })}
                                                            required
                                                        />
                                                        {data.nicNumberErrorMessage && <p className="text-danger p-0 m-0">{data.nicNumberErrorMessage}</p>}
                                                    </div>

                                                    <div className='col-sm-5 col-lg-5'>
                                                        <p className="mb-0">Contact Number</p>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="0771234567"
                                                            value={data.contactNumber}
                                                            onChange={(e) => setdata({ ...data, contactNumber: e.target.value })}
                                                            required
                                                            maxLength={10}
                                                        />
                                                        {data.contactNumberErrorMessage && <p className="text-danger p-0 m-0">{data.contactNumberErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <p className="mb-0">Enter your Residential Address<span style={{ color: 'red' }}>*</span></p>
                                                    <div className="align-items-center">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="No-06, Nelson Place, Colombo, Sri Lanka"
                                                            value={data.address}
                                                            onChange={(e) => setdata({ ...data, address: e.target.value })}
                                                            required
                                                        />
                                                        {data.addressErrorMessage && <p className="text-danger p-0 m-0">{data.addressErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="mb-3 d-flex justify-content-between">
                                                    <div className='me-3'>
                                                        <p className="mb-0">Enter your Password<span style={{ color: 'red' }}>*</span></p>
                                                        <div className="input-group">
                                                            <input
                                                                type={data.passwordType}
                                                                className="form-control"
                                                                placeholder="Enter password"
                                                                value={data.password}
                                                                onChange={(e) => validatePassword(e.target.value)}
                                                                required
                                                            />
                                                            <span className="input-group-text">
                                                                <button
                                                                    className="btn btn-outline-dark border-0"
                                                                    type="button"
                                                                    id="button-addon1"
                                                                    onClick={showHidePassword}
                                                                >
                                                                    {data.isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                                                </button>
                                                            </span>
                                                        </div>
                                                        {data.passwordErrorMessage && <p className="text-danger p-0 m-0">{data.passwordErrorMessage}</p>}
                                                    </div>

                                                    <div>
                                                        <p className="mb-0">Confirm Password<span style={{ color: 'red' }}>*</span></p>
                                                        <div className="input-group">
                                                            <input
                                                                type={data.passwordType}
                                                                className="form-control"
                                                                placeholder="Confirm password"
                                                                value={data.confirmPassword}
                                                                onChange={(e) => validateConfirmPassword(e.target.value)}
                                                                required
                                                            />
                                                            <span className="input-group-text">
                                                                <button
                                                                    className="btn btn-outline-dark border-0"
                                                                    type="button"
                                                                    id="button-addon2"
                                                                    onClick={showHidePassword}
                                                                >
                                                                    {data.isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                                                </button>
                                                            </span>
                                                        </div>
                                                        {data.confirmPasswordErrorMessage && <p className="text-danger p-0 m-0">{data.confirmPasswordErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                {data.errorMessageStatus && (
                                                    <Alert variant="info" className="my-0 p-2 mb-2 rounded" dismissible>
                                                        <strong>info</strong>
                                                        <p className="d-flex justify-content-center">{errorMessage}</p>
                                                    </Alert>
                                                )}

                                                <div className="text-center">

                                                    <div className="d-flex align-items-center justify-content-center pb-4">

                                                        <StyledButton className="btn btn-dark btn-block" type="button" onClick={createUser}>

                                                            Signup

                                                        </StyledButton>

                                                    </div>

                                                    <p> Have an account? <Link className="text-primary" to={login}> Login </Link>  </p>

                                                </div>

                                            </form>

                                            <div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-xl-6 my-5 justify-content-center align-items-center rounded" style={{ background: `url(${loginPhoto})`, objectFit: 'cover' }} />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

    )

}

export default CustomerSignUP