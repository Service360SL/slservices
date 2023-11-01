import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/Viewvacancy.css';
import { Link } from 'react-router-dom';
import BgImage from '../../../assets/images/header/Background.png';
import axios from "axios";

const response = sessionStorage.getItem('authenticatedUser');
const userData = JSON.parse(response);

function ComplaintPopup() {
    const [show, setShow] = useState(false);
    const [complaintData, setComplaintData] = useState({
        complainttitle: "",
        complaintdescription: "",
        users: {
            userid: userData.userid
        }
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/auth/createcomplaints", complaintData)
            .then((response) => {
                console.log("Complaint added successfully:", response.data);
                handleClose();
                window.location.reload();

            })
            .catch((error) => {
                console.error("Error adding complaint:", error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setComplaintData({ ...complaintData, [name]: value });
    };

    return (
        <>
            <Button variant='secondary' style={{ background: "#292d32" }} onClick={handleShow}>
                Add Complaints
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Make Complaints</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="vacancy-form" onSubmit={handleSubmit}>
                        <div className="vacancy-form-group">
                            <label htmlFor="complaintCategory">Complaint Title<span style={{ color: "red" }}>&nbsp;*</span> </label>
                            <input
                                type="text"
                                name="complainttitle"
                                className="form-control"
                                id="complainttitle"
                                placeholder="Enter your Complaint"
                                value={complaintData.complainttitle}
                                onChange={handleChange}
                            />
                            <label htmlFor="description">Description <span style={{ color: "red" }}>&nbsp;*</span> </label>
                            <textarea
                                name="complaintdescription"
                                className="form-control"
                                id="complaintdescription"
                                placeholder="Enter your Description"
                                value={complaintData.complaintdescription}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant='secondary' style={{ background: "#292d32", marginRight: '200px' }} type="submit">
                                Submit
                            </Button>
                            <Button variant="secondary" style={{ background: "#687699" }} onClick={handleClose}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

const View = ({ complaintId }) => {
    const [show, setShow] = useState(false);
    const [complaintReply, setComplaintReply] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // Fetch the complaint description when the modal is shown
        fetchComplaintReply(complaintId);
    };

    const fetchComplaintReply = (complaintId) => {
        axios.get(`http://localhost:8080/auth/viewcomplaints/${complaintId}`)
            .then((response) => {
                // Set the complaint description in state
                setComplaintReply(response.data.reply);
            })
            .catch((error) => {
                console.error("Error fetching complaint description:", error);
            });
    };

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" style={{
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
                '@media (maxWidth: 768px)': {
                    width: '100%',
                }
            }} onClick={handleShow} >
                <i className="my-customer-table-icon bi bi-eye-fill h7"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }}>
                    <Modal.Title>Reply</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><p>{complaintReply}</p></center>
                </Modal.Body>

            </Modal>
        </>
    );
};


const Delete = ({ complaintId, onDelete }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = () => {
        // Make an API request to update the complaint's disabled property to true
        axios
            .delete(`http://localhost:8080/auth/deletecomplaints/${complaintId}`)
            .then((response) => {
                console.log("Complaint disabled successfully:", response.data);
                handleClose();
                window.location.reload();

                onDelete(complaintId);
            })
            .catch((error) => {
                console.error("Error disabling complaint:", error);
            });
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
                    '@media (maxWidth: 768px)': {
                        width: '100%',
                    }
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
                            '@media (maxWidth: 768px)': {
                                width: '60%',
                            }
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
                            '@media (maxWidth: 768px)': {
                                width: '60%',
                            }
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

const More = ({ complaintId }) => {
    const [show, setShow] = useState(false);
    const [complaintDescription, setComplaintDescription] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        fetchComplaintDescription(complaintId);
    };

    const fetchComplaintDescription = (complaintId) => {
        axios.get(`http://localhost:8080/auth/viewcomplaints/${complaintId}`)
            .then((response) => {
                setComplaintDescription(response.data.complaintdescription);
            })
            .catch((error) => {
                console.error("Error fetching complaint description:", error);
            });
    };

    return (
        <>
            <Button variant="btn btn-viewvacancy-form-t" onClick={handleShow}>
                <i className="bi bi-chat-square-text-fill fs-4"></i>
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#303841', color: '#fff' }} >
                    <Modal.Title>Complaint Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center><p>{complaintDescription}</p></center>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default function CustomerComplaintPage() {
    const apiBaseUrl = "http://localhost:8080";

    const [Complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiBaseUrl + `/auth/viewcomplaintsbyuserid/${userData.userid}`)
                const detail = response.data;
                setComplaints(detail);
            }
            catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    const Cuscomplaints = Complaints.map((complaint) => {
        if (!complaint.disabled) {
            return {
                date: complaint.posteddate,
                complaint: complaint.complainttitle,
                complaintstatus: complaint.complaintstatus,
                complaintid: complaint.complaintid
            };
        }
        return null;
    }).filter(Boolean);

    return (
        <>

            <div className='vacancybackground' style={{ backgroundImage: `url(${BgImage})` }}>
                <div className="vacancy-container background-total accordion " >
                    <div className="col d-flex flex-row justify-content-between">
                        <div className='d-flex flex-row gap-4 p-3'>
                            <h3 className="text-dark fs-4 fw-bold vacancytext">Complaint</h3>

                        </div>
                        <div className='d-flex justify-content-center justify-content-md-end gap-4 p-4'>
                            <ComplaintPopup />
                        </div>
                    </div>

                </div>

                <div className="my-customer-table-container">
                    <Table className="my-customer-table" striped bordered hover>
                        <thead>
                            <tr>
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Date</b></th>
                                <th className="my-customer-table-th-1" style={{ width: '16.67%' }}><b>Status</b></th>
                                <th className="my-customer-table-th-1" style={{ width: '18.67%' }}><b>Complaint Title</b></th>
                                <th className="my-customer-table-th-1" style={{ width: '18.67%' }}><b>Complaint Description</b></th>
                                <th className="my-customer-table-th-2" style={{ width: '16.67%' }}><b>Action</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Cuscomplaints && Cuscomplaints.map((complaint) => (
                                <tr key={complaint.complaintid}>
                                    <td>{complaint.date}</td>
                                    <td>{complaint.complaintstatus}</td>
                                    <td>{complaint.complaint}</td>
                                    <td><More complaintId={complaint.complaintid} /></td>
                                    <td>

                                        {complaint.complaintstatus === 'Replied' && (
                                            <View complaintId={complaint.complaintid} />
                                        )}&nbsp;&nbsp;
                                        <Delete complaintId={complaint.complaintid} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <br></br>

            </div>
        </>
    );
}
