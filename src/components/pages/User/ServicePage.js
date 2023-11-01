import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import '../../../style/User/ViewServices.css';
import BgImage from '../../../assets/images/header/Background.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const serverLink = 'http://localhost:8080';

function ServicePage() {
    const { serviceName } = useParams();
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    const [data, setData] = useState({
        servicesData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesResponse = await axios.get(serverLink + '/auth/allServices');
                const fetchedServicesData = servicesResponse.data;

                setData({
                    ...data,
                    servicesData: fetchedServicesData,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const selectedServiceData = data.servicesData.filter(service => service.category === serviceName);

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
                {Array.isArray(selectedServiceData) && selectedServiceData.map((service) => (
                    <Col key={service.id} xs={5} sm={3} md={3} lg={3}>
                        <Link to={`/services/ViewAservice`}><Card className="card d-flex flex-column justify-content-center">
                            <Card.Img src={'data:image/png;base64,' + service.serviceImage} variant="top" alt={service.service} />
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