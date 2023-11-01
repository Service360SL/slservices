
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/Viewvacancy.css';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import BgImage from '../../../assets/images/header/Background.png';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const pdfUrl = process.env.PUBLIC_URL + '/pdf/Customer.pdf';

    return (
        <div className="pdf-viewer">
            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} width={480} className='cuspdfpopup' />
                ))}
            </Document>
        </div>
    );
};



const Accept = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" style={{
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
                }
            }} onClick={handleShow} >
                <i className="my-customer-table-icon bi bi-check2-square h7"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Accept Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><p>You are accepting this Quotation.</p></center>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-viewvacancy-form-a" style={{
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
                            width: '70%',
                        }
                    }} onClick={handleClose}>
                        Accept
                    </Button>
                    <Button variant="btn btn-viewvacancy-form-r" style={{
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
                            width: '70%',
                        }
                    }} onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


const View = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" style={{
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
                }
            }} onClick={handleShow} >
                <i className="my-customer-table-icon bi bi-eye-fill h7"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title> Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <PDFViewer />
                </Modal.Body>


            </Modal>
        </>
    );
};


const Reject = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" style={{
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
                }
            }} onClick={handleShow} >
                <i className="my-customer-table-icon bi bi-trash h7"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Delete Quotation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><p>Are you sure to delete?</p></center>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="btn btn-viewvacancy-form-a" style={{
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
                        }
                    }} onClick={handleClose}>
                        Yes
                    </Button>
                    <Button variant="btn btn-viewvacancy-form-r" style={{
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
                        }
                    }} onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


export default function ReceivedQuotation() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust this value based on how many items you want per page

   

    const [quotations, setQuotations] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://localhost:8080/auth/quotationpdf') // Replace with the actual API endpoint
            .then((response) => response.json())
            .then((data) => {
                setQuotations(data);
            })
            .catch((error) => {
                console.error('Error fetching quotations:', error);
            });
    };

   


    return (
        <>
            <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
                <div className="vacancy-container background-total accordion " >
                    <div className="col d-flex flex-row justify-content-between">
                        <div className='d-flex flex-row gap-4 p-3 '>
                            <p className="text-dark fs-4 fw-bold vacancytext">Quotation</p>
                        </div>
                    </div>



                <div className="my-customer-table-container" >
                    <Table className="my-customer-table" striped bordered hover>
                        <thead>
                            <tr>
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Date</b></th>
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Service Title</b></th>
                                {/* <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Amount</b></th> */}
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>DueDate</b></th>
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Action</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.map((quotation, index) => (
                                <tr key={index}>
                                    <td style={{ width: '16.67%' }}>{quotation.posteddate}</td>
                                    <td style={{ width: '16.67%' }}>{quotation.servicename}</td>
                                    {/* <td style={{ width: '16.67%' }}>{quotation.amount}</td> */}
                                    <td style={{ width: '16.67%' }}>{quotation.duedate}</td>
                                    <td style={{ width: '16.67%' }}>
                                        <View />
                                        &nbsp; &nbsp;
                                        <Accept />
                                        &nbsp; &nbsp;
                                        <Reject />
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
</div>
           
        </>
    );
}