import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/Viewvacancy.css';
import BgImage from '../../../assets/images/header/Background.png';

// Define a functional component to delete a quotation
const Delete = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="btn btn-viewvacancy-form-t"
                style={{
                    width: '15%',
                    height: '28px',
                    border: '1px solid #ced4da',
                    fontSize: '14px',
                    padding: '0 5px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    fontWeight: '500',
                    textTransform: 'none',
                    background: 'black',
                    '@media (max-width: 768px)': {
                        width: '100%',
                    },
                }}
                onClick={handleShow}
            >
                <i className="my-customer-table-icon bi bi-trash h7"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <p>Are you sure you want to delete this quotation?</p>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="btn btn-viewvacancy-form-a"
                        style={{
                            width: '15%',
                            height: '38px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            padding: '0 8px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            fontWeight: '500',
                            textTransform: 'none',
                            background: 'black',
                            '@media (max-width: 768px)': {
                                width: '60%',
                            },
                        }}
                        onClick={handleClose}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="btn btn-viewvacancy-form-r"
                        style={{
                            width: '15%',
                            height: '38px',
                            border: '1px solid #ced4da',
                            fontSize: '14px',
                            padding: '0 8px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            fontWeight: '500',
                            textTransform: 'none',
                            background: 'rgb(126, 123, 123)',
                            '@media (max-width: 768px)': {
                                width: '60%',
                            },
                        }}
                        onClick={handleClose}
                    >
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default function RequestedQuotation() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const [quotations, setQuotations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Update the URL to match your backend API
        fetch('http://localhost:8080/auth/quotation?isQuotation=true') // Change the URL
            .then((response) => response.json())
            .then((data) => {
                setQuotations(data);
            })
            .catch((error) => {
                console.error('Error fetching quotations:', error);
            });
    };

    // Other code (filtering, pagination) remains the same

    return (
        <>
            <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
                <div className="vacancy-container background-total accordion " >
                    <div className="col d-flex flex-row justify-content-between">
                        <div className='d-flex flex-row gap-4 p-3 '>
                            <p className="text-dark fs-4 fw-bold vacancytext"> Requested Quotation</p>
                        </div>
                    </div>
            <div className="my-customer-table-container">
                <Table className="my-customer-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}>
                                <b>Date</b>
                            </th>
                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}>
                                <b>Service Title</b>
                            </th>                           
                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}>
                                <b>Due Date</b>
                            </th>
                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}>
                                <b>Action</b>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.map((quotation, index) => (
                            <tr key={index}>
                                <td style={{ width: '16.67%' }}>{quotation.posteddate}</td>
                                <td style={{ width: '16.67%' }}>{quotation.servicename}</td>
                                <td style={{ width: '16.67%' }}>{quotation.duedate}</td>
                                <td style={{ width: '16.67%' }}>
                                    <Delete />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            </div>
            </div>

            {/* Existing code for pagination */}
            {/* ... */}
        </>
    );
}
