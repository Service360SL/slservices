import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/PostVacancyForm.css';
import BgImage from '../../../assets/images/header/Background.png';
import { Link } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';

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
          <Page key={`page_${index + 1}`} pageNumber={index + 1} width={700} height={500} />
        ))}
      </Document>
    </div>
  );
};
function CustomerComplaints() {
  return (
    <div className='card2'>
      <p> <Link to="" className='fw-bold navLink d-lg-inline d-sm-none d-md-none d-none'><i className="bi bi-arrow-left-circle-fill"></i></Link>
        &nbsp;&nbsp;Back</p>
      <h3>Quotation</h3>
      <div className="VacancyForm-container" style={{ backgroundImage: `url(${BgImage})` }}>
        <PDFViewer />

      </div></div>
  );




};

export default CustomerComplaints;

