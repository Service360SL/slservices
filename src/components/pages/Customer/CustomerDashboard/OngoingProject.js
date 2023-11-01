import React from 'react';
import Container from 'react-bootstrap/Container';
import '../../../../style/Customer/OngoingProject.css'
import ServiceProvider1 from '../../../../assets/images/Customer/ServiceProvider1.jpg';
import { Row, Col } from 'react-bootstrap';


const OngoingProject = () => {
    return (
        <Container fluid>

            <div className="row">
                <div className="col-md-8">
                    <div className="card_2" >
                        <p> <a href="#" className='fw-bold navLink d-lg-inline d-sm-none d-md-none d-none'><i className="bi bi-arrow-left-circle-fill"></i></a>
                            &nbsp;&nbsp;Back</p> 
                        <h3>Ongoing Projects</h3>

                        <div className="card d-flex card-3">
                            <div className="card-body">
                                <h4 className="card-title">Tile fitting</h4>

                                <p className="card-text">
                                    <row><Col>
                                        &nbsp;&nbsp;<img src={ServiceProvider1} alt="Profile" className="ServiceProvider1" /></Col>
                                        <Col>Service Provider : Vinoth Kishan</Col>
                                        <Col>Due Date : </Col></row></p>

                                <button style={{
                                    width: '26%',
                                    height: '30px',
                                    border: '1px solid #ced4da',
                                    fontSize: '12px',
                                    padding: '0 8px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    fontWeight: '500',
                                    textTransform: 'none',
                                    background: 'black',
                                    borderRadius: '20px',
                                    '@media (max-width: 768px)': {
                                        width: '70%',
                                    }
                                }}> <i class="bi bi-list-task"></i>&nbsp;&nbsp;&nbsp;To Do list</button><br></br>
                                <button style={{
                                    width: '26%',
                                    height: '30px',
                                    border: '1px solid #ced4da',
                                    fontSize: '12px',
                                    padding: '0 8px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    fontWeight: '500',
                                    textTransform: 'none',
                                    background: 'black',
                                    borderRadius: '20px',

                                    '@media (max-width: 768px)': {
                                        width: '70%',
                                    }
                                }}> <i className="bi bi-wechat"></i>&nbsp;&nbsp;Chat</button><br></br>
                                <button style={{
                                    width: '26%',
                                    height: '30px',
                                    border: '1px solid #ced4da',
                                    fontSize: '12px',
                                    padding: '0 8px',
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    fontWeight: '500',
                                    textTransform: 'none',
                                    background: 'black',
                                    borderRadius: '20px',
                                    '@media (max-width: 768px)': {
                                        width: '70%',
                                    }
                                }}>View Profile</button><br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>
    );
};

export default OngoingProject;