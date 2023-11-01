import React from 'react';
import UserImg from '../../../assets/images/header/user.jpg';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BgImage from '../../../assets/images/header/Background.png';




function ViewVacancyResponse() {
    return (<div className='card2'>
        <p> <Link to="/customer/ViewVacancy" className='fw-bold navLink d-lg-inline d-sm-none d-md-none d-none' style={{ color: "Black" }}><i className="bi bi-arrow-left-circle-fill"></i>
            &nbsp;&nbsp;Back</Link></p>
        <div className="VacancyForm-container" style={{ backgroundImage: `url(${BgImage})` }}>

            <h3>Ac Repair</h3>

            <form className="vacancy-form">
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'><label for="title">Name </label></Col>
                        <Col className='col-6'><input type="text" name="name" className="form-control" id="name" Value="Vinoth kumar" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'><label for="Mobile_number">Mobile Number </label></Col>
                        <Col className='col-6'> <input type="text" name="mobile_number" className="form-control" id="mobile_number" Value="079-3388311" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'>  <label for="location">Location</label></Col>
                        <Col className='col-6'>  <input type="text" name="location" className="form-control" id="location" Value="Wellawatte" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'><label for="email">Email</label></Col>
                        <Col className='col-6'> <input type="text" name="email" className="form-control" id="email" Value="K5Vino@gmail.com" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'><label for="qualification">Qualification</label></Col>
                        <Col className='col-6'> <input type="text" name="qualification" className="form-control" id="qualification" Value="xxxxxx" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'> <label for="experience">Work Experience</label></Col>
                        <Col className='col-6'> <input type="text" name="experience" className="form-control" id="experience" Value="3 yrs" />
                        </Col> </Row>
                </div>
                <div className="vacancy-form-group">
                    <Row> <Col className='col-3'>  <label htmlFor="file">Files</label></Col></Row>
                </div>



                <br></br>
            </form>
        </div></div>
    );




};

export default ViewVacancyResponse;

