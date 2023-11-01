import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
// import { serviceCategories } from './ViewServices';
import '../../../style/User/ViewServices.css';
import BgImage from '../../../assets/images/header/Background.png';
import { Link } from 'react-router-dom';

function ServicePage() {
    const { serviceName } = useParams();
    const navigate = useNavigate();

    // const selectedServiceData = serviceCategories[serviceName];
    const selectedServiceData = []

    const handleBackClick = () => {
        navigate(-1);
    };


    return (
        <section id="service-page" className="block service m-5 p-5" style={{ backgroundImage: `url(${BgImage})` }}>

            <div className="back-button" onClick={handleBackClick}>
                <div className="back-icon">
                    <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                </div>
                <div className="back-text">
                    <p className="m-0 p-0">Back</p>
                </div>
            </div>

            <div className="title-hold d-none d-md-inline">
                <h2 className='mb-5'>{serviceName}</h2>
            </div>


            <Row className="cardflex">
                {Array.isArray(selectedServiceData.services) && selectedServiceData.services.map((service) => (
                    <Col key={service.id} xs={5} sm={3} md={3} lg={3}>
                        <Link to={`/jobs/ViewAjob`}><Card className="card d-flex flex-column justify-content-center">
                            <Card.Img src={service.image} variant="top" alt={service.service} />
                            <Card.Body>
                                <Card.Text>{service.service}</Card.Text>
                            </Card.Body>
                        </Card></Link>
                    </Col>
                ))}
            </Row>

        </section>
    );
}

export default ServicePage;