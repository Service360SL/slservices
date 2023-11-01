import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import service360logo from '../../../../assets/images/header/logo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ActivityReport() {
    const [activityReports, setActivityReports] = useState([]);
    const [quotationData, setQuotationData] = useState({
        customerName: '',
        projectName: '',
        description: '',
        item: '',
        quantity: '',
        unitPrice: '',
    });

    const [viewJobData, setViewJobData] = useState(null);

    const [quoteId, setQuoteId] = useState(null); // Initialize quoteId as null
    const [subtotalAmount, setSubtotalAmount] = useState(0);

    const { id } = useParams();
    const jobId = parseInt(id, 10);

    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate(-1);
    };

    useEffect(() => {
        // Generate the quote ID only once when the component mounts
        const generatedQuoteId = Math.floor(Math.random() * 100000);
        setQuoteId(generatedQuoteId);
    }, []); // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewNewJobs/${jobId}`).then((res) => {
            console.log(res.data);
            setViewJobData(res.data);
        });
    }, []);

    if (!viewJobData) return 'No jobs sessions found!';

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReport = { ...quotationData };
        newReport.amount = (parseInt(newReport.quantity) * parseFloat(newReport.unitPrice)).toFixed(2);

        // Update subtotal when adding a new item
        setSubtotalAmount(prevSubtotal => prevSubtotal + parseFloat(newReport.amount));

        setActivityReports([...activityReports, newReport]);
        setQuotationData({
            ...quotationData,
            item: '',
            quantity: '',
            unitPrice: '',
        });
    };

    
    const customerdetails = [
        {
            name: 'Pranavan',
            address: 'No 11, Nelson Place Colombo'
        }
    ];

    // Handle "Complete and Send" button click event
    const handleCompleteAndSend = () => {
        const pdf = new jsPDF('p', 'mm', 'a4'); // Specify page size and orientation
        const pdfElement = document.querySelector('.quotation-pdf');

        if (pdfElement) {
            // Apply padding and other styles for printing
            pdfElement.style.padding = '25px 20px';
            pdfElement.style.border = '1px solid #000'; // Add a border for visibility

            // Use html2canvas to convert the content of .quotation-pdf to an image
            html2canvas(pdfElement).then((canvas) => {
                const imgData = canvas.toDataURL('image/png'); // Convert canvas to base64 image

                // Reset styles after capturing
                pdfElement.style.padding = '';
                pdfElement.style.border = '';

                // Calculate the dimensions for scaling the image to fit the PDF page
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                // Calculate scaling factors for width and height
                const scaleX = pdfWidth / imgWidth;
                const scaleY = pdfHeight / imgHeight;
                const scale = Math.min(scaleX, scaleY); // Choose the smaller scale factor

                // Add the image to the PDF with scaling
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * scale, imgHeight * scale);
                pdf.save('quotation.pdf'); // Save the PDF
            });
        }
    };


    // Calculate the subtotal and total
    const subtotal = activityReports.reduce((acc, report) => acc + parseFloat(report.amount), 0);
    const tax = 0.1; // 10% tax
    const total = (subtotal + (subtotal * tax)).toFixed(2);

    // Get today's date
    const today = new Date().toLocaleDateString();

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="ms-lg-2" style={{ fontSize: "28px", fontWeight: "bold" }}>Create Quotation</span>
                {/* Complete and Send Button */}
            </div>
            <span className="back-button-service-provider" onClick={handleBackClick} style={{ marginRight:'50px', marginTop:'-60px', maxWidth: '110px', fontWeight:600, float:'right' }}>
                <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                <p className="m-0 p-0 fs-5">&nbsp; Back</p>
            </span>

            <div className='quotation-pdf border mb-3 px-4 py-4'>
                {/*logo*/}
                <div className='d-flex flex-row align-items-center justify-content-center'>
                    <div className="d-flex me-auto col-2">
                        <img src={service360logo} alt="Service360 Logo" style={{ maxWidth: "120px" }} />
                    </div>
                    <div>
                        <span className='me-2 fs-4' style={{ color: '#00008B' }}>Quotation</span>
                    </div>
                </div>
                <hr className='primary' />
                {/* Bill to section */}
                <div className="row mt-4 mb-3">
                    <div className="col-md-6 d-flex flex-row">
                        <div className='d-flex flex-column ms-1 d-flex flex-column'>       {/* customer details */}
                            <span>{viewJobData.jobs.customer.firstname}</span>
                            <span>{viewJobData.jobs.customer.address}</span>
                        </div>
                    </div>
                    <div className="col-md-6 text-md-end d-flex flex-column">
                        <span>Quote Date: {today}</span>
                        <span>Quote ID: {quoteId}</span>
                    </div>
                </div>

                <table className="table table-bordered border-dark">
                    <thead className="thead-dark">
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activityReports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.item}</td>
                                <td>{report.quantity}</td>
                                <td>LKR {report.unitPrice}</td>
                                <td>LKR {report.amount}</td>
                            </tr>
                        ))}
                        {/* Subtotal row */}
                        <tr>
                            <td colSpan="3" className="text-end"><strong>Subtotal</strong></td>
                            <td><strong>LKR {subtotalAmount.toFixed(2)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <form onSubmit={handleSubmit} className="mb-5">
                <div className="form-group">
                    <label>Item:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="item"
                        value={quotationData.item}
                        onChange={(e) => setQuotationData({ ...quotationData, item: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        name="quantity"
                        value={quotationData.quantity}
                        onChange={(e) => setQuotationData({ ...quotationData, quantity: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Unit Price:</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="unitPrice"
                        value={quotationData.unitPrice}
                        onChange={(e) => setQuotationData({ ...quotationData, unitPrice: e.target.value })}
                    />
                </div>
                <div className='d-flex flex-row mt-2'>
                    <Button type="submit" className="btn-ServiceProvider-1">Add Item</Button>
                    <Button onClick={handleCompleteAndSend} className="btn-ServiceProvider-2 d-flex ms-auto" disabled={activityReports.length === 0}>Complete</Button>
                </div>
            </form>
        </div>
    );
}

export default ActivityReport;