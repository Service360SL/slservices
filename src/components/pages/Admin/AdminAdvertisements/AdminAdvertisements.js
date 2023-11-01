import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Modal, Button, Form, Carousel } from 'react-bootstrap';
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

function AdminAdvertisements() {

    const advertisementsCategories = {
        "Tools": ["Carpentry", "Painting"],
        "Spare Parts": ["AC Repair", "Electrical Wiring", "Plumbing"],
        "Equipment": ["Masonry", "Tiles Fitting", "Iron Works", "Glass & Aluminum"],
        "others": ["CCTV Repair", "Fire Alarm", "Video Surveillance"],
    };

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
        filteredAdvertisements: [],
        displayedServices: [],
        showDetailsModal: false,
        selectedAdvertisement: null,
        cardsPerPage: 3,
        showAcceptConfirmation: false,
        showRejectConfirmation: false,
        enable: true,
        rejectReason: '',
        rejectReasonErrorMessage: '',
        advertisementsData: [],
        pendingAdvertisements: [],
        acceptedAdvertisements: [],
        rejectedAdvertisements: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllAds');
                const detail = response.data;

                setData({
                    ...data,
                    advertisementsData: detail,
                    pendingAdvertisements: detail.filter((advertisement) => advertisement.verificationStatus === 'Pending'),
                    acceptedAdvertisements: detail.filter((advertisement) => advertisement.verificationStatus === 'Verified'),
                    rejectedAdvertisements: detail.filter((advertisement) => advertisement.verificationStatus === 'Rejected'),
                    displayedServices: detail.filter((advertisement) => advertisement.verificationStatus === 'Pending').slice(0, data.cardsPerPage),
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const filterServiceProvidersByCategory = (category) => {
        if (category === 'default') {
            return data.advertisementsData;
        } else {
            return data.advertisementsData.filter((provider) => provider.category === category);
        }
    };


    const handlePageChange = (page) => {
        const startIndex = (page - 1) * data.cardsPerPage;
        const endIndex = startIndex + data.cardsPerPage;
        const filteredData = data.filteredAdvertisements[data.activeTab];
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

    const handleTabChange = (tab) => {

        setData((prevState) => ({
            ...prevState,
            activeTab: tab,
            currentPage: 1,
            displayedServices: getDisplayedAdvertisements(tab),
        }));
    };

    const getDisplayedAdvertisements = (tab) => {

        let filteredAdvertisements;

        switch (tab) {
            case 'Pending':
                filteredAdvertisements = data.pendingAdvertisements;
                break;
            case 'Accepted':
                filteredAdvertisements = data.acceptedAdvertisements;
                break;
            case 'Rejected':
                filteredAdvertisements = data.rejectedAdvertisements;
                break;
            default:
                filteredAdvertisements = data.advertisementsData;
        }

        if (data.selectedCategory !== 'default') {
            filteredAdvertisements = filteredAdvertisements.filter((advertisement) => advertisement.category === data.selectedCategory);
        }

        if (data.searchTerm !== '') {
            filteredAdvertisements = filteredAdvertisements.filter((advertisement) =>
                advertisement.adsName.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                advertisement.category.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                advertisement.date.toLowerCase().includes(data.searchTerm.toLowerCase())
            );
        }

        return filteredAdvertisements.slice(0, data.cardsPerPage);
    };


    useEffect(() => {
        const totalPages = Math.ceil(getDisplayedAdvertisements(data.activeTab).length / data.cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            displayedServices: getDisplayedAdvertisements(data.activeTab),
            currentPage: 1,
        }));
    }, [data.selectedCategory, data.searchTerm, data.activeTab]);

    const handleAdvertisementCategoryChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            selectedCategory: value,
        }));
    };


    const handleAcceptAdvertisement = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('adsId', data.selectedAdvertisement.id);
        formData.append('status', 'Verified');

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateAdvertisementAcceptStatus', formData).then(
            (response) => {
                console.log(response.data);
                window.location.reload();
            }
        ).catch(

            () => { alert("Can't Update. Check Again") }

        );

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
            formData.append('adsId', data.selectedAdvertisement.id);
            formData.append('status', 'Rejected');
            formData.append('reason', rejectReason);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            axios.put(serverLink + '/auth/updateAdvertisementRejectStatus', formData).then(
                (response) => {
                    console.log(response.data);
                    window.location.reload();
                }
            ).catch(

                () => { alert("Can't Update. Check Again") }

            );

            setData({ ...data, showRejectConfirmation: false, rejectReason });
        }
    };

    const handleShowDetails = (provider) => {
        setData({ ...data, showDetailsModal: true, selectedAdvertisement: provider });
    };

    function handleImageClick(e) {
        e.target.style.transform = 'scale(2)';
        e.target.style.filter = 'brightness(1)';
        e.target.style.cursor = 'zoom-out';
    }

    function handleImageMouseLeave(e) {
        e.target.style.transform = 'scale(1)';
        e.target.style.filter = 'brightness(1.2)';
        e.target.style.cursor = 'zoom-in';
    }

    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="Pending" title="Pending" />
                <Tab eventKey="Accepted" title="Accepted" />
                <Tab eventKey="Rejected" title="Rejected" />
            </Tabs>

            <section id="service-page" className="block serviceProvider m-5 p-5" style={{ backgroundImage: `url(${BgImage})` }} >

                <h2 className="ms-5 fw-bold align-self-start">Advertisements</h2>

                <div className="d-flex align-items-center justify-content-center w-100">
                    <div className='me-xs-2 col-xs-2 col-sm-5 col-md-4 m-3'>
                        <div className="input-group">
                            <select
                                className="form-select"
                                value={data.selectedCategory}
                                onChange={handleAdvertisementCategoryChange}
                                required
                            >
                                <option value="default">Select a Advertisement Category</option>
                                {Object.keys(advertisementsCategories).map((advertisement) => (
                                    <option key={advertisement} value={advertisement}>
                                        {advertisement}
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
                                placeholder="Search Advertisements"
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
                    {data.displayedServices && data.displayedServices.map((ads) => (
                        <Card className="m-3" key={ads.id}>
                            <Card.Img src={'data:image/jpg;base64,' + ads.adsImages[0]} alt="Ad Image" />
                            <Card.Body className="d-flex flex-column align-items-center">
                                <p className="card-text fw-bold d-none d-md-block">{ads.adsName}</p>
                                <p className="card-text d-none d-md-block align-self-start">Category: {ads.category}</p>
                                <p className="card-text d-none d-md-block align-self-start">Date: {ads.date}</p>
                                <div className="d-flex flex-column justify-content-center text-center">
                                    <button onClick={() => handleShowDetails(ads)} className="btn" style={{ backgroundColor: '#0B85A0' }} > More Details </button>
                                    {data.activeTab === 'Pending' && (
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#0D6445" }}
                                            onClick={() => {
                                                setData({ ...data, showAcceptConfirmation: true, selectedAdvertisement: ads });
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
                                                setData({ ...data, showRejectConfirmation: true, selectedAdvertisement: ads });
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
                {data.selectedAdvertisement && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Ad Name: </span> {data.selectedAdvertisement.adsName}
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={'data:image/jpg;base64,' + data.selectedAdvertisement.adsImages[0]} alt="Ad Image" width="150" height="150" />
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to accept this Advertisement?</p>
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect2' onClick={() => setData({ ...data, showAcceptConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={handleAcceptAdvertisement}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showRejectConfirmation} onHide={() => setData({ ...data, showRejectConfirmation: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Confirm Rejection</Modal.Title>
                </Modal.Header>
                {data.selectedAdvertisement && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Ad Name: </span> {data.selectedAdvertisement.adsName}
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={'data:image/jpg;base64,' + data.selectedAdvertisement.adsImages[0]} alt="Service Provider" width="150" height="150" />
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to Reject this Advertisement?</p>
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
                    <Modal.Title>Advertisement Details</Modal.Title>
                </Modal.Header>
                {data.selectedAdvertisement && (
                    <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex justify-content-start">
                                    <Carousel
                                        interval={3000}
                                        prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
                                        nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
                                        onMouseEnter={handleImageClick}
                                        onMouseLeave={handleImageMouseLeave}
                                        className="custom-carousel"
                                    >
                                        {data.selectedAdvertisement.adsImages.map((image, index) => (
                                            <Carousel.Item key={index}>
                                                <img src={`data:image/jpg;base64,${image}`} alt={`Image ${index + 1}`} className="d-block" width="250" height="150" />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {data.activeTab === 'Rejected' && (
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Reason For Rejection: </span>{data.selectedAdvertisement.reason}
                                    </div>
                                )}
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Advertiser Full Name: </span>{data.selectedAdvertisement.firstName}{' '}{data.selectedAdvertisement.lastName}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Ad Name:</span> {data.selectedAdvertisement.adsName}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Description:</span> {data.selectedAdvertisement.description}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Price:</span>Rs. {data.selectedAdvertisement.price}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Warranty Months:</span> {data.selectedAdvertisement.warrantyMonths}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Posted Date:</span> {data.selectedAdvertisement.date}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Category:</span> {data.selectedAdvertisement.category}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Shop Name:</span> {data.selectedAdvertisement.shopName}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Shop Address: </span> {data.selectedAdvertisement.shopAddress}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>contact Number: </span> {data.selectedAdvertisement.shopPhone}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                )}
                <StyledModalFooter>
                    <div className="col-sm-6 d-flex justify-content-end align-items-end m-0">
                        <Button className="btn-effect3 me-2" onClick={() => setData({ ...data, showDetailsModal: false })}>
                            Cancel
                        </Button>
                    </div>
                </StyledModalFooter>

            </Modal>
        </div>
    );
}

export default AdminAdvertisements;