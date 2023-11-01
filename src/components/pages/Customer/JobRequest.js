import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/JobRequestform.css';
import BgImage from '../../../assets/images/header/Background.png';
import { useNavigate } from 'react-router-dom';
import places from '../../loginForm/cities-by-district.json';
import axios from 'axios';

function Quotation() {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [servicesData, setServicesData] = useState({});

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can access selectedLocation and selectedService here and submit your data
    };

    //for service
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/auth/services");
                const data = response.data;
                setServicesData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const categories = Object.keys(servicesData);
    return (
        <div className="card2">
            <div className="back-button" onClick={handleBackClick} style={{ marginLeft: '10px' }}>
                <div className="back-icon">
                    <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                </div>
                <div className="back-text">
                    <p className="m-0 p-0">Back</p>
                </div>
            </div>
            <div className="VacancyForm-container" style={{ backgroundImage: `url(${BgImage})` }}>
                <h3>Request for Job</h3>
                <br></br>
                <form className="vacancy-form" onSubmit={handleSubmit}>
                    <div className="vacancy-form-group">
                        <Row>
                            <Col className="col-4">
                                <label htmlFor="title">Title <span style={{ color: "red" }}>*</span></label>
                            </Col>
                            <Col className="col-6">
                                <input type="text" name="title" className="form-control" id="title" placeholder="Enter the title" />
                            </Col>
                        </Row>
                    </div>
                    <div className="vacancy-form-group">
                        <label htmlFor="description">Description <span style={{ color: "red" }}>*</span></label>
                        <input type="text" name="description" className="form-control" id="description" placeholder="Enter your job details here" />
                    </div>
                    <div className="vacancy-form-group">
                        <Row>
                            <Col className="col-4">
                                <label htmlFor="Service_name"> Location <span style={{ color: "red" }}>*</span></label>
                            </Col>
                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        id="locationSelect"
                                        className="select-small-text"
                                        onChange={handleLocationChange}
                                        value={selectedLocation}
                                    >
                                        {Object.keys(places).map((location, index) => (
                                            <optgroup label={location} key={index}>
                                                {places[location].cities.map((city, subIndex) => (
                                                    <option key={`${index}-${subIndex}`} value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                            </Col>
                        </Row>
                    </div>
                    <div className="vacancy-form-group">
                        <Row>
                            <Col className="col-4">
                                <label htmlFor="Service_name"> Service <span style={{ color: "red" }}>*</span></label>
                            </Col>
                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Select style={{margin:'0'}}
                                        id="serviceSelect"
                                        className="select-small-text"
                                        onChange={handleServiceChange}
                                        value={selectedService}
                                    >
                                        {categories.map((category, categoryIndex) => (
                                            <optgroup >
                                                {servicesData[category].map((service, serviceIndex) => (
                                                    <option key={`${categoryIndex}-${serviceIndex}`} value={service}>
                                                        {service}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                    <div className="vacancy-form-group">
                        <label htmlFor="file">Upload image of need</label>
                        <input type="file" name="file" className="form-control" id="file" />
                    </div>
                    <Row className="vacancy-form-group-buttons mt-3">
                        <Col>
                            <input type="submit" value="Send" className="btn btn-vacancy-form-k" />
                        </Col>
                        <Col>
                            <a id="cancel-link" href="#">
                                <button>Cancel</button>
                            </a>
                        </Col>
                    </Row>
                </form>
            </div>
        </div>
    );
}

export default Quotation;
