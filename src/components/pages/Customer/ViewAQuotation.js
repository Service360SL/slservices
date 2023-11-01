import React from 'react'
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import '../../../style/Customer/Viewvacancy.css';
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
        width: '13%',
        height: '34px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 8px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: '500',
        textTransform: 'none',
        background: 'black',
        '@media (max-width: 768px)': {
          width: '100%',
        }
      }} onClick={handleShow} >
        <i className="my-customer-table-icon bi bi-pen h6"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
          <Modal.Title>Accept Quotation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center><p>You are accepting this Quotation with value of Rs. 8000</p></center>
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
        width: '13%',
        height: '34px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 8px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: '500',
        textTransform: 'none',
        background: 'black',
        '@media (max-width: 768px)': {
          width: '100%',
        }
      }} onClick={handleShow} >
        <i className="my-customer-table-icon bi bi-eye-fill h6"></i>
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
        width: '13%',
        height: '34px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 8px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: '500',
        textTransform: 'none',
        background: 'black',
        '@media (max-width: 768px)': {
          width: '100%',
        }
      }} onClick={handleShow} >
        <i className="my-customer-table-icon bi bi-trash h6"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
          <Modal.Title>Reject Quotation</Modal.Title>
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
            Reject
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
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default function ViewAQuotation() {
  return (
    <>
      <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
        <div className="vacancy-container background-total accordion mb-4 me-3" >
          <div className="col d-flex flex-row justify-content-between" style={{ backgroundImage: `url(${BgImage})` }}>
            <div className='d-flex flex-row gap-4 p-3 '>
              <p className="text-dark fs-4 fw-bold vacancytext"> Quotation </p>
            </div>
          </div>
          <p> <Link to="/customer/ReceivedQuotation" className='fw-bold navLink d-lg-inline d-sm-none d-md-none d-none' style={{ color: 'black' }}><i className="bi bi-arrow-left-circle-fill"></i></Link>
            &nbsp;&nbsp;Back</p>
          {/* <Form className="nav-search col-4"  >
                    <Form.Control
                        type="search"
                        placeholder=""
                        className=""
                        aria-label="Search"
                    />
                    <Button id="view-jobs-button">Search</Button>
                </Form> */}
        </div>

        <div className="my-customer-table-container">
          <Table className="my-customer-table" striped bordered hover>
            <thead>
              <tr>
                <th className="my-customer-table-th-1"><b>Date</b></th>
                {/* <th className="my-customer-table-th-1 col-3">Quotation ID</th> */}
                <th className="my-customer-table-th-2"><b>Service Provider</b></th>
                <th className="my-customer-table-th-2"><b>Amount</b></th>
                <th className="my-customer-table-th-2"><b>Action</b></th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>27/07/2023</td>
                {/* <td>Ac Repair</td> */}
                <td>Vijay Deva</td>
                <td>Rs. 8000</td>
                <td>
                  <View />
                  &nbsp; &nbsp;
                  <Accept />
                  &nbsp; &nbsp;
                  <Reject />
                </td>
              </tr>

            </tbody>
          </Table>
        </div>
      </div>

    </>
  );
}