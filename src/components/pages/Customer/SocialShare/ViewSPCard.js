import '../../../../style/Customer/ViewSPCard.css';
import UserImg from '../../../../assets/images/header/user.jpg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ViewServiceProvider from '../ViewServiceProvider';
import ServiceProvideimg from '../../../../assets/images/Customer/ServiceProvider1.png'
import imagePath from "../../../../assets/images/Customer/ServiceProvider1.jpg"

const Popup = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const allServices = [];

  return (
    <>
      <Button variant="cutomerShareSP_primary" onClick={handleShow}>
        <i className="bi bi-share h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;
        <span className="sharecustomer"
          style={{
            position: "relative",
            bottom: "1.5px",
            color: 'black',
            fontWeight: 'bold',

          }}>
          Share
        </span>
      </Button>


      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
          <Modal.Title>Share through</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center><p>
            <a href="https://web.whatsapp.com/">
              <i className="bi bi-whatsapp" style={{ fontSize: '30px', color: '#075e54' }}></i>&nbsp;&nbsp;&nbsp;&nbsp;
            </a>

            <a href="https://facebook.com/">
              <i className="bi bi-facebook" style={{ fontSize: '30px', color: '	#1877F2' }}></i> &nbsp;&nbsp;&nbsp;&nbsp;
            </a>

            <a href="https://www.instagram.com/accounts/login/?hl=en">
              <i className="bi bi-instagram" style={{
                fontSize: '30px',
                color: 'linear-gradient(45deg, #f58529, #e1306c, #c13584, #833ab4, #5851db, #405de6, #303fc0, #190c8d)'
              }} ></i>
            </a>
          </p></center>
        </Modal.Body>

      </Modal>
    </>
  );
};

function ViewSPCard({ spCard }) {
  const rating = spCard.review;
  return (
    <div className="single-SP-card" style={{ backgroundColor: '#ffffff;' }}>
      <div className="SP-card-header">
        <Row>
          <Col>
            <img src={spCard.profilePic} alt="avatar" className="SP-card-avatar" />
          </Col>
          <Col>
            <div className="SP-card-title d-flex gap-2">
              <span className="firstname">{spCard.firstname} </span> {" "}
              <span className="lastname"> {spCard.lastname}</span>
            </div>
          </Col>

          {/* <Col className='star'>
            <div className='rating'>
              {[1, 2, 3, 4, 5].map((index) => (
                <span key={index} className={`star ${rating >= index ? 'filled' : ''}`}>&#9733;</span>
              ))}
            </div>
          </Col> */}
        </Row>
      </div>
      <div className="SP-card-body">
        <div className="SP-card-body-left">
          <span className="sinlge-SP-sub-info">
            Service : {spCard.serviceCategories.map((category, categoryIndex) => (
              <span key={categoryIndex}>
                {category.services.map((service, serviceIndex) => (
                  <span key={serviceIndex}>
                    {service}
                    {serviceIndex < category.services.length - 1 && ', '}
                  </span>
                ))}
                {categoryIndex < spCard.serviceCategories.length - 1 && ', '}
              </span>
            ))}

            {" "}| Member since  {spCard.registrationdate}</span>
          <br />
          <span className="sinlge-SP-sub-info">  <i className="bi bi-geo-alt-fill"></i>&nbsp; Location: {spCard.district}
          </span>
          <br />
          <span className="SP-contact-info">
            Contact number: {spCard.phonenumber}
          </span>
          <br />
        </div>
      </div>
      <hr />
      <div className="SP-card-footer">
        <span
          className="btn btn-default SP-card-footer-btn"
          id="SP-card-footer-btn-view"
        >
          <i className="bi bi-eye h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{
            position: "relative",
            bottom: "1.5px"
          }}>

            <a href={`ViewServiceProvider/${spCard.userid}`}
              style={{ color: 'black' }}>
              View Profile
            </a>
          </span>
        </span>

        <span
          className="btn btn-default SP-card-footer-btn"
          id="SP-card-footer-btn-share"
        >
          <Popup />

        </span>
      </div>
    </div>
  );

}

export default ViewSPCard;