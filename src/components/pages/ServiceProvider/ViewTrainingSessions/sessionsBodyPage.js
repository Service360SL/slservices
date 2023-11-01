import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import trainingsessionimage from '../../../../assets/images/ServiceProvider/TrainingSession/default.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import LocationByCitiesJson from '../../../loginForm/cities-by-district.json';

function SessionsBodyPage() {
    const [viewTrainingSessionsData, setviewTrainingSessionsData] = useState(null);
    const [myservicesData, setMyservicesData] = useState([]);

    const [interestedSessions, setInterestedSessions] = useState(() => {
        const interestedSessionsFromStorage = localStorage.getItem('interestedSessions');
        return interestedSessionsFromStorage ? JSON.parse(interestedSessionsFromStorage) : [];
    });

    // Number of cards (training sessions) to display per page
    const cardsPerPage = 3;

    // State to keep track of the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // State to store the search term
    const [searchTerm, setSearchTerm] = useState('');

    // State to store the filter by category
    const [filterCategoryTerm, setFilterCategoryTerm] = useState('');

    // State to store the filter by location
    const [filterLocationTerm, setFilterLocationTerm] = useState('');

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    // Function to save interested sessions in localStorage when it changes
    useEffect(() => {
        localStorage.setItem('interestedSessions', JSON.stringify(interestedSessions));
    }, [interestedSessions]);

    // Function to handle page change when the user clicks on pagination buttons
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
        setCurrentPage(1);   // Reset current page to 1 when search term changes
    };

    // Function to handle filter by category changes
    const handlefilterCategoryChange = (category) => {
        setFilterCategoryTerm(category);
        setCurrentPage(1); // Reset current page to 1 when date changes
    };

    // Function to handle filter by location changes
    const handleFilterLocationChange = (location) => {
        setFilterLocationTerm(location);
        setCurrentPage(1); // Reset current page to 1 when location changes
    };

    // (ONLY FETCH PUBLISHED TRAINING SESSIONS)
    useEffect(() => {
        axios.get('http://localhost:8080/auth/viewTrainingSessions').then((res) => {
            console.log(res.data);
            setviewTrainingSessionsData(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`).then((res) => {
            console.log(res.data);
            setMyservicesData(res.data);
        });
    }, []);

    if (!viewTrainingSessionsData) {
        return <FontAwesomeIcon icon={faSpinner} className='fa-spin-trainingsession-sp'/>;
    }

    const handleIntrested = (trainingsessionid) => {
        // Check if the user has already clicked "Interested" for this session
        if (interestedSessions.includes(trainingsessionid)) {
            axios
                .put(`http://localhost:8080/auth/TrainingSessionNotIntrested?trainingsessionid=${trainingsessionid}`)
                .then((response) => {
                    console.log('Interested Count Updated successfully:', response.data);
                    // Update the entries without page refresh
                    setviewTrainingSessionsData((prevData) => ({
                        ...prevData,
                        trainingsessions: prevData.trainingsessions.map((session) =>
                            session.trainingid === trainingsessionid
                                ? { ...session, interested: session.interested - 1 }
                                : session
                        ),
                    }));
                    // Remove the session ID from the interestedSessions state
                    setInterestedSessions(interestedSessions.filter((id) => id !== trainingsessionid));
                })
                .catch((error) => {
                    console.error('Error updating interested count:', error);
                });
        } else {
            axios
                .put(`http://localhost:8080/auth/TrainingSessionIntrested?trainingsessionid=${trainingsessionid}`)
                .then((response) => {
                    console.log('Interested Count Updated successfully:', response.data);
                    // Update the entries without page refresh
                    setviewTrainingSessionsData((prevData) => ({
                        ...prevData,
                        trainingsessions: prevData.trainingsessions.map((session) =>
                            session.trainingid === trainingsessionid
                                ? { ...session, interested: session.interested + 1 }
                                : session
                        ),
                    }));
                    // Add the session ID to the interestedSessions state
                    setInterestedSessions([...interestedSessions, trainingsessionid]);
                })
                .catch((error) => {
                    console.error('Error updating interested count:', error);
                });
        }
    };
    

    function convertTo12HourFormat(time24) {
        const [hour, minute] = time24.split(":");
        const hourInt = parseInt(hour);
        const amPm = hourInt >= 12 ? "PM" : "AM";
        const hour12 = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
      
        return `${hour12}:${minute} ${amPm}`;
    }

    const filteredCards = viewTrainingSessionsData.trainingsessions.filter((card) => {
        console.log(filterCategoryTerm, filterLocationTerm)
        return (
            (!filterCategoryTerm || card.servicename.toLowerCase() === filterCategoryTerm.toLowerCase()) &&
            (!filterLocationTerm || card.traininglocation.toLowerCase() === filterLocationTerm.toLowerCase()) &&
            (card.servicename.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.trainingtitle.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    // Calculate the start and end indices of the displayed training sessions for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    // Create a subset of training sessions to be displayed on the current page
    const displayedCards = filteredCards.slice(startIndex, endIndex);


    // Get all images from the training sessions
    const trainingSessionImagesArray = viewTrainingSessionsData.trainingsessionimages;
    
    // Initialize an empty array to store all images
    const allImages = [];

    // Iterate through trainingSessionImagesArray
    trainingSessionImagesArray.forEach((sessionImages) => {
    // Check if the current object has an 'images' property
    if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
        // Concatenate the 'images' array to the 'allImages' array
        allImages.push(...sessionImages.images);
    }
    });

    console.log(allImages);

    return (
        <div>

            {/* Page Title*/}
            <span className="ms-4 align-self-start" style={{ fontSize: "28px", fontWeight: "600" }}>View Training Sessions</span>

            {/* Nav Bar */}
            <Navbar className='mt-4 mb-3 ms-lg-4 me-md-4'>
                <div className="body-nav-container d-flex flex-row col-12">
                    <div className="d-flex flex-row">
                        <input
                            type="text"
                            className="form-control training-nav-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <span className="input-group-text training-nav-input">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                    <Nav
                        className="body-nav-filter-container d-flex ms-auto flex-row justify-content-center"
                        style={{ maxHeight: '100px' }}
                        id="nav-filter"
                    >
                        <NavDropdown title="Select Job Category" id="navbarScrollingDropdown" onSelect={handlefilterCategoryChange}>
                            {/* Loop MyServices */}
                            {myservicesData.map((service) => (
                                <NavDropdown.Item key={service.serviceId} eventKey={service.serviceName}>{service.serviceName}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <NavDropdown title="Filter by Location" id="navbarScrollingDropdown" className='me-lg-4' onSelect={handleFilterLocationChange}>
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                {Object.keys(LocationByCitiesJson).map((location, index) => (
                                    LocationByCitiesJson[location].cities.map((city, subIndex) => (
                                        <NavDropdown.Item key={`${index}-${subIndex}`} eventKey={city}>
                                            {city}
                                        </NavDropdown.Item>
                                    ))
                                ))}
                            </div>
                        </NavDropdown>
                    </Nav>
                </div>
            </Navbar>

            {/* Training Session Cards */}
            {displayedCards.map((TrainingSession, index) => {
                // Find the matching training session images
                const matchingSessionImages = trainingSessionImagesArray.find(sessionImages => sessionImages.id === TrainingSession.trainingid);

                // Extract the images array if found, or provide an empty array as a default value
                const imagesArray = matchingSessionImages ? matchingSessionImages.images : [];

                return(
                    //TrainingSession.trainingid gives the id
                    <div className="single-my-training-card mx-auto mt-3" key={index}>
                        <div className="row">
                            <div className="col-md-5 col-12 my-training-card-body-left d-flex justify-content-center justify-content-md-start" style={{ maxHeight: '400px', overflow: 'hidden'}}>
                                <img
                                    className="view-training-image"
                                    src={imagesArray.length > 0 ? `data:image/jpg;base64,${imagesArray[0]}` : trainingsessionimage}
                                    alt={`Training Session ${index}`} 
                                    style={{
                                        height: '200px',
                                        width: '100%',
                                        objectFit: 'contain',
                                        backgroundColor:"#e9e9e9" 
                                    }}
                                />
                            </div>
                            <div className="col-md-7 col-12 my-training-card-body-right">
                                <span className="single-my-training-info">{TrainingSession.trainingtitle}</span>
                                <br />
                                <span className="my-training-location-info">
                                    <i className="bi bi-geo-alt-fill"></i>&nbsp; Location: {TrainingSession.traininglocation}
                                </span>
                                <br />
                                <span className="single-my-training-time">
                                    <i className="bi bi-clock-fill"></i>&nbsp; {TrainingSession.trainingdate} At {convertTo12HourFormat(TrainingSession.trainingstarttime)} - {convertTo12HourFormat(TrainingSession.trainingendtime)}
                                </span>
                                <br />
                                <div className="single-traning-guests border border-dark mt-2 mb-4 col">
                                    <div className="custom-training-row row align-itmes-center">
                                        <span className="single-my-training-guests border border-primary col-12">Guests</span>
                                    </div>
                                    <div className="custom-training-row row">
                                        <span className="single-my-training-intrested border border-primary col-6">{TrainingSession.interested} intrested</span>
                                        <span className="single-my-training-going border border-primary col-6">{TrainingSession.going} going</span>
                                    </div>
                                </div>
                                <hr />
                                <div className="my-training-card-footer d-flex flex-row">
                                    <span onClick={() => handleIntrested(TrainingSession.trainingid)}
                                        className="btn btn-default my-training-card-footer-btn"
                                        id="my-training-card-footer-btn-view"
                                    >
                                        <i className={`bi ${
                                                interestedSessions.includes(TrainingSession.trainingid)
                                                    ? 'bi-star-fill'
                                                    : 'bi-star'
                                            } h5`}
                                        ></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{ position: "relative", bottom: "1.5px" }}>intrested</span>
                                    </span>
                                    <Link to={`/ServiceProvider/ViewATrainingSession/${TrainingSession.trainingid}`}
                                        className="btn btn-default my-training-card-footer-btn"
                                        id="my-training-card-footer-btn-view"
                                    >
                                        <i className="bi bi-credit-card h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span style={{ position: "relative", bottom: "1.5px" }}>Register</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            <div className="pagination justify-content-center">
                {/* Create pagination buttons for each page */}
                {Array.from({ length: Math.ceil(filteredCards.length / cardsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`page-link ${currentPage === index + 1 ? 'active' : ''
                            }`}
                        style={{ backgroundColor: '#292D32', color: '#fff', width: '35px', height: '35px', fontSize: '16px' }}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default SessionsBodyPage;