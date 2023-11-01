import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Container, Form, Tab, Tabs } from 'react-bootstrap';
import '../../../../style/Admin/AdminServiceProvider.css';
import BgImage from '../../../../assets/images/header/Background.png';
import PopupBgImage from '../../../../assets/images/header/popupBg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styled from 'styled-components';
import { set } from 'lodash';
import axios from 'axios';

const StyledModalFooter = styled(Modal.Footer)`
        justify-content: flex-start;
    `;

const serverLink = 'http://localhost:8080'

function AdminCustomer() {

    const [data, setData] = useState({
        currentPage: 1,
        totalPages: 1,
        searchTerm: '',
        displayedCustomers: [],
        showDetailsModal: false,
        selectedCustomer: null,
        locked: false,
        fromDate: null,
        toDate: null,
        customersData: [],
        activeTab: 'Enabled',
    });

    const [enabledCustomers, setEnabledCustomers] = useState([]);
    const [disabledCustomers, setDisabledCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllCustomers');
                const detail = response.data;
                setData({
                    ...data,
                    customersData: detail,
                    displayedCustomers: detail.slice(0, cardsPerPage),
                });
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(data.customersData);
    }, [data.customersData]);

    const cardsPerPage = 9;
    const totalPages = Math.ceil(data.customersData.length / cardsPerPage);
    const startIndex = (data.currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setData((prevState) => ({
            ...prevState,
            searchTerm: value,
        }));
    };

    useEffect(() => {
        const searchedServices = data.searchTerm.trim() === '' ?
            (data.activeTab === 'Enabled' ? enabledCustomers : disabledCustomers) :
            (data.activeTab === 'Enabled' ? enabledCustomers : disabledCustomers).filter((customer) => (
                customer.firstname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                customer.lastname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                customer.phonenumber.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                customer.nic.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                customer.address.toLowerCase().includes(data.searchTerm.toLowerCase())
            ));

        const fromDateObj = data.fromDate ? new Date(data.fromDate) : null;
        const toDateObj = data.toDate ? new Date(data.toDate) : null;

        const filteredServices = searchedServices.filter((customer) => {
            const registeredDateObj = new Date(customer.registrationdate);
            return (
                (!fromDateObj || registeredDateObj >= fromDateObj) &&
                (!toDateObj || registeredDateObj <= toDateObj)
            );
        });

        const totalPages = Math.ceil(filteredServices.length / cardsPerPage);
        setData((prevState) => ({
            ...prevState,
            totalPages,
            displayedCustomers: filteredServices.slice(
                (data.currentPage - 1) * cardsPerPage,
                data.currentPage * cardsPerPage
            ),
        }));
    }, [data.searchTerm, data.currentPage, data.fromDate, data.toDate, data.activeTab, enabledCustomers, disabledCustomers]);

    useEffect(() => {
        const enabled = data.customersData.filter((customer) => !customer.locked);
        const disabled = data.customersData.filter((customer) => customer.locked);

        setEnabledCustomers(enabled);
        setDisabledCustomers(disabled);

        if (data.activeTab === 'Enabled') {
            setData((prevState) => ({
                ...prevState,
                displayedCustomers: enabled.slice(0, cardsPerPage),
            }));
        } else if (data.activeTab === 'Disabled') {
            setData((prevState) => ({
                ...prevState,
                displayedCustomers: disabled.slice(0, cardsPerPage),
            }));
        }
    }, [data.customersData, data.activeTab]);

    const handlePageChange = (page) => {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const displayedCustomers = data.filteredServices.slice(startIndex, endIndex);
        setData({ ...data, currentPage: page, displayedCustomers });
    };

    const handleShowDetails = (provider) => {
        setData({ ...data, showDetailsModal: true, selectedCustomer: provider });
    };

    const handleServiceFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('userid', data.selectedCustomer.userid);
        formData.append('locked', data.locked);

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateCustomer', formData).then(

            (response) => {

                console.log(response.data);
                window.location.reload();

            }

        ).catch(

            () => { alert("Error!!!") }

        )

        setData({
            ...data,
            showServiceModal: false,
        });
    };

    const handleTabChange = (tab) => {
        setData((prevState) => ({
            ...prevState,
            activeTab: tab,
        }));

        if (tab === 'Enabled') {
            setData((prevState) => ({
                ...prevState,
                displayedCustomers: enabledCustomers.slice(0, cardsPerPage),
            }));
        } else if (tab === 'Disabled') {
            setData((prevState) => ({
                ...prevState,
                displayedCustomers: disabledCustomers.slice(0, cardsPerPage),
            }));
        }
    };


    useEffect(() => {
        if (data.selectedCustomer) {
            setData({ ...data, locked: data.selectedCustomer.locked });
        }
    }, [data.selectedCustomer]);

    return (

        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="Enabled" title="Enabled" />
                <Tab eventKey="Disabled" title="Disabled" />
            </Tabs>

            <section id="service-page" className="block serviceProvider py-3" style={{ backgroundImage: `url(${BgImage})` }} >

                <h2 className="ms-5 fw-bold align-self-start">Customers</h2>

                <div className="d-flex justify-content-center w-100">

                    <div className='col-xs-3 col-md-4 col-lg-4 col-xl-4 col-xxl-3 m-3 me-0 date-picker-container'>
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
                    <div className='me-xs-2 col-xs-2 col-md-4 col-lg-4 col-xl-4 col-xxl-3 m-3 date-picker-container'>
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

                    <div className='col-xs-2 col-sm-3 col-md-2 col-lg-3 col-xl-2 m-3 me-xs-5'>
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

                <div className="mt-4 d-flex flex-column w-100" style={{ width: '100%' }}>
                    <Container className="table-responsive">
                        <Table striped bordered hover size="sm" className="custom-table">
                            <thead className='text-center'>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>NIC</th>
                                    <th>Contact Number</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>More</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.displayedCustomers.map((customer) => (
                                    <tr key={customer.userid}>
                                        <td>{customer.firstname}</td>
                                        <td>{customer.lastname}</td>
                                        <td>{customer.nic}</td>
                                        <td>{customer.phonenumber}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.address}</td>
                                        <td className='d-flex justify-content-center'>
                                            <i className="bi bi-info-circle-fill fs-3" onClick={() => handleShowDetails(customer)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
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

                <Modal show={data.showDetailsModal} onHide={() => setData({ ...data, showDetailsModal: false })} centered>
                    <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                        <Modal.Title>Customer Details</Modal.Title>
                    </Modal.Header>
                    {data.selectedCustomer && (
                        <Modal.Body className="text-start" style={{ backgroundImage: `url(${PopupBgImage})` }}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex justify-content-start">
                                        <img src={data.selectedCustomer.profilePic} alt="Customer" className="rounded-circle" width="100" height="100" />
                                    </div>

                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>First Name: </span> {data.selectedCustomer.firstname}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Last Name: </span> {data.selectedCustomer.lastname}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>NIC: </span> {data.selectedCustomer.nic}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Email: </span> {data.selectedCustomer.email}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Address: </span> {data.selectedCustomer.address}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>contact Number: </span> {data.selectedCustomer.phonenumber}
                                    </div>
                                    <div className="mt-2 bordered-paragraph rounded">
                                        <span style={{ color: '#9F390D', fontWeight: 'bold' }}>Registered Date: </span> {data.selectedCustomer.registrationdate}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    )}

                    <StyledModalFooter>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 d-flex justify-content-start align-items-center">
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
                                        className='ms-0 me-1 custom-radio'
                                    />
                                </div>
                                <div className="col-sm-6 d-flex justify-content-center align-items-center m-0">
                                    <Button className="btn-effect3  me-2" onClick={() => setData({ ...data, showServiceModal: false })}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="btn-effect" onClick={handleServiceFormSubmit}>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </StyledModalFooter>

                </Modal>

            </section>

        </div>

    );
}

export default AdminCustomer;