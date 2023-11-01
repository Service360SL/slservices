import React, { useState} from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import validator from "validator";
import axios from 'axios';

const serverLink = 'http://localhost:8080'

export default function AppContact() {

    const [data, setdata] = useState({
        email: '',
        fullName: '',
        contactNumber: '',
        message:'',
        emailStatus: false,
        messageErrorMessage: '',
        emailErrorMessage: '',
        fullNameErrorMessage: '',
        contactNumberErrorMessage: '',
        addressErrorMessage: '',
        fullNameErrorMessage: '',
        contactNumberErrorMessage: '',
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
                    });
                }
            ).catch(
                () => { alert("Check the Credentials For Contact Message!!!") }
            )
        }
    };

    return (
        <section id="contact" className="block contact-block">
            <Container fluid>
                <div className="title-holder">
                    <h2>Contact</h2>
                    <div className="subtitle">Get connected with us</div>
                </div>
                <Form className='contact-form'>
                    <Row>
                        <Col sm={4}>
                            <Form.Control type='text' placeholder="Enter your full name" value={data.fullName} onChange={(e) => setdata({ ...data, fullName: e.target.value })} required />
                            {data.emailErrorMessage && <p className="text-danger p-0 m-0">{data.emailErrorMessage}</p>}
                        </Col>
                        <Col sm={4}>
                            <Form.Control type='email' placeholder="Enter your email address" value={data.email} onChange={(e) => validateEmail(e.target.value)} required />
                            {data.emailErrorMessage && <p className="text-danger p-0 m-0">{data.emailErrorMessage}</p>}
                        </Col>
                        <Col sm={4}>
                            <Form.Control type='text' placeholder="Enter your contact number" value={data.contactNumber} maxLength={10} onChange={(e) => setdata({ ...data, contactNumber: e.target.value })} required />
                            {data.contactNumberErrorMessage && <p className="text-danger p-0 m-0">{data.contactNumberErrorMessage}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <Form.Control as='textarea' placeholder="Enter your message" value={data.message} onChange={(e) => setdata({ ...data, message: e.target.value })} required />
                            {data.messageErrorMessage && <p className="text-danger p-0 m-0">{data.messageErrorMessage}</p>}
                        </Col>
                    </Row>
                    <div className="btn-holder">
                        <Button type="submit" onClick={createMessage}>Submit</Button>
                    </div>

                </Form>
            </Container>

            <Container fluid>
                <div className="contact-info">
                    <ul>
                        <li>
                            <i className="fas fa-envelope"></i>
                            <a href="mailto:Service360@example.com" style={{color:'black'}}>service.360.50@gmail.com</a>
                        </li>
                        <li>
                            <i className="fas fa-phone"></i>
                            <a href="tel:+0123456788" style={{ color: 'black' }}>+01 234 567 88</a>
                        </li>
                        <li>
                            <i className="fas fa-map-marker-alt"></i>
                            <p style={{ color: 'black' }}>Nelson Place, Colombo, Sri Lanka</p>
                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}