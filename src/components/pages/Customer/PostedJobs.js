import React, { useState, useEffect } from "react";
import { Modal, Button, Tabs, Tab, Table } from 'react-bootstrap'; // Import Tabs and Tab components
import axios from "axios";
import { Link } from 'react-router-dom';
import BgImage from '../../../assets/images/header/Background.png';

const response = sessionStorage.getItem('authenticatedUser');
const userData = JSON.parse(response);

export default function PostedJobs() {
    const apiBaseUrl = "http://localhost:8080";

    const axiosInstance = axios.create({
        baseURL: apiBaseUrl,
        timeout: 10000,
    });

    const [jobs, setJobs] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobid, setJobId] = useState("");
    const [selectedJob, setSelectedJob] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [activeTab, setActiveTab] = useState("tab1");

    useEffect(() => {
        axiosInstance
            .get("/auth/viewjobs")
            // .get(`http://localhost:8080/auth/viewjobsbyuserid/${userData.userid}`)

            .then((response) => {
                setJobs(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    }, []);
    // State to store vacancies
    const [vacancies, setVacancies] = useState([]);

    // Fetch vacancies data from the backend
    useEffect(() => {
        axiosInstance
            .get("/auth/viewvacancies") // Adjust the API endpoint as per your backend route

            .then((response) => {
                setVacancies(response.data);
            })
            .catch((error) => {
                console.log("Error fetching vacancies:", error);
            });
    }, []);

    // const openModalDelete = (jobid) => {
    //     setIsDeleteModalOpen(true);
    //     setJobId(jobid);
    //     setSelectedJob(jobs.find((job) => job.jobid === jobid));
    //     console.log("jobid", jobid);
    // };

    // const closeModalDelete = () => {
    //     setIsDeleteModalOpen(false);
    // };

    const quotations = jobs.map((job) => {
        if (!job.disabled) {
            return {
                date: job.posteddate,
                serviceTitle: job.servicename,
                duedate: job.duedate,
                jobid: job.jobid
            };
        }
        return null;
    }).filter(Boolean);

    const vacanciesMapped = vacancies.map((vacancy) => {
        if (!vacancy.disabled) {
            return {
                servicename: vacancy.servicename,
                duedate: vacancy.duedate,
                vacancyid: vacancy.vacancyid
            };
        } return null;
    }).filter(Boolean);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentQuotations = quotations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(quotations.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // const handleDeleteJobId = (e) => {
    //     setJobId(e.target.value);
    // };

    // const handleDeleteJob = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axiosInstance.delete(`/auth/deletejobs/${jobid}`, {});

    //         if (response.status === 200) {
    //             console.log("okkk");
    //             closeModalDelete();
    //             window.location.reload();
    //         }
    //     } catch (error) {
    //         console.log("vfvn fjvhfj vfhtv");
    //         console.log(error);
    //     }
    // };


    const Delete = ({ jobId, onDelete }) => {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleDelete = () => {
            axios
                .delete(`http://localhost:8080/auth/deletejobs/${jobId}`)
                .then((response) => {
                    console.log("Job disabled successfully:", response.data);
                    handleClose();
                    window.location.reload();
                    onDelete(jobId);
                    setActiveTab("tab1");

                })
                .catch((error) => {
                    console.error("Error disabling jobs:", error);
                });
        };

        const handleTabSelect = (key) => {
            setActiveTab(key);
        };


        return (
            <>
                <Button
                    variant="btn btn-viewvacancy-form-t"
                    style={{
                        width: '15%',
                        height: '30px',
                        border: '1px solid #ced4da',
                        fontSize: '14px',
                        padding: '0 8px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        fontWeight: '500',
                        textTransform: 'none',
                        background: 'black',
                    }}
                    onClick={handleShow}
                >
                    <i className="my-customer-table-icon bi bi-trash h7"></i>
                </Button>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }} >
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <p>Are you sure to delete?</p>
                        <Button
                            variant="btn btn-viewvacancy-form-a"
                            style={{
                                width: '15%',
                                height: '38px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                padding: '0 8px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                fontWeight: '500',
                                textTransform: 'none',
                                marginRight: '200px',
                                background: 'black',
                            }}
                            onClick={handleDelete}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="btn btn-viewvacancy-form-r"
                            style={{
                                width: '15%',
                                height: '38px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                padding: '0 8px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                fontWeight: '500',
                                textTransform: 'none',
                                background: 'rgb(126, 123, 123)',
                            }}
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    
    const DeleteVacancy = ({ vacancyId, onDelete }) => {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleDelete = () => {
            axios
                .delete(`http://localhost:8080/auth/deletevacancies/${vacancyId}`)
                .then((response) => {
                    console.log("Job disabled successfully:", response.data);
                    handleClose();
                    window.location.reload();
                    onDelete(vacancyId);
                    setActiveTab("tab2");

                })
                .catch((error) => {
                    console.error("Error disabling jobs:", error);
                });
        };

        const handleTabSelect= (key) => {
            setActiveTab(key);
        };


        return (
            <>
                <Button
                    variant="btn btn-viewvacancy-form-t"
                    style={{
                        width: '15%',
                        height: '30px',
                        border: '1px solid #ced4da',
                        fontSize: '14px',
                        padding: '0 8px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        fontWeight: '500',
                        textTransform: 'none',
                        background: 'black',
                    }}
                    onClick={handleShow}
                >
                    <i className="my-customer-table-icon bi bi-trash h7"></i>
                </Button>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }} >
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center">
                        <p>Are you sure to delete?</p>
                        <Button
                            variant="btn btn-viewvacancy-form-a"
                            style={{
                                width: '15%',
                                height: '38px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                padding: '0 8px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                fontWeight: '500',
                                textTransform: 'none',
                                marginRight: '200px',
                                background: 'black',
                            }}
                            onClick={handleDelete}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="btn btn-viewvacancy-form-r"
                            style={{
                                width: '15%',
                                height: '38px',
                                border: '1px solid #ced4da',
                                fontSize: '14px',
                                padding: '0 8px',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                fontWeight: '500',
                                textTransform: 'none',
                                background: 'rgb(126, 123, 123)',
                            }}
                            onClick={handleClose}
                        >
                            No
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
    const handleTabSelect = (key) => {
        setActiveTab(key);
    };
   
    return (
        <>
            <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
                <div className="vacancy-container background-total accordion " >
                    <div className="col d-flex flex-row justify-content-between">
                        <div className='d-flex flex-row gap-4 p-3 '>
                            <p className="text-dark fs-4 fw-bold vacancytext"> Posted Jobs</p>
                        </div>
                    </div>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={handleTabSelect}
                        id="tab-container"
                    >
                        {/* First Tab */}
                        <Tab eventKey="tab1" title="Short Term">
                            <div className="my-customer-table-container">
                                <Table className="my-customer-table" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Date</b></th>
                                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Service Title</b></th>
                                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Due Date</b></th>
                                            <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Action</b></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quotations.map((quotation, index) => (
                                            <tr key={index}>
                                                <td style={{ width: '16.67%' }}>{quotation.date}</td>
                                                <td style={{ width: '16.67%' }}>{quotation.serviceTitle}</td>
                                                <td style={{ width: '16.67%' }}>{quotation.duedate}</td>
                                                <td style={{ width: '16.67%' }}>
                                                    <Link to={`/customer/ViewPostedJobs/${quotation.jobid}`} style={{
                                                        width: '15%',
                                                        height: '35px',
                                                        border: '1px solid #ced4da',
                                                        fontSize: '14px',
                                                        padding: '0 8px',
                                                        backgroundColor: '#007bff',
                                                        color: '#fff',
                                                        fontWeight: '500',
                                                        textTransform: 'none',
                                                        background: 'black',
                                                    }}>
                                                        <i className="my-customer-table-icon bi bi-eye-fill h7"></i>
                                                    </Link>
                                                    &nbsp; &nbsp;
                                                    <Delete jobId={quotation.jobid} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>

                        {/* Second Tab */}
                        <Tab eventKey="tab2" title="Long Term">
                            <div className="my-customer-table-container">
                                <Table className="my-customer-table" striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Due Date</th>
                                            <th>Service Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vacanciesMapped.map((vacancy, index) => (
                                            <tr key={index}>
                                                <td>{vacancy.duedate}</td>
                                                <td>{vacancy.servicename}</td>
                                                <td>                                                   
                                                    <DeleteVacancy vacancyId={vacancy.vacancyid} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
