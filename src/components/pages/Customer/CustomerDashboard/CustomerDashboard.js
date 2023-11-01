import React, { useContext } from 'react';
import Card from "react-bootstrap/Card";
import { Row } from 'react-bootstrap';
import '../../../../style/Customer/CustomerDashboard.css'
import ResponsiveCalendar from '../../../layout/ResponsiveCalendar';
import profile_img_2 from '../../../../assets/images/Customer/projects.jpg'
import BgImage from '../../../../assets/images/header/Background.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Modal, Button, Col } from 'react-bootstrap';
import ServiceProvider1 from '../../../../assets/images/Customer/ServiceProvider1.jpg';
import ServiceProvider2 from '../../../../assets/images/Customer/ServiceProvider1.png';
import ServiceProvider3 from '../../../../assets/images/Customer/ServiceProvider3.jpg';
import { AuthenticationContext } from './../../../../ContextFiles/Authentication/AuthenticationContextProvider';
import { useLocation } from "react-router-dom";

function ProjectPopup({ title, serviceProvider, dueDate, imageSrc, }) {
    const [show, setShow] = useState(false);
    const location = useLocation()
    const { logout, userDetailsAfterAuthentication, authenticated, contentVisible } = useContext(AuthenticationContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" onClick={handleShow}>
                <i className="my-customer-table-icon bi bi-arrow-right-circle h5"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Col>
                            <img src={imageSrc} alt="Profile" className="ServiceProvider1" />
                        </Col>
                        <Col>Service Provider: {serviceProvider}</Col>
                        <Col>Due Date: {dueDate}</Col>
                        <Link to={`/customer/todoform`}> <Button variant='secondary' style={{ background: "#292d32", marginRight: '10px' }}>
                            <i className="bi bi-list-task"></i>  </Button></Link>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            <i className="bi bi-chat-fill"></i>                    </Button>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={`/customer/ViewServiceProvider`}>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            View Profile
                        </Button></Link>

                </Modal.Footer>
            </Modal>
        </>
    );
}

function HiredPopup({ title, serviceProvider, durationPeriod, imageSrc, }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" onClick={handleShow}>
                <i className="my-customer-table-icon bi bi-arrow-right-circle h5"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Col>
                            <img src={imageSrc} alt="Profile" className="ServiceProvider1" />
                        </Col>
                        <Col>Service Provider: {serviceProvider}</Col>
                        <Col>Duration Period: {durationPeriod}</Col>
                        <Button variant='secondary' style={{ background: "#292d32", marginRight: '10px' }}>
                            <i className="bi bi-list-task"></i>                    </Button>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            <i className="bi bi-chat-fill"></i>                    </Button>
                    </center>
                </Modal.Body>
                <Modal.Footer>

                    <Link to={`/customer/ViewServiceProvider`}>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            View Profile
                        </Button></Link>

                </Modal.Footer>
            </Modal>
        </>
    );
}

