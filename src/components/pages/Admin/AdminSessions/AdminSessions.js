import React, { useState, useEffect } from 'react';
import { Card, Tab, Tabs, Modal, Button, Form, Carousel } from 'react-bootstrap';
import '../../../../style/Admin/AdminServiceProvider.css';
import BgImage from '../../../../assets/images/header/Background.png';
import trainingsessionimage from '../../../../assets/images/ServiceProvider/TrainingSession/default.jpg';
import PopupBgImage from '../../../../assets/images/header/popupBg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { set } from 'lodash';

const searchInputStyle = {
    height: '38px',
};

const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-end;
    `;

const serverLink = 'http://localhost:8080';

function AdminSessions() {

    const [data, setData] = useState({
        currentPage: 1,
        showModal: false,
        filteredServices: [],
        totalPages: 1,
        searchTerm: '',
        activeTab: 'Pending',
        filteredSessions: [],
        displayedSessions: [],
        showDetailsModal: false,
        selectedSession: null,
        cardsPerPage: 3,
        showAcceptConfirmation: false,
        showRejectConfirmation: false,
        enable: true,
        rejectReason: '',
        rejectReasonErrorMessage: '',
        sessionsData: [],
        sessionImages: [],
        pendingSessions: [],
        acceptedSessions: [],
        rejectedSessions: [],
        selectedImages: [],
        fromDate: null,
        toDate: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/viewTrainingSessions');
                const detail = response.data;
                const trainingsessions = detail.trainingsessions;
                const trainingSessionImagesArray = detail.trainingsessionimages;
                setData({
                    ...data,
                    sessionImages: trainingSessionImagesArray,
                    sessionsData: trainingsessions,
                    pendingSessions: trainingsessions.filter((session) => session.status === 'Pending'),
                    acceptedSessions: trainingsessions.filter((session) => session.status === 'Payment Pending'),
                    rejectedSessions: trainingsessions.filter((session) => session.status === 'Rejected'),
                    displayedSessions: trainingsessions.filter((session) => session.status === 'Pending').slice(0, data.cardsPerPage),

                })
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * data.cardsPerPage;
        const endIndex = startIndex + data.cardsPerPage;
        const filteredData = data.filteredSessions[data.activeTab];
        const displayedSessions = filteredData.slice(startIndex, endIndex);

        setData({
            ...data,
            currentPage: page,
            displayedSessions,
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
            displayedSessions: getDisplayedSessions(tab),
        }));
    };

    const getDisplayedSessions = (tab) => {

        let filteredSessions;

        switch (tab) {
            case 'Pending':
                filteredSessions = data.pendingSessions || [];
                break;
            case 'Accepted':
                filteredSessions = data.acceptedSessions || [];
                break;
            case 'Rejected':
                filteredSessions = data.rejectedSessions || [];
                break;
            default:
                filteredSessions = [];
        }

        if (data.fromDate && data.toDate) {
            filteredSessions = filteredSessions.filter((session) => {
                const sessionDate = new Date(session.trainingdate).toISOString().split('T')[0];
                return sessionDate >= data.fromDate.toISOString().split('T')[0] && sessionDate <= data.toDate.toISOString().split('T')[0];
            });
        }

        if (data.searchTerm !== '') {
            filteredSessions = filteredSessions.filter((session) =>
                session.servicename.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                session.trainingdate.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                session.traininglocation.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                session.trainingtitle.toLowerCase().includes(data.searchTerm.toLowerCase())
            );
        }

        return filteredSessions.slice(0, data.cardsPerPage);
    };


    useEffect(() => {
        const totalPages = Math.ceil(getDisplayedSessions(data.activeTab).length / data.cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            displayedSessions: getDisplayedSessions(data.activeTab),
            currentPage: 1,
        }));
    }, [data.searchTerm, data.activeTab, data.fromDate, data.toDate]);

    const handleAcceptAdvertisement = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('trainingid', data.selectedSession.trainingid);
        formData.append('status', 'Payment Pending');

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateTrainingSessionAcceptStatus', formData).then(
            (response) => {
                console.log(response.data);
                window.location.reload();
            }
        ).catch(

            () => { alert("Can't Update. Check Again") }

        );
        setData({ ...data, showAcceptConfirmation: false });
    };

    const handleRejectSession = (rejectReason) => {
        let isError = false;
        let rejectReasonErrorMessage = '';

        if (rejectReason === '') {
            isError = true;
            rejectReasonErrorMessage = 'Please enter a reason for rejection.';
        }

        setData({ ...data, rejectReasonErrorMessage });

        if (!isError) {
            const formData = new FormData();
            formData.append('trainingid', data.selectedSession.trainingid);
            formData.append('status', 'Rejected');
            formData.append('reason', rejectReason);

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            axios.put(serverLink + '/auth/updateTrainingSessionRejectStatus', formData).then(
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

    const handleShowDetails = (provider, images) => {
        setData({ ...data, showDetailsModal: true, selectedSession: provider, selectedImages: images });
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

    const trainingSessionImagesArray = data.sessionImages;

    const allImages = [];

    trainingSessionImagesArray.forEach((sessionImages) => {
        if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
            allImages.push(...sessionImages.images);
        }
    });

    useEffect(() => {
        console.log(data.selectedImages[0]);
    }, [data.selectedImages]);

    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="Pending" title="Pending" />
                <Tab eventKey="Accepted" title="Accepted" />
                <Tab eventKey="Rejected" title="Rejected" />
            </Tabs>

            <section id="service-page" className="block serviceProvider m-5 p-5" style={{ backgroundImage: `url(${BgImage})` }} >

                <h2 className="ms-5 fw-bold align-self-start">Training Sessions</h2>

                <div className="d-flex align-items-center justify-content-center w-100">

                    <div className='col-xs-3 col-md-5 col-lg-5 col-xl-4 col-xxl-4 m-3 me-0 date-picker-container'>
                        <div className="input-group m-0">
                            <DatePicker
                                selected={data.fromDate}
                                onChange={date => setData((prevState) => ({ ...prevState, fromDate: date }))}
                                className="form-control date-picker-input"
                                placeholderText="From Date"
                                dateFormat="yyyy-MM-dd"
                                isClearable
                            />
                            <span className="input-group-text">
                                <i className="bi bi-calendar2-week"></i>
                            </span>
                        </div>
                    </div>
                    <div className='me-xs-2 col-xs-2 col-md-5 col-lg-5 col-xl-4 col-xxl-4 m-3 date-picker-container'>
                        <div className="input-group">
                            <DatePicker
                                selected={data.toDate}
                                onChange={date => setData((prevState) => ({ ...prevState, toDate: date }))}
                                className="form-control date-picker-input"
                                placeholderText="To Date"
                                dateFormat="yyyy-MM-dd"
                                isClearable
                            />
                            <span className="input-group-text">
                                <i className="bi bi-calendar2-week"></i>
                            </span>
                        </div>
                    </div>

                    <div className='col-xs-2 col-sm-3 col-md-2 col-lg-2 col-xl-2 m-3 me-xs-5'>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={data.searchTerm}
                                onChange={handleSearchChange}
                            />
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-center mt-4">
                    {data.displayedSessions &&
                        data.displayedSessions.map((session) => {
                            const matchingSessionImages = trainingSessionImagesArray.find((image) => image.id === session.trainingid);
                            const imagesArray = matchingSessionImages ? matchingSessionImages.images : [];
                            return (
                                <Card className="m-3" key={session.trainingid}>
                                    <Card.Img src={imagesArray.length > 0 ? `data:image/jpg;base64,${imagesArray[0]}` : trainingsessionimage} alt={`Training Session image`} />
                                    <Card.Body className="d-flex flex-column align-items-center">
                                        <p className="card-text fw-bold d-none d-md-block">{session.trainingtitle}</p>
                                        <p className="card-text d-none d-md-block align-self-start">Date: {session.trainingdate}</p>
                                        <p className="card-text d-none d-md-block align-self-start">Location: {session.traininglocation}</p>
                                        <div className="d-flex flex-column justify-content-center text-center">
                                            <button onClick={() => handleShowDetails(session, imagesArray)} className="btn" style={{ backgroundColor: '#0B85A0' }}>
                                                More Details
                                            </button>
                                            {data.activeTab === 'Pending' && (
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: "#0D6445" }}
                                                    onClick={() => {
                                                        setData({ ...data, showAcceptConfirmation: true, selectedSession: session, selectedImages: imagesArray });
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
                                                        setData({ ...data, showRejectConfirmation: true, selectedSession: session, selectedImages: imagesArray });
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            );
                        })}
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
                {data.selectedSession && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Title: </span> {data.selectedSession.trainingtitle}
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={`data:image/jpg;base64,${data.selectedImages[0]}`} alt="Session Image" width="120" height="120" />
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to accept this Training session?</p>
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
                {data.selectedSession && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <div className="mt-2 bordered-paragraph rounded">
                            <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Title: </span> {data.selectedSession.trainingtitle}
                        </div>
                        <div className="d-flex justify-content-center">
                            <img src={`data:image/jpg;base64,${data.selectedImages[0]}`} alt="Session Image" width="150" height="150" />
                        </div>
                        <p className='fw-bold pt-4'>Are you sure you want to Reject this Training session?</p>
                        <p>If you select "Yes," please enter the reason for rejection.<span style={{ color: 'red' }}>*</span></p>
                        <input type="text" value={data.rejectReason} onChange={(e) => setData({ ...data, rejectReason: e.target.value })} placeholder="Enter Reject Reason" />
                        {data.rejectReasonErrorMessage && <p className="text-danger p-0 m-0">{data.rejectReasonErrorMessage}</p>}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect3' onClick={() => setData({ ...data, showRejectConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={() => handleRejectSession(data.rejectReason)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Training session Details</Modal.Title>
                </Modal.Header>
                {data.selectedSession && (
                    <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
                        {data.selectedImages && data.selectedImages.length > 0 && (
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
                                            {data.selectedImages.map((image, index) => (
                                                <Carousel.Item key={index}>
                                                    <img src={`data:image/jpg;base64,${image}`} alt={`Image ${index + 1}`} className="d-block" width="250" height="150" />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Title: </span> {data.selectedSession.trainingtitle}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="row">
                            <div className="col-12">
                                {data.activeTab === 'Rejected' && (
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Reason for rejection: </span> {data.selectedSession.reason}
                                    </div>
                                )}
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Full Name: </span> {data.selectedSession.serviceprovider.firstname} {data.selectedSession.serviceprovider.lastname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Service Name: </span>{data.selectedSession.servicename}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Description: </span>{data.selectedSession.trainingdescription}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Session Date: </span>{data.selectedSession.trainingdate}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Location: </span>{data.selectedSession.traininglocation}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Enterance Fee: </span>Rs. {data.selectedSession.trainingcost}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Email: </span>{data.selectedSession.serviceprovider.email}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Contact Number: </span>{data.selectedSession.serviceprovider.phonenumber}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>NIC: </span>{data.selectedSession.serviceprovider.nic}
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

export default AdminSessions;