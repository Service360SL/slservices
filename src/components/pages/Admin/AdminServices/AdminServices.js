import React, { useState, useEffect } from 'react';
import { Row, Card, Col, Button, Modal, Form } from 'react-bootstrap';
import BgImage from '../../../../assets/images/header/Background.png';
import '../../../../style/Admin/AdminServices.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';


const StyledButton2 = styled(Button)`
        background-color: #282b3d;
        width: 30%;
        @media (max-width: 768px) {
            width: 100%; 
            margin-top: 1rem; 
        }
        &:hover {
            background: #fff;
            border-color: #292D32;
            color: #9f390d;
        }
    `;

const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-start;
    `;

const searchInputStyle = {
    height: '38px',
};

const serverLink = 'http://localhost:8080';

function AdminServices() {

    const [data, setData] = useState({
        category: 'default',
        service: '',
        image: null,
        selectedCategory: 'default',
        selectedNewCategory: 'default',
        selectedEditCategory: 'default',
        editedServiceName: '',
        currentPage: 1,
        showModal: false,
        serviceCategoryErrorMessage: '',
        serviceErrorMessage: '',
        imageErrorMessage: '',
        editserviceCategoryErrorMessage: '',
        editserviceErrorMessage: '',
        editimageErrorMessage: '',
        filteredServices: [],
        totalPages: 1,
        searchTerm: '',
        selectedService: null,
        showServiceModal: false,
        enable: true,
        servicesData: [],
        newCategoryName: '',
        serviceCategories: [],
        displayedServices: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesResponse = await axios.get(serverLink + '/auth/allServices');
                const categoriesResponse = await axios.get(serverLink + '/auth/allCategories');

                const fetchedServicesData = servicesResponse.data;
                const serviceCategoriesData = categoriesResponse.data;

                setData({
                    ...data,
                    servicesData: fetchedServicesData,
                    serviceCategories: serviceCategoriesData,
                    displayedServices: fetchedServicesData.slice(0, cardsPerPage),
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const cardsPerPage = 9;
    const totalPages = Math.ceil(data.servicesData.length / cardsPerPage);
    const startIndex = (data.currentPage - 1) * cardsPerPage; 
    const endIndex = startIndex + cardsPerPage;
    const displayedServices = data.servicesData.slice(startIndex, endIndex);

    const handleServiceCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setData({
            ...data,
            selectedCategory: selectedCategory,
        });
    };

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const displayedServices = data.filteredServices.slice(startIndex, endIndex);
        setData({ ...data, currentPage: page, displayedServices });
    };

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            searchTerm: value,
        }));
    };

    const handleModalOpen = () => {
        setData({ ...data, showModal: true });
    };

    const handleModalClose = () => {
        setData({ ...data, showModal: false });
    };

    const handleNewServiceChange = (e) => {
        const { name, value } = e.target;

        if (value === "new") {
            setData((prevState) => ({
                ...prevState,
                selectedNewCategory: 'new',
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData((prevState) => ({
            ...prevState,
            image: file,
        }));
    };

    const handleCategoryImageChange = (e) => {
        const file = e.target.files[0];
        setData((prevState) => ({
            ...prevState,
            categoryImage: file,
        }));
    };

    useEffect(() => {

        const filteredServices = data.selectedCategory !== 'default'
            ? data.servicesData.filter((service) => service.category === data.selectedCategory)
            : data.servicesData;

        const searchedServices = data.searchTerm.trim() === ''
            ? filteredServices
            : filteredServices.filter((service) =>
                service.service.toLowerCase().includes(data.searchTerm.toLowerCase())
            );

        const totalPages = Math.ceil(searchedServices.length / cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            filteredServices: searchedServices,
            displayedServices: searchedServices.slice(0, cardsPerPage),
        }));
    }, [data.selectedCategory, data.searchTerm]);

    useEffect(() => {
        if (data.showServiceModal && data.selectedService) {
            setData({
                ...data,
                editedServiceName: data.selectedService.service,
                selectedEditCategory: data.selectedService.category,
                enable: data.selectedService.enable,
            });
        }
    }, [data.showServiceModal, data.selectedService]);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        let isError = false;
        let serviceCategoryErrorMessage = '';
        let serviceErrorMessage = '';
        let imageErrorMessage = '';

        if (data.selectedNewCategory === 'default') {
            isError = true;
            serviceCategoryErrorMessage = 'Please select a service category';
        }

        if (data.service.trim() === '') {
            isError = true;
            serviceErrorMessage = 'Please enter a service name';
        }

        if (data.image === null) {
            isError = true;
            imageErrorMessage = 'Please select an image';
        }

        setData({
            ...data,
            serviceCategoryErrorMessage,
            serviceErrorMessage,
            imageErrorMessage,
        });

        if (!isError) {

            const formData = new FormData();
            formData.append('serviceImage', data.image);
            formData.append('serviceName', data.service);

            if (data.selectedNewCategory === 'new') {
                formData.append('serviceCategoryName', data.newCategoryName);
                formData.append('categoryImage', data.categoryImage);
            } else {
                formData.append('serviceCategoryName', data.selectedNewCategory);
            }


            if (data.selectedNewCategory === 'new') {

                axios.post(serverLink + '/auth/addNewServiceWithCategoryImage', formData).then(

                    (response) => {

                        console.log(response.data);
                        setData({ ...data, selectedNewCategory: 'default' });
                        window.location.reload();

                    }

                ).catch(

                    () => { alert("Error!!!") }

                )
            } else {

                axios.post(serverLink + '/auth/addNewService', formData).then(

                    (response) => {

                        console.log(response.data);
                        window.location.reload();

                    }

                ).catch(

                    () => { alert("Error!!!") }

                )
            }

            setData({ ...data, showModal: false });
        }
    };

    const handleServiceFormSubmit = (e) => {
        e.preventDefault();

        let isError = false;
        let editserviceErrorMessage = '';

        if (data.editedServiceName === '') {
            isError = true;
            editserviceErrorMessage = 'Please enter a service name';
        }

        setData({
            ...data,
            editserviceErrorMessage,
        });

        if (!isError) {

            if (data.selectedService) {

                const formData = new FormData();

                if (data.image) {
                    formData.append('serviceImage', data.image);
                }

                if (data.editedServiceName) {
                    formData.append('serviceName', data.editedServiceName);
                }

                formData.append('serviceId', data.selectedService.id);
                formData.append('enable', data.enable);

                if (data.selectedEditCategory !== 'default') {
                    formData.append('serviceCategoryName', data.selectedEditCategory);
                }

                axios.put(serverLink + '/auth/updateService', formData).then(
                    
                    (response) => {

                        console.log(response.data);
                        window.location.reload();

                    }

                ).catch(

                    () => { alert("Error!!!") }

                )
                
                setData({
                    ...data,
                    showModal: false,
                    showServiceModal: false,
                    selectedService: null,
                });
            }

        }
    };

    return (
        <section id="service" className="block service-block p-5" style={{ backgroundImage: `url(${BgImage})` }}>
            <h2 className='ms-5 fw-bold align-self-start'>Services</h2>
            <div className="d-flex align-items-center justify-content-center w-100">
                <div className='me-xs-2 col-xs-2 col-md-3 m-3'>
                    <div className="input-group">
                        <select
                            className="form-select"
                            value={data.selectedCategory}
                            onChange={handleServiceCategoryChange}
                            required
                        >
                            <option value="default">Select a Service Category</option>
                            {data.serviceCategories.map((category) => (
                                <option key={category.id} value={category.serviceCategoryName}>
                                    {category.serviceCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='me-xs-2 col-xs-2 col-md-3 m-3'>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Services"
                            value={data.searchTerm}
                            onChange={handleSearchChange}
                            style={searchInputStyle}
                        />
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                    </div>
                </div>

                <div className='me-xs-2 col-xs-2 col-md-3 m-3 d-flex justify-content-start align-items-start'>
                    <button
                        className="btn btn-primary me-2 d-block d-md-none"
                        onClick={handleModalOpen}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <Button
                        variant="primary"
                        onClick={handleModalOpen}
                        className="me-xs-1 ms-4 d-none d-md-block"
                        style={searchInputStyle}
                    >
                        Add New Service
                    </Button>
                </div>

            </div>

            <Row className="cardflex">
                {data.displayedServices && data.displayedServices.map((service) => (
                    <Col key={service.id} xs={8} sm={6} md={4} lg={3} xl={3}>
                        <Card className="card d-flex flex-column align-items-center justify-content-center h-100" onClick={() => (
                            setData({ ...data, selectedService: service, showServiceModal: true })
                        )}>
                            <Card.Img src={'data:image/png;base64,' + service.serviceImage} variant="top" alt="home" />
                            <Card.Body>
                                <Card.Text>{service.service}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-link ${data.currentPage === index + 1 ? 'active' : ''}`}
                        style={{ backgroundColor: '#292D32', color: '#fff' }}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            <Modal show={data.showServiceModal} onHide={() => setData({ ...data, showServiceModal: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>{'Edit Service'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundImage: `url(${BgImage})` }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Image</Form.Label>
                            {data.selectedService ? (
                                <img
                                    src={'data:image/png;base64,' + data.selectedService.serviceImage}
                                    alt="Current Service"
                                    style={{ width: '100%', maxHeight: '100px', objectFit: 'contain' }}
                                    className='rounded'
                                />
                            ) : (
                                <p>No image selected.</p>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose a New Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleImageChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Change the Service Category</Form.Label>
                            <select
                                className='form-select'
                                value={data.selectedEditCategory}
                                onChange={(e) => setData({ ...data, selectedEditCategory: e.target.value })}
                                required
                            >
                                {data.serviceCategories.map((category) => (
                                    <option key={category.id} value={category.serviceCategoryName}>
                                        {category.serviceCategoryName}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Change Service Name</Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                value={data.editedServiceName}
                                onChange={(e) => setData({ ...data, editedServiceName: e.target.value })}
                                required
                            />
                            {data.editserviceErrorMessage && <p className="text-danger p-0 m-0">{data.editserviceErrorMessage}</p>}
                        </Form.Group>

                        <StyledModalFooter>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-6 d-flex justify-content-start align-items-center">
                                        <Form.Check
                                            type="radio"
                                            name="enableDisableRadio"
                                            id="enableRadio"
                                            label="Enable"
                                            checked={data.enable}
                                            onChange={() => setData({ ...data, enable: true })}
                                            className='ms-0 me-1 custom-radio'
                                        />
                                        <Form.Check
                                            type="radio"
                                            name="enableDisableRadio"
                                            id="disableRadio"
                                            label="Disable"
                                            checked={!data.enable}
                                            onChange={() => setData({ ...data, enable: false })}
                                            className='ms-0 me-1 custom-radio'
                                        />
                                    </div>
                                    <div className="col-sm-6 d-flex justify-content-center align-items-center m-0">
                                        <Button className="btn-effect3 me-2" onClick={() => setData({ ...data, showServiceModal: false })}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="btn-effect" onClick={handleServiceFormSubmit}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </StyledModalFooter>

                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={data.showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Add New Service</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundImage: `url(${BgImage})` }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Select the Service Category<span style={{ color: 'red' }}>*</span></Form.Label>
                            <select
                                className="form-select"
                                name="selectedNewCategory"
                                value={data.selectedNewCategory}
                                onChange={handleNewServiceChange}
                                required
                            >
                                <option value="default">Select a Service Category</option>
                                {data.serviceCategories.map((category) => (
                                    <option key={category.id} value={category.serviceCategoryName}>
                                        {category.serviceCategoryName}
                                    </option>
                                ))}
                                <option value="new">Add New Category</option>
                            </select>
                            {data.serviceCategoryErrorMessage && <p className="text-danger p-0 m-0">{data.serviceCategoryErrorMessage}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {data.selectedNewCategory === "new" && (
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <Form.Label htmlFor="newCategory">New Category Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newCategory"
                                            name="newCategoryName"
                                            value={data.newCategoryName}
                                            onChange={handleNewServiceChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <Form.Label>Choose an Image<span style={{ color: 'red' }}>*</span></Form.Label>
                                        <Form.Control type="file" name="categoryImage" onChange={handleCategoryImageChange} accept=".jpg, .jpeg, .png" required />
                                        {data.imageErrorMessage && <p className="text-danger p-0 m-0">{data.imageErrorMessage}</p>}
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Service Name<span style={{ color: 'red' }}>*</span></Form.Label>
                            <input
                                type="text"
                                className="form-control"
                                name="service"
                                value={data.service}
                                onChange={handleNewServiceChange}
                                required
                            />
                            {data.serviceErrorMessage && <p className="text-danger p-0 m-0">{data.serviceErrorMessage}</p>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Choose an Image<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control type="file" name="image" onChange={handleImageChange} accept=".jpg, .jpeg, .png" required />
                            {data.imageErrorMessage && <p className="text-danger p-0 m-0">{data.imageErrorMessage}</p>}
                        </Form.Group>
                        <Modal.Footer >
                            <StyledButton2 variant="secondary" onClick={handleModalClose}>
                                Cancel
                            </StyledButton2>
                            <StyledButton2 variant="primary" type="submit" className="btn btn-dark btn-block" onClick={handleFormSubmit}>
                                Submit
                            </StyledButton2>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

        </section>
    );
}

export default AdminServices;
