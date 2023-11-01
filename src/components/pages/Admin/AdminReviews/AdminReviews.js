import React, { useState, useEffect } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import BgImage from '../../../../assets/images/header/Background.png';
import Bg2Image from '../../../../assets/images/header/footer.png';
import '../../../../style/Admin/AdminReviews.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Rating from "react-rating-stars-component";
import axios from 'axios';

const serverLink = 'http://localhost:8080';

export default function AdminReviews() {

    const [data, setData] = useState({
        currentPage: 1,
        showModal: false,
        totalPages: 1,
        searchTerm: '',
        activeTab: 'All',
        filteredReviews: [],
        displayedReviews: [],
        selectedReviews: [],
        showDetailsModal: false,
        selectedReview: null,
        reviewsPerPage: 3,
        showAcceptConfirmation: false,
        enable: true,
        reviewData: [],
        pendingReviews: [],
        selectedReviews: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllSystemReview');
                const detail = response.data;
                console.log(detail);
                setData({
                    ...data,
                    reviewData: detail,
                    pendingReviews: detail.filter((review) => review.status === 'Pending'),
                    selectedReviews: detail.filter((review) => review.status === 'Selected'),
                });
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
        const displayedReviews = filteredData.slice(startIndex, endIndex);

        setData((prevState) => ({
            ...prevState,
            currentPage: page,
            displayedReviews,
        }));
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
            displayedReviews: getDisplayedReviews(tab),
        }));
    };

    const getDisplayedReviews = (tab) => {

        let filteredReviews;

        switch (tab) {
            case 'All':
                filteredReviews = data.pendingReviews || [];
                break;
            case 'Selected':
                filteredReviews = data.selectedReviews || [];
                break;
            default:
                filteredReviews = data.reviewData || [];
                break;
        }

        if (data.searchTerm) {
            filteredReviews = filteredReviews.filter((review) => {
                review.review.toLowerCase().includes(data.searchTerm.toLowerCase()) || 
                    review.rating.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    review.users.firstname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    review.users.lastname.toLowerCase().includes(data.searchTerm.toLowerCase()) ||
                    review.posteddate.toLowerCase().includes(data.searchTerm.toLowerCase())
            });
        }

        return filteredReviews.slice(0, data.reviewsPerPage);
    };

    useEffect(() => {

        const totalPages = Math.ceil(getDisplayedReviews(data.activeTab).length / data.reviewsPerPage);

        setData((prevState) => ({
            ...prevState,
            totalPages,
            displayedReviews: getDisplayedReviews(data.activeTab),
            currentPage: 1,
        }));
    }, [data.searchTerm, data.activeTab, data.selectedReviews]);

    const handleAssign = (ratingid) => {
        const formData = new FormData();
        formData.append('ratingid', ratingid);
        formData.append('status', 'Selected');

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateSelectSystemReview', formData).then(
            (response) => {
                console.log(response);
                window.location.reload();
            }
        ).catch((error) => {
            console.log(error);
        });

    };

    const handleReassign = (ratingid) => {
        const formData = new FormData();
        formData.append('ratingid', ratingid);
        formData.append('status', 'Pending');

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put(serverLink + '/auth/updateSelectSystemReview', formData).then(
            (response) => {
                console.log(response);
                window.location.reload();
            }
        ).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div>
            <Tabs activeKey={data.activeTab} onSelect={(key) => handleTabChange(key)} className="service-tabs mb-3" >
                <Tab eventKey="All" title="All" />
                <Tab eventKey="Selected" title="Selected" />
            </Tabs>
            <section className="block review-block" style={{ backgroundImage: `url(${BgImage})` }}>

                {data.activeTab === "All" ? (
                    <>
                        <h2 className='ms-5 fw-bold align-self-start'>System Reviews</h2>
                        <div className="d-flex justify-content-end  w-100">
                            <div className='col-xs-2 col-sm-5 col-md-3 col-lg-3 col-xl-2 mx-5'>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Reviews"
                                        value={data.searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className='ms-5 fw-bold align-self-start'>Selected Reviews</h2>
                    </>
                )}

                <div className="d-flex flex-wrap justify-content-center mt-4">
                    {data.displayedReviews && data.displayedReviews.map((review) => (
                        <Card key={review.ratingid} className="col-xs-12">
                            <Card.Body className="py-3" style={{ backgroundImage: `url(${Bg2Image})` }}>
                                <div className="d-flex">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={review.users.profilePic}
                                            className="rounded-circle mb-4 mb-lg-0 shadow-2 d-none d-lg-block"
                                            alt="Profile Picture"
                                            width="100"
                                            height="100"
                                        />
                                        <Rating count={5} value={review.rating} size={25} activeColor="#ffd700" />
                                    </div>
                                    <div className="flex-grow-1 ms-4 ps-3">
                                        <blockquote className="blockquote mb-4"> <FontAwesomeIcon icon={faQuoteLeft} className="fa-lg text-warning me-2"/>
                                            <p> <span className="font-italic">{review.review}</span></p>
                                            <footer className="blockquote-footer mb-3">{review.users.firstname}{" "}{review.users.lastname}</footer>
                                        </blockquote>

                                        {data.activeTab === "All" && (
                                            <button
                                                className="btn-effect3"
                                                onClick={() => handleAssign(review.ratingid)}
                                            >
                                                Assign
                                            </button>
                                        )}
                                        {data.activeTab === "Selected" && (
                                            <button
                                                className="btn-effect3"
                                                onClick={() => handleReassign(review.ratingid)}
                                            >
                                                Reassign
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>

                <div className="pagination justify-content-center">
                    {Array.from({ length: data.totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`page-link ${data.currentPage === index + 1 ? "active" : ""}`}
                            style={{ backgroundColor: '#292D32', color: '#fff' }}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}