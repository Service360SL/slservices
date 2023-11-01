import React from 'react';
import '../../../style/User/ServiceCard.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import BgImage from '../../../assets/images/header/Background.png';
import { useState } from 'react';
import { Link } from 'react-router-dom'

// Placeholder data for rating
const rating = 4;

// Placeholder Popup component
const Popup = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant="cutomerShareSP_primary" onClick={handleShow} style={{
                bottom: "1.5px", fontsize: '1rem',
                fontfamily: "Rubik, sansserif",
            }}>
                <i className="bi bi-share h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ position: "relative", }}>Share</span>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Share through</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><p><i className="bi bi-whatsapp"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i className="bi bi-facebook"></i> &nbsp;&nbsp;&nbsp;&nbsp;<i className="bi bi-instagram"></i></p></center>
                </Modal.Body>

            </Modal>
        </>
    );
};


function JobCard(props) {
    const { avatarImage, dateposted, customername, title, subInfo, duedate, location, contactNumber, serviceId } = props;

    return (
        <div className="single-Service-card" style={{ backgroundImage: `url(${BgImage})`, height: '50%' }}>
            <div className="Service-card-header">
                <Row>
                    <Col>
                        <img src={avatarImage} alt="avatar" className="Service-card-avatar" />
                    </Col>
                    <Col className='d-flex flex-column'>
                        <span className="Service-card-title1">{customername}</span>
                        <span className="Service-card-date">{dateposted}</span>
                    </Col>
                    <Col></Col>
                    <Col className='star' style={{ width: "200px", marginTop: '-40px' }}>

                    </Col>
                </Row>
            </div>
            <div className="Service-card-body">
                <div className="Service-card-body-left">
                    <span className="sinlge-Service-title fw-3" style={{ fontWeight: "600" }}>{title}</span>
                    <br />
                    <span className="sinlge-Service-sub-info" style={{ fontWeight: "400" }}>{subInfo}</span>
                    <br />
                    <span className="sinlge-Service-sub-info"><i className="bi bi-geo-alt-fill"></i>&nbsp; Location : {location} &nbsp;&nbsp;  <i className="bi bi-calendar-event">&nbsp;&nbsp;</i>Due Date : {duedate}</span>
                    <br />
                </div>
            </div>
            <hr />
            <div className="Service-card-footer">
                <Link to="/login" className="btn btn-default Service-card-footer-btn" id="Service-card-footer-btn-view">
                    <i className="bi bi-eye h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ position: "relative", bottom: "1.5px" }}>View</span>
                </Link>
            </div>
        </div>
    );
}

export default JobCard;