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

function AdminAdvertisers() {

    const [data, setData] = useState({
        currentPage: 1,
        showModal: false,
        totalPages: 1,
        searchTerm: '',
        activeTab: 'Pending',
        filteredAdvertisers: [],
        displayedAdvertisers: [],
        showDetailsModal: false,
        selectedAdvertiser: null,
        cardsPerPage: 3,
        showAcceptConfirmation: false,
        showRejectConfirmation: false,
        locked: false,
        rejectReason: '',
        rejectReasonErrorMessage: '',
        advertisersData: [],
        pendingAdvertisers: [],
        acceptedAdvertisers: [],
        rejectedAdvertisers: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllAdvertisers');
                const detail = response.data;

                const pendingAdvertisers = detail.filter(advertiser => advertiser.status === 'Pending');
                const acceptedAdvertisers = detail.filter(advertiser => advertiser.status === 'Accepted');
                const rejectedAdvertisers = detail.filter(advertiser => advertiser.status === 'Rejected');

                setData({
                    ...data,
                    advertisersData: detail,
                    pendingAdvertisers,
                    acceptedAdvertisers,
                    rejectedAdvertisers,
                    displayedAdvertisers: pendingAdvertisers.slice(0, data.cardsPerPage),
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.advertisersData);
    }, [data.advertisersData]);

    const totalPages = Math.ceil(data.advertisersData.length / data.cardsPerPage);
    const startIndex = (data.currentPage - 1) * data.cardsPerPage;
    const endIndex = startIndex + data.cardsPerPage;
    const displayedAdvertisers = data.advertisersData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * data.cardsPerPage;
        const endIndex = startIndex + data.cardsPerPage;
        const displayedAdvertisers = getDisplayedAdvertisers(data.activeTab).slice(startIndex, endIndex);

        setData({
            ...data,
            currentPage: page,
            displayedAdvertisers,
        });
    };


    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            searchTerm: value,
            currentPage: 1,
        }));
    };

    const handleTabChange = (tab) => {
        setData((prevState) => ({
            ...prevState,
            activeTab: tab,
            currentPage: 1,
            displayedAdvertisers: getDisplayedAdvertisers(tab),
        }));
    };

    const getDisplayedAdvertisers = (activeTab) => {
        let filteredAdvertisers;

        switch (activeTab) {
            case 'Pending':
                filteredAdvertisers = data.pendingAdvertisers || []; // Ensure it's defined or use an empty array
                break;
            case 'Accepted':
                filteredAdvertisers = data.acceptedAdvertisers || []; // Ensure it's defined or use an empty array
                break;
            case 'Rejected':
                filteredAdvertisers = data.rejectedAdvertisers || []; // Ensure it's defined or use an empty array
                break;
            default:
                filteredAdvertisers = [];
        }

        if (data.searchTerm) {
            console.log(data.searchTerm);
            filteredAdvertisers = filteredAdvertisers.filter((advertiser) =>
                advertiser &&
                (advertiser.firstname?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.lastname?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.email?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.phonenumber?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.address?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.nic?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.shopname?.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    advertiser.shopaddress?.toLowerCase().includes(data.searchTerm.toLowerCase())
                )
            );
        }

        return filteredAdvertisers.slice(0, data.cardsPerPage);
    };

    useEffect(() => {
        const totalPages = Math.ceil(getDisplayedAdvertisers(data.activeTab).length / data.cardsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            currentPage: 1,
            displayedAdvertisers: getDisplayedAdvertisers(data.activeTab),
        }));
    }, [data.searchTerm, data.activeTab]);

    const handleAcceptProvider = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userid', data.selectedAdvertiser.userid);
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

    const handleRejectAdvertiser = (rejectReason) => {
        let isError = false;
        let rejectReasonErrorMessage = '';

        if (rejectReason === '') {
            isError = true;
            rejectReasonErrorMessage = 'Please enter a reason for rejection.';
        }

        setData({ ...data, rejectReasonErrorMessage });

        if (!isError) {

            const formData = new FormData();

            formData.append('userid', data.selectedAdvertiser.userid);
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
        setData({ ...data, showDetailsModal: true, selectedAdvertiser: provider });
    };

    const handleServiceFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userid', data.selectedAdvertiser.userid);
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
        if (data.selectedAdvertiser) {
            setData({
                ...data,
                locked: data.selectedAdvertiser.locked,
            });
        }
    }, [data.selectedAdvertiser]);


    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="Pending" title="Pending" />
                <Tab eventKey="Accepted" title="Accepted" />
                <Tab eventKey="Rejected" title="Rejected" />
            </Tabs>

            <section id="service-page" className="block serviceProvider m-5 p-5" style={{ backgroundImage: `url(${BgImage})` }} >

                <h2 className="ms-5 fw-bold align-self-start">Advertisers</h2>

                <div className="d-flex justify-content-end  w-100">
                    <div className='me-xs-2 col-xs-2 col-sm-5 col-md-4 m-3'>
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
                    {data.displayedAdvertisers && data.displayedAdvertisers.map((advertiser) => (
                        <Card className="m-3" key={advertiser.userid}>
                            {data.activeTab !== 'Pending' && (
                                <Card.Img src={advertiser.image} alt="Advertiser" className="rounded-circle" width="50" height="50" />
                            )}
                            <Card.Body className="d-flex flex-column align-items-center" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                <p className="card-text fw-bold d-none d-md-block">{advertiser.firstName}{' '}{advertiser.lastName}</p>
                                <p className="card-text d-none d-md-block align-self-start" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Shop Name: {advertiser.shopname}</p>
                                <p className="card-text d-none d-md-block align-self-start" style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>Shop Address: {advertiser.shopaddress}</p>
                                <div className="d-flex flex-column justify-content-center text-center">
                                    <button onClick={() => handleShowDetails(advertiser)} className="btn" style={{ backgroundColor: '#0B85A0' }}>More Details</button>
                                    {data.activeTab === 'Pending' && (
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#0D6445" }}
                                            onClick={() => {
                                                setData({ ...data, showAcceptConfirmation: true, selectedAdvertiser: advertiser });
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
                                                setData({ ...data, showRejectConfirmation: true, selectedAdvertiser: advertiser });
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
                {data.selectedAdvertiser && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <p>FUll Name: {data.selectedAdvertiser.firstname} {data.selectedAdvertiser.lastname}</p>
                        <p>Shop Name: {data.selectedAdvertiser.shopname}</p>
                        <p className='fw-bold pt-2'>Are you sure you want to accept this Advertiser?</p>
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
                {data.selectedAdvertiser && (
                    <Modal.Body className="centered-body" style={{ backgroundImage: `url(${BgImage})` }}>
                        <p>FUll Name: {data.selectedAdvertiser.firstname} {data.selectedAdvertiser.lastname}</p>
                        <p>Shop Name: {data.selectedAdvertiser.shopname}</p>
                        <p className='fw-bold pt-2'>Are you sure you want to Reject this Advertiser?</p>
                        <p>If you select "Yes," please enter the reason for rejection.<span style={{ color: 'red' }}>*</span></p>
                        <input type="text" value={data.rejectReason} onChange={(e) => setData({ ...data, rejectReason: e.target.value })} placeholder="Enter Reject Reason" />
                        {data.rejectReasonErrorMessage && <p className="text-danger p-0 m-0">{data.rejectReasonErrorMessage}</p>}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button className='btn-effect3' onClick={() => setData({ ...data, showRejectConfirmation: false })}>
                        No
                    </Button>
                    <Button className='btn-effect' style={{ marginLeft: '10px' }} onClick={() => handleRejectAdvertiser(data.rejectReason)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Advertiser Details</Modal.Title>
                </Modal.Header>
                {data.selectedAdvertiser && (
                    <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
                        <div className="row">
                            <div className="col-md-8">
                                {data.activeTab !== 'Pending' && (
                                    <div className="d-flex justify-content-start">
                                        <img src={data.selectedAdvertiser.profilePic} alt="Service Provider" className="rounded-circle" width="100" height="100" />
                                    </div>
                                )}
                                {data.activeTab === 'Rejected' && (
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Reason for rejection: </span> {data.selectedAdvertiser.reason}
                                    </div>
                                )}
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>First Name: </span> {data.selectedAdvertiser.firstname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Last Name: </span> {data.selectedAdvertiser.lastname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Shop Name: </span> {data.selectedAdvertiser.shopname}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Shop Address:</span> {data.selectedAdvertiser.shopaddress}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>NIC: </span> {data.selectedAdvertiser.nic}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Email: </span> {data.selectedAdvertiser.email}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Phone Number: </span> {data.selectedAdvertiser.phonenumber}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Residential Address: </span> {data.selectedAdvertiser.address}
                                </div>
                                <div className="mt-2 bordered-paragraph rounded">
                                    <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Registered Date: </span> {data.selectedAdvertiser.registrationdate}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 " style={{ marginTop: '100px' }}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                        <h6 className="text-center">Certificates And Documents</h6>
                                    </div>
                                    <ul className="list-unstyled">
                                        {data.selectedAdvertiser.files.map((file, index) => (
                                            <li key={index}>
                                                <div className="d-flex align-items-center mb-2 p-2 rounded hover-effect" style={{ backgroundColor: "#ccc" }}>
                                                    <i className="bi bi-file-earmark-arrow-down-fill me-2 fs-4"></i>
                                                    <a
                                                        href={`data:${file.contentType};base64,${file.data}`}
                                                        download={file.fileName}
                                                        className="text-decoration-none text-dark fw-bold">
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

export default AdminAdvertisers;