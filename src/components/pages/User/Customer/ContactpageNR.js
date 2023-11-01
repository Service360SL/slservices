import React, { useState, useEffect } from 'react';
import validator from "validator";
import axios from 'axios';
import image from '../../../../assets/images/header/Background.png';
import loginPhoto from '../../../../assets/images/home/contact.jpg'
import styled from 'styled-components';

const serverLink = 'http://localhost:8080'

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

function ContactpageNR() {
    const [data, setdata] = useState({
        email: '',
        fullName: '',
        contactNumber: '',
        message: '',
        emailStatus: false,
        messageErrorMessage: '',
        emailErrorMessage: '',
        fullNameErrorMessage: '',
        contactNumberErrorMessage: '',
        addressErrorMessage: '',
        fullNameErrorMessage: '',
        contactNumberErrorMessage: '',
        isMessageSent:false,
    });

    const validateEmail = (emailInputValue) => {
        if (validator.isEmail(emailInputValue)) {
            setdata({ ...data, email: emailInputValue, emailStatus: true, emailErrorMessage: '' });
        } else {
            setdata({ ...data, email: emailInputValue, emailStatus: false, emailErrorMessage: 'Invalid email' });
        }
    };

    const createMessage = (e) => {

        e.preventDefault();

        let isError = false;
        let emailErrorMessage = '';
        let fullNameErrorMessage = '';
        let messageErrorMessage = '';
        let contactNumberErrorMessage = '';

        if (data.email.trim() === '') {
            isError = true;
            emailErrorMessage = 'Email is required';
        }

        if (!/^[A-Za-z\s]*$/.test(data.fullName)) {
            isError = true;
            fullNameErrorMessage = 'Should contain only letters and spaces';
        }

        if (!validator.isNumeric(data.contactNumber)) {
            isError = true;
            contactNumberErrorMessage = 'Should contain only digits';
        }

        if (data.contactNumber.length < 9) {
            isError = true;
            contactNumberErrorMessage = 'Invalid contact number';
        }

        if (data.fullName.trim() === '') {
            isError = true;
            fullNameErrorMessage = 'Full name is required';
        }

        if (data.message.trim() === '') {
            isError = true;
            messageErrorMessage = 'Message is required';
        }

        if (data.contactNumber.trim() === '') {
            isError = true;
            contactNumberErrorMessage = 'Phone Number is required';
        }

        setdata({
            ...data,
            emailErrorMessage,
            fullNameErrorMessage,
            contactNumberErrorMessage,
            messageErrorMessage,
        });

        if (!isError) {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('fullName', data.fullName);
            formData.append('contactNumber', data.contactNumber);
            formData.append('message', data.message);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            axios.post(serverLink + '/auth/addContactMessage', formData).then(
                (response) => {
                    console.log(response.data);
                    setdata({
                        email: '',
                        fullName: '',
                        contactNumber: '',
                        message: '',
                        emailErrorMessage: '',
                        fullNameErrorMessage: '',
                        contactNumberErrorMessage: '',
                        messageErrorMessage: '',
                        isMessageSent:true,
                    });
                }
            ).catch(
                () => { alert("Check the Credentials For Contact Message!!!") }
            )
        }
    };

    useEffect(() => {
        if (data.isMessageSent) {
            const timer = setTimeout(() => {
                setdata({ ...data, isMessageSent: false });
            }, 10000); // 10,000 milliseconds (10 seconds)

            return () => clearTimeout(timer); // Clean up the timer when the component unmounts
        }
    }, [data.isMessageSent]);

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

                                                <div className="d-flex pb-1 justify-content-center">
                                                    <h3 className='text-center' style={{ color: 'gray' }}>-Get in Touch with Us!-</h3>
                                                </div>

                                                {data.isMessageSent && (
                                                    <div className="text-center">
                                                        <p className="text-success">Message sent successfully!</p>
                                                    </div>
                                                )}

                                            </div>

                                            <form action="" className="my-2 mx-4">

                                                <div className="mb-3">
                                                    <div className='align-items-center'>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Full Name"
                                                            value={data.fullName}
                                                            onChange={(e) => setdata({ ...data, fullName: e.target.value })}
                                                            required
                                                        />
                                                        {data.fullNameErrorMessage && <p className="text-danger p-0 m-0">{data.fullNameErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="align-items-center">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="Enter your email address"
                                                            value={data.email}
                                                            onChange={(e) => validateEmail(e.target.value)}
                                                            required
                                                        />
                                                        {data.emailErrorMessage && <p className="text-danger p-0 m-0">{data.emailErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className='align-items-center'>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter your Contact Number"
                                                            value={data.contactNumber}
                                                            onChange={(e) => setdata({ ...data, contactNumber: e.target.value })}
                                                            required
                                                            maxLength={10}
                                                        />
                                                        {data.contactNumberErrorMessage && <p className="text-danger p-0 m-0">{data.contactNumberErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <div className="align-items-center">
                                                        <textarea
                                                            type="textarea"
                                                            className="form-control"
                                                            placeholder="Enter your meassage"
                                                            value={data.message}
                                                            onChange={(e) => setdata({ ...data, message: e.target.value })}
                                                            required
                                                        />
                                                        {data.messageErrorMessage && <p className="text-danger p-0 m-0">{data.messageErrorMessage}</p>}
                                                    </div>
                                                </div>

                                                <div className="text-center">

                                                    <div className="d-flex align-items-center justify-content-center pb-4">

                                                        <StyledButton className="btn btn-dark btn-block" type="button" onClick={createMessage}>

                                                            Submit

                                                        </StyledButton>

                                                    </div>

                                                </div>

                                            </form>

                                            <div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="col-xl-6 my-5 justify-content-center align-items-center rounded" style={{ background: `url(${loginPhoto})`, backgroundSize: 'cover'}} />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ContactpageNR;