function PastPopup({ title, serviceProvider, dueDate, imageSrc }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" onClick={handleShow}>
                <i className="my-customer-table-icon bi bi-arrow-right-circle h5"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Col>
                            <img src={imageSrc} alt="Profile" className="ServiceProvider1" />
                        </Col>
                        <Col>Service Provider: {serviceProvider}</Col>
                        <Col>work Completed</Col>
                        <Button variant='secondary' style={{ background: "#292d32", marginRight: '10px' }}>
                            <i className="bi bi-list-task"></i>                    </Button>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            <i className="bi bi-chat-fill"></i>
                        </Button>
                        &nbsp;&nbsp;<Delete />
                    </center>
                </Modal.Body>
                <Modal.Footer>

                    <Link to={`/customer/ViewServiceProvider`}>
                        <Button variant='secondary' style={{ background: "#292d32" }}>
                            View Profile
                        </Button></Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const Delete = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" style={{
                width: '9%',
                height: '38px',
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

            <Modal show={show} onHide={handleClose} centered style={{ width: '300px', marginLeft: '480px' }}>
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

const CustomerDashboard = () => {
    return (
        <div className="row ps-lg-5 pe-lg-5 pt-lg-5" style={{ backgroundImage: `url(${BgImage})` }}>

            <div className="col-12">
                <div style={{ padding: '10px'}}><h4>Welcome back !</h4></div>
                <div className='d-flex flex-column flex-lg-row flex-md-row '>
                    <div className="d-flex flex-row col-7">
                        <Card className="card-cus-dashboard dashboard-button-1" style={{ width: "240px",  marginRight: "20px" }}>
                            <Link style={{ color: 'Black' }} to={`/customer/ViewVacancy`}>
                                <Card.Body classname = "pendingvacancy">
                                    <Card.Title style={{ fontSize: '30px', paddingTop: '5px', fontWeight: "bold", marginLeft: '85px'}}>8</Card.Title>
                                    <Card.Text className="card-body-container" style={{ fontSize: '20px', marginTop: '-10px', marginLeft: '10px' }}>
                                        Pending vacancy
                                        <i className="bi bi-rocket-takeoff" style={{fontSize:'30px', marginLeft:'-50px', padding: '5px'}} ></i>
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                        {/* &nbsp; &nbsp; &nbsp; */}
                        <Card className="card-cus-dashboard dashboard-button-2" style={{ width: "240px" }}>
                            <Link style={{ color: 'Black' }} to={`/customer/ReceivedQuotation`}>
                                <Card.Body>
                                    <Card.Title style = {{fontSize: '30px', paddingTop: '5px', fontWeight: "bold", margin: '0', marginLeft: '85px'}}>3</Card.Title>
                                    <Card.Text className="card-body-container" style={{fontSize: '20px', marginTop: '-10px', marginLeft: '10px' }}>
                                        New Quotation
                                            <i className="bi bi-file-post-fill" style={{fontSize:'30px', marginLeft:'-50px', padding: '5px'}} ></i>
                                    
                                    </Card.Text>
                                </Card.Body>
                            </Link>
                        </Card>
                    </div>

                    {/* <div className="d-flex d-md-flex d-lg-flex col-2 col-md-2 col-lg-4 responsiveCalendar_cus" >
                        <ResponsiveCalendar />
                    </div> */}

                </div>
                
                <br></br>
                <div className='Onpro'> <h3>Ongoing Projects</h3></div>
                <Row>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Tiles fitting
                                {/* <p>Due date: 20/08/2023</p> */}
                                <ProjectPopup title="Tile fitting"
                                    serviceProvider="Vinoth Kishan"
                                    dueDate="2023-08-21"
                                    imageSrc={ServiceProvider1} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Plumbing
                                <ProjectPopup title="Plumbing"
                                    serviceProvider="Alex Kumar"
                                    dueDate="2023-08-31"
                                    imageSrc={ServiceProvider2} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Ac Repair
                                <ProjectPopup title=" Ac Repair"
                                    serviceProvider="Ashwin Kumar"
                                    dueDate="2023-08-20"
                                    imageSrc={ServiceProvider3} />

                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Capentry
                                <ProjectPopup title="Capentry"
                                    serviceProvider="Ashwin Kumar"
                                    dueDate="2023-08-28" />
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Row>
                <br></br>
                {/* <div className='Onpro'> <h3>Hired </h3></div>
                <Row>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Electrician
                                <HiredPopup title="Electrician"
                                    serviceProvider="Alex Kumar"
                                    durationPeriod="2 years"
                                    imageSrc={ServiceProvider2} />
                            </Card.Text>
                        </Card.Body>
                    </Card>


                </Row>
                <br></br> */}
                <div className='Onpro'> <h3>Past Projects</h3></div>
                <Row>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Tiles fitting
                                <PastPopup title="Tile fitting"
                                    serviceProvider="Alex"
                                    dueDate="2023-04-21"
                                    imageSrc={ServiceProvider1} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="dashboard-pages">
                        <img className="card-img-top" src={profile_img_2} alt="my profile" />
                        <Card.Body>
                            <Card.Text>
                                Plumbing
                                <PastPopup title="Plumbing"
                                    serviceProvider="Alex Kumar"
                                    dueDate="2023-05-31"
                                    imageSrc={ServiceProvider2} />
                            </Card.Text>
                        </Card.Body>
                    </Card>

                </Row>
                <br></br>

            </div>


            <br></br>
        </div>

    );
};

export default CustomerDashboard;