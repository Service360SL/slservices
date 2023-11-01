
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/Viewvacancy.css';
import BgImage from '../../../assets/images/header/Background.png';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams, useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const pdfUrl = process.env.PUBLIC_URL + '/pdf/pdfs.pdf';

  return (
    <div className="pdf-viewer">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={480} className='cuspdfCVpopup' />
        ))}
      </Document>
    </div>
  );
};

const Pdf = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="btn btn-viewvacancy-form-t" style={{
        width: '9%',
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
        <i className="my-customer-table-icon bi bi-file-pdf-fill h7"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
          <Modal.Title> Cv of ServiceProvider</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <PDFViewer />
        </Modal.Body>


      </Modal>
    </>
  );
};
function VacancyPopup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="btn btn-viewvacancy-form-t" style={{
        width: '9%',
        height: '28px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 3px',
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
          <Modal.Title>Vacancy Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="vacancy-form">

            <div className="vacancy-form-group">
              <Row> <Col className='col-4'><label for="title">Name </label></Col>
                <Col className='col-8'><input type="text" name="name" className="form-control" id="name" Value="Alex" />
                </Col> </Row>
            </div>
            <div className="vacancy-form-group">
              <Row> <Col className='col-4'><label for="Mobile_number">Mobile Number </label></Col>
                <Col className='col-8'> <input type="text" name="mobile_number" className="form-control" id="mobile_number" Value="079-3388311" />
                </Col> </Row>
            </div>
            <div className="vacancy-form-group">
              <Row> <Col className='col-4'>  <label for="location">Location</label></Col>
                <Col className='col-8'>  <input type="text" name="location" className="form-control" id="location" Value="Wellawatte" />
                </Col> </Row>
            </div>
            <div className="vacancy-form-group">
              <Row> <Col className='col-4'><label for="email">Email</label></Col>
                <Col className='col-8'> <input type="text" name="email" className="form-control" id="email" Value="K5Vino@gmail.com" />
                </Col> </Row>
            </div>
            <div className="vacancy-form-group">
              <Row> <Col className='col-4'><label for="qualification">Educational Qualification</label></Col>
                <Col className='col-8'> <input type="text" name="qualification" className="form-control" id="qualification" Value="Ordinary Level" />
                </Col> </Row>
            </div>
            <div className="vacancy-form-group">
              <Row> <Col className='col-4'> <label for="experience">Work Experience</label></Col>
                <Col className='col-8'> <input type="text" name="experience" className="form-control" id="experience" Value="3 yrs" />
                </Col> </Row>
            </div>


          </form>
        </Modal.Body>

      </Modal>
    </>
  );
}

const Accept = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="btn btn-viewvacancy-form-t" style={{
        width: '9%',
        height: '28px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 3px',
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
          <Modal.Title>Accept Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center><p>You are accepting this Application</p></center>
          {/* <form className="vacancy-form">
                        <div className="vacancy-form-group">
                            <label for="shedule">Shedule a date & time for an interview <span style={{ color: "red" }}>&nbsp;*</span> </label>                      
                            <input type="date" name="date" className="form-control" id="date" />   
                            <input type="time" name="time" className="form-control" id="time" />                            </div>     
                           </form> */}
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


const Reject = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="btn btn-viewvacancy-form-t" style={{
        width: '9%',
        height: '28px',
        border: '1px solid #ced4da',
        fontSize: '14px',
        padding: '0 3px',
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
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }} >
          <Modal.Title>Delete </Modal.Title>
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

export default function ViewVacancyReply() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this value based on how many items you want per page

  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const quotations = [
    { date: '16/08/2023', serviceProvider: 'Alex', status: 'Pending' },
    { date: '15/08/2023', serviceProvider: 'VinothKhan', status: 'Pending' },
    { date: '14/08/2023', serviceProvider: 'Chris', status: 'Pending' },
    { date: '13/08/2023', serviceProvider: 'Perera', status: 'Pending' },
    { date: '12/08/2023', serviceProvider: 'David', status: 'Pending' },
    { date: '11/08/2023', serviceProvider: 'Willison', status: 'Pending' },
    { date: '11/08/2023', serviceProvider: 'Daniel', status: 'Pending' },
    { date: '10/08/2023', serviceProvider: 'Vijay', status: 'Pending' },

  ];

  const filteredQuotations = quotations.filter((quotation) => {
    const isDateMatch = (!fromDate || new Date(quotation.date) >= new Date(fromDate)) &&
      (!toDate || new Date(quotation.date) <= new Date(toDate));

    return (
      isDateMatch &&
      (quotation.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quotation.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotations = filteredQuotations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredQuotations.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
    setCurrentPage(1);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
        <div className="back-button" onClick={handleBackClick} style={{ marginLeft: '10px' }}>
          <div className="back-icon">
            <i className="bi bi-arrow-left-circle-fill fs-3"></i>
          </div>
          <div className="back-text">
            <p className="m-0 p-0">Back</p>
          </div>
        </div>
        <div className="vacancy-container background-total accordion " >
          <div className="col d-flex flex-row justify-content-between">

            <div className='d-flex flex-row gap-4 p-3 '>
              <p className="text-dark fs-4 fw-bold vacancytext">Vacancy Responses</p>
            </div>
          </div>

          <Form className="nav-search">
            <div className="d-flex flex-wrap justify-content-center">
              <div className='col-sm-6 col-md-4 col-lg-3 col-xl-3 m-3'>
                <div className="input-group m-0">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className=""
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
              </div>
              <div className='col-sm-6 col-md-4 col-lg-3 col-xl-3 m-3 date-picker-container'>
                <div className="input-group">
                  <Form.Control
                    type="date"
                    placeholder="From Date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    style={{ height: '45px' }}

                  />

                </div>
              </div>
              <div className='col-sm-6 col-md-4 col-lg-3 col-xl-3 m-3 date-picker-container'>
                <div className="input-group">
                  <Form.Control
                    type="date"
                    placeholder="To Date"
                    value={toDate}
                    onChange={handleToDateChange}
                    style={{ height: '45px' }}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>



        <div className="my-customer-table-container">
          <Table className="my-customer-table" striped bordered hover>
            <thead>
              <tr>
                <th className="my-customer-table-th-1"><b>Date</b></th>
                <th className="my-customer-table-th-1"><b>Service Provider</b></th>
                {/* <th className="my-customer-table-th-2"><b>Status</b></th> */}
                <th className="my-customer-table-th-2"><b>Action</b></th>
              </tr>
            </thead>
            <tbody>
              {currentQuotations.map((quotation, index) => (
                <tr key={index}>
                  <td>{quotation.date}</td>
                  <td>{quotation.serviceProvider}</td>
                  {/* <td>{quotation.status}</td> */}
                  <td>
                    {/* <Button variant="primary" className="my-customer-table-btn">
                                            <Link style={{ color: 'white' }} to={`/customer/ViewVacancyResponse`}>
                                                <i className="my-customer-table-icon bi bi-eye-fill h6"></i>
                                            </Link>
                                        </Button> */}
                    < VacancyPopup />
                    &nbsp; &nbsp;
                    <Pdf />
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

        <br></br>


        <div className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-element ${currentPage === index + 1 ? 'active' : ''}`}
              style={{ backgroundColor: '#292D32', color: '#fff', width: '35px', height: '35px', fontSize: '16px' }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>


      </div>
    </>
  );
}
