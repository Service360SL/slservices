import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Modal, Button, Form } from 'react-bootstrap';
import '../../../../style/Admin/AdminServiceProvider.css';
import BgImage from '../../../../assets/images/header/Background.png';
import PopupBgImage from '../../../../assets/images/header/popupBg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';

import { set } from 'lodash';

const searchInputStyle = {
    height: '38px',
};

const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-end;
    `;

const serverLink = 'http://localhost:8080';

function AdminServiceProvider() {

    const [data, setData] = useState({
        category: 'default',
        service: '',
        selectedCategory: 'default',
        currentPage: 1,
        showModal: false,
        filteredServices: [],
        totalPages: 1,
        searchTerm: '',
        activeTab: 'Pending',
        filteredServiceProviders: [],
        displayedServices: [],
        showDetailsModal: false,
        selectedProvider: null,
        cardsPerPage: 3,
        showAcceptConfirmation: false,
        showRejectConfirmation: false,
        locked: false,
        rejectReason: '',
        rejectReasonErrorMessage: '',
        serviceProvidersData: [],
        pendingServiceProviders: [],
        acceptedServiceProviders: [],
        rejectedServiceProviders: [],
        serviceCategories: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllServiceProvidersWithDetails');
                const detail = response.data;
                const categoriesResponse = await axios.get(serverLink + '/auth/allCategories');
                const serviceCategoriesData = categoriesResponse.data;
                console.log(detail);
                setData({
                    ...data,
                    serviceCategories: serviceCategoriesData,
                    serviceProvidersData: detail,
                    pendingServiceProviders: detail.filter((service) => service.status === 'Pending'),
                    acceptedServiceProviders: detail.filter((service) => service.status === 'Accepted'),
                    rejectedServiceProviders: detail.filter((service) => service.status === 'Rejected'),
                    displayedServices: detail.filter((service) => service.status === 'Pending').slice(0, data.cardsPerPage),
                });
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const totalPages = Math.ceil(data.serviceProvidersData.length / data.cardsPerPage);
    const startIndex = (data.currentPage - 1) * data.cardsPerPage;
    const endIndex = startIndex + data.cardsPerPage;

    const filterServiceProvidersByCategory = (category) => {
        if (category === 'default') {
            return data.serviceProvidersData;
        } else {
            return data.serviceProvidersData.filter((provider) => provider.category === category);
        }
    };


    const handlePageChange = (page) => {
        const startIndex = (page - 1) * data.cardsPerPage;
        const endIndex = startIndex + data.cardsPerPage;
        const filteredData = data.filteredServiceProviders[data.activeTab];
        const displayedServices = filteredData.slice(startIndex, endIndex);

        setData({
            ...data,
            currentPage: page,
            displayedServices,
        });

    };


    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            searchTerm: value,
        }));
    };

    const filterServiceProviders = (status) => {
        const filteredServices = data.selectedCategory !== 'default'
            ? data.serviceProvidersData.filter((service) => service.category === data.selectedCategory)
            : data.serviceProvidersData;

        const filteredProviders = filteredServices.filter((service) =>
            service.status === status && (
                service.firstname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                service.lastname.toLowerCase().includes(data.searchTerm.toLowerCase())

            )
        );

        return filteredProviders;
    };


    const calculateTotalPages = (filteredServices) => Math.ceil(filteredServices.length / data.cardsPerPage);

    const handleServiceCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        const filteredServiceProvidersByCategory = filterServiceProvidersByCategory(selectedCategory);

        const displayedServices = filteredServiceProvidersByCategory.filter((service) => {
            return service.status === data.activeTab;
        });

        setData((prevState) => ({
            ...prevState,
            selectedCategory,
            displayedServices,
            currentPage: 1,
            totalPages: calculateTotalPages(displayedServices),
        }));
    };

    const handleTabChange = (tab) => {
        setData((prevState) => ({
            ...prevState,
            activeTab: tab,
            currentPage: 1,
            displayedServices: getDisplayedServiceProviders(tab),
        }));
    };

    const getDisplayedServiceProviders = (activeTab) => {

        let filteredServiceProviders;

        switch (activeTab) {
            case 'Pending':
                filteredServiceProviders = data.pendingServiceProviders || [];
                break;

            case 'Accepted':
                filteredServiceProviders = data.acceptedServiceProviders || [];
                break;

            case 'Rejected':
                filteredServiceProviders = data.rejectedServiceProviders || [];
                break;

            default:
                filteredServiceProviders = [];

        }

        if (data.selectedCategory !== 'default') {
            filteredServiceProviders = filteredServiceProviders.filter((service) => service.category === data.selectedCategory);
        }

        if (data.searchTerm) {
            filteredServiceProviders = filteredServiceProviders.filter((service) =>
                service.firstname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                service.lastname.toLowerCase().includes(data.searchTerm.toLowerCase())
            );
        }

        return filteredServiceProviders.slice(0, data.cardsPerPage);

    };

    useEffect(() => {

        const totalPages = Math.ceil(getDisplayedServiceProviders(data.activeTab).length / data.cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            currentPage: 1,
            displayedServices: getDisplayedServiceProviders(data.activeTab),
        }));
    }, [data.selectedCategory, data.searchTerm, data.activeTab]);

    const handleAcceptProvider = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userid', data.selectedProvider.userid);
        formData.append('locked', false);
        formData.append('status', 'Accepted');

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateAdvertiserAcceptStatus', formData).then(

            (response) => {
                console.log(response.data);
                window.location.reload();
            }

        ).catch(

            () => { alert("Can't Update. Check Again") }

        )
        setData({ ...data, showAcceptConfirmation: false });
    };

    const handleRejectProvider = (rejectReason) => {
        let isError = false;
        let rejectReasonErrorMessage = '';

        if (rejectReason === '') {
            isError = true;
            rejectReasonErrorMessage = 'Please enter a reason for rejection.';
        }

        setData({ ...data, rejectReasonErrorMessage });

        if (!isError) {
            const formData = new FormData();

            formData.append('userid', data.selectedProvider.userid);
            formData.append('locked', true);
            formData.append('status', 'Rejected');
            formData.append('reason', rejectReason);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            axios.put(serverLink + '/auth/updateAdvertiserRejectStatus', formData).then(

                (response) => {

                    console.log(response.data);
                    window.location.reload();

                }

            ).catch(

                () => { alert("Can't Update. Check Again") }

            )

            setData({ ...data, showRejectConfirmation: false, rejectReason });
        }
    };

    const handleShowDetails = (provider) => {
        setData({ ...data, showDetailsModal: true, selectedProvider: provider });
    };

    const handleServiceFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userid', data.selectedProvider.userid);
        formData.append('locked', data.locked);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        if (data.locked === true) {
            axios.put(serverLink + '/auth/updateAdvertiserDisableStatus', formData).then(

                (response) => {

                    console.log(response.data);
                    window.location.reload();

                }

            ).catch(

                () => { alert("Can't Update. Check Again") }

            )
        } else {
            axios.put(serverLink + '/auth/updateAdvertiserEnableStatus', formData).then(

                (response) => {

                    console.log(response.data);
                    window.location.reload();

                }

            ).catch(

                () => { alert("Can't Update. Check Again") }

            )

        }

        setData({
            ...data,
            showDetailsModal: false,
        });
    };

    useEffect(() => {
        if (data.selectedProvider) {
            setData({
                ...data,
                locked: data.selectedProvider.locked,
            });
        }
    }, [data.selectedProvider]);


    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="Pending" title="Pending" />
                <Tab eventKey="Accepted" title="Accepted" />
                <Tab eventKey="Rejected" title="Rejected" />
            </Tabs>

            <section id="service-page" className="block serviceProvider m-5 p-5" style={{ backgroundImage: `url(${BgImage})` }} >

                <h2 className="ms-5 fw-bold align-self-start">Service Providers</h2>

                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className='me-xs-2 col-xs-2 col-sm-5 col-md-4 m-3'>
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

                    <div className='me-xs-2 col-xs-2 col-sm-5 col-md-4 col-xxl-3 m-3'>
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

                </div>

                <div className="d-flex flex-wrap justify-content-center mt-4">
                    {data.displayedServices && data.displayedServices.map((provider) => (
                        <Card className="m-3" key={provider.userid}>
                            {data.activeTab !== 'Pending' && (
                                <Card.Img src={data.provider.profilePic} alt="Service Provider" className="rounded-circle" width="50" height="50" />
                            )}
                            <Card.Body className="d-flex flex-column align-items-center">
                                <p className="card-text fw-bold d-none d-md-block">{provider.firstname}{' '}{provider.lastname}</p>
                                {provider.serviceCategories && provider.serviceCategories.map((category) => (
                                    <div key={category.categoryName}>
                                        {category.services && category.services.map((service) => (
                                            <p key={service} className="card-text d-none d-md-block align-self-start">Service: {service}</p>
                                        ))}
                                    </div>
                                ))}

                                <div className="d-flex flex-column justify-content-center text-center">
                                    <button onClick={() => handleShowDetails(provider)} className="btn" style={{ backgroundColor: '#0B85A0' }} > More Details </button>
                                    {data.activeTab === 'Pending' && (
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#0D6445" }}
                                            onClick={() => {
                                                setData({ ...data, showAcceptConfirmation: true, selectedProvider: provider });
                                            }}
                                        >
                                            Accept
                                        </button>
                                    )}
                                    {data.activeTab === 'Pending' && (
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#B60E0E" }}
                                            onClick={() => {
                                                setData({ ...data, showRejectConfirmation: true, selectedProvider: provider });
                                            }}
                                        >
                                            Reject
                                        </button>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <div className="pagination justify-content-center">
                    {Array.from({ length: data.totalPages }, (_, index) => (
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

            </section>

            <Modal show={data.showAcceptConfirmation} onHide={() => setData({ ...data, showAcceptConfirmation: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Confirm Acceptance</Modal.Title>
                </Modal.Header>
                {data.selectedProvider && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Full Name: </span>{data.selectedProvider.firstname}{" "}{data.selectedProvider.lastname}
                        </div>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Categories:</span>
                            {data.selectedProvider.serviceCategories.map((category, index) => (
                                <span key={index}>
                                    {category.categoryName}
                                    {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Services: </span>
                            {data.selectedProvider.serviceCategories.map((category, index) => (
                                <span key={index}>
                                    {category.services.map((service, serviceIndex) => (
                                        <span key={serviceIndex}>
                                            {service}
                                            {serviceIndex < category.services.length - 1 && ', '}
                                        </span>
                                    ))}
                                    {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to accept this service provider?</p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect2' onClick={() => setData({ ...data, showAcceptConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={handleAcceptProvider}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showRejectConfirmation} onHide={() => setData({ ...data, showRejectConfirmation: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Confirm Rejection</Modal.Title>
                </Modal.Header>
                {data.selectedProvider && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Full Name: </span>{data.selectedProvider.firstname}{" "}{data.selectedProvider.lastname}
                        </div>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Categories:</span>
                            {data.selectedProvider.serviceCategories.map((category, index) => (
                                <span key={index}>
                                    {category.categoryName}
                                    {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Services: </span>
                            {data.selectedProvider.serviceCategories.map((category, index) => (
                                <span key={index}>
                                    {category.services.map((service, serviceIndex) => (
                                        <span key={serviceIndex}>
                                            {service}
                                            {serviceIndex < category.services.length - 1 && ', '}
                                        </span>
                                    ))}
                                    {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                </span>
                            ))}
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to Reject this service provider?</p>
                        <p>If you select "Yes," please enter the reason for rejection.<span style={{ color: 'red' }}>*</span></p>
                        <input type="text" value={data.rejectReason} onChange={(e) => setData({ ...data, rejectReason: e.target.value })} placeholder="Enter Reject Reason" />
                        {data.rejectReasonErrorMessage && <p className="text-danger p-0 m-0">{data.rejectReasonErrorMessage}</p>}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect3' onClick={() => setData({ ...data, showRejectConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={() => handleRejectProvider(data.rejectReason)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Service Provider Details</Modal.Title>
                </Modal.Header>
                {data.selectedProvider && (
                    <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
                        <div className="row">
                            <div className="col-md-8">
                                {data.activeTab !== 'Pending' && (
                                    <div className="d-flex justify-content-start">
                                        <img src={data.selectedProvider.profilePic} alt="Service Provider" className="rounded-circle" width="100" height="100" />
                                    </div>
                                )}
                                {data.activeTab === 'Rejected' && (
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Reason for rejection: </span> {data.selectedProvider.reason}
                                    </div>
                                )}
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>First Name: </span> {data.selectedProvider.firstname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Last Name: </span> {data.selectedProvider.lastname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>NIC: </span> {data.selectedProvider.nic}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Email: </span> {data.selectedProvider.email}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Address: </span> {data.selectedProvider.address}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Registered Date: </span> {data.selectedProvider.registrationdate}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Categories:</span>
                                    {data.selectedProvider.serviceCategories.map((category, index) => (
                                        <span key={index}>
                                            {category.categoryName}
                                            {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Services: </span>
                                    {data.selectedProvider.serviceCategories.map((category, index) => (
                                        <span key={index}>
                                            {category.services.map((service, serviceIndex) => (
                                                <span key={serviceIndex}>
                                                    {service}
                                                    {serviceIndex < category.services.length - 1 && ', '}
                                                </span>
                                            ))}
                                            {index < data.selectedProvider.serviceCategories.length - 1 && ', '}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 " style={{ marginTop: '100px' }}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                        <h6 className="text-center">Certificates And Documents</h6>
                                    </div>
                                    <ul className="list-unstyled">
                                        {data.selectedProvider.files.map((file, index) => (
                                            <li key={file.fileName}>
                                                <div className="d-flex align-items-center mb-2 p-2 rounded hover-effect" style={{ backgroundColor: "#ccc" }}>
                                                    <i className="bi bi-file-earmark-arrow-down-fill me-2 fs-4"></i>
                                                    <a
                                                        href={`data:${file.contentType};base64,${file.data}`}
                                                        download={file.fileName}
                                                        className="text-decoration-none text-dark fw-bold"
                                                    >
                                                        {file.fileName}
                                                    </a>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                )}
                <StyledModalFooter>
                    {data.activeTab === 'Accepted' && (
                        <>

                            <Form.Check
                                type="radio"
                                name="enableDisableRadio"
                                id="enableRadio"
                                label="Enable"
                                checked={!data.locked}
                                onChange={() => setData({ ...data, locked: false })}
                                className='ms-0 me-1 custom-radio'
                            />
                            <Form.Check
                                type="radio"
                                name="enableDisableRadio"
                                id="disableRadio"
                                label="Disable"
                                checked={data.locked}
                                onChange={() => setData({ ...data, locked: true })}
                                className='ms-0 me-5 custom-radio'
                            />

                        </>
                    )}
                    <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
                        <Button className="btn-effect3 me-2" onClick={() => setData({ ...data, showDetailsModal: false })}>
                            Cancel
                        </Button>
                        {data.activeTab === 'Accepted' && (
                            <Button type="submit" className="btn-effect" onClick={handleServiceFormSubmit}>
                                Save
                            </Button>
                        )}
                    </div>
                </StyledModalFooter>

            </Modal>
        </div>
    );
}

export default AdminServiceProvider;