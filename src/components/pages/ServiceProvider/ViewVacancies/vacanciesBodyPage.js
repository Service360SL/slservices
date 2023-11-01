import '../../../../style/ServiceProvider/ViewVacancies.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserImg from '../../../../assets/images/header/user.jpg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function VacanciesBodyPage() {
    const [viewVacanciesData, setviewVacanciesData] = useState(null);

    const MyServices = [
        "Electrical Wiring",
        "Masonry",
        "Sofa Cleaning",
        "Tiles Fitting",
    ];

    // Number of cards to display per page
    const cardsPerPage = 5;

    // State to keep track of the current page number
    const [currentPage, setCurrentPage] = useState(1);

    // State to store the search term
    const [searchTerm, setSearchTerm] = useState('');

    // State to store the filter by category
    const [filterCategoryTerm, setFilterCategoryTerm] = useState('');

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

    useEffect(() => {
        axios.get('http://localhost:8080/auth/viewNewVacancies').then((res) => {
            console.log(res.data);
            setviewVacanciesData(res.data);
        });
    }, []);

    if (!viewVacanciesData) return 'No Vacancies found!';

    // Filter training sessions based on search term and selected date
    const filteredCards = viewVacanciesData.filter((card) => {
        return (
            (!filterCategoryTerm || card.serviceName === filterCategoryTerm) &&
            (card.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.vacancylocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.vacancydescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.vacancytitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.servicename.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    // Calculate the start and end indices of the displayed training sessions for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    // Create a subset of training sessions to be displayed on the current page
    const displayedCards = filteredCards.slice(startIndex, endIndex);



    return (
        <div>

            {/* Page Title*/}
            <span className="ms-4 align-self-start" style={{ fontSize: "28px", fontWeight: "600" }}>View Vacancies</span>

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
                            {MyServices.map((service) => (
                                <NavDropdown.Item key={service} eventKey={service}>{service}</NavDropdown.Item>
                            ))}
                        </NavDropdown>
                        <NavDropdown title="Filter by Location" id="navbarScrollingDropdown" className='me-lg-4'>
                            <NavDropdown.Item href="#action3">All Island</NavDropdown.Item>
                            <NavDropdown.Item >or</NavDropdown.Item>
                            &nbsp; &nbsp;
                            <input type="range" name="distance" min="1km" max="50km" />               {/*ADD LOCATION PART IS REMAINING*/}
                        </NavDropdown>
                    </Nav>
                </div>
            </Navbar>

            {/* Vacancy Cards */}

            {displayedCards.map((Vacancy, index) => (
                <div className='single-vacancy-card mx-auto mt-3' >
                    <div className='vacancy-card-header'>
                        <div className='job-card-header-inner-container d-flex flex-row flex-wrap'>
                            <div className='d-flex justify-content-center align-items-center'>
                                {/* <img src={CompanyImg} alt='avatar' className='vacancy-card-avatar'/> */}
                                <img
                                    src=""
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: "42px", height: "42px" }}
                                />
                            </div>
                            <div className='d-flex flex-column'>
                                <div className='ms-sm-3'>
                                    <span className='vacancy-card-title'>{Vacancy.customername}</span>
                                </div>
                                <div className='ms-sm-3 d-flex'>
                                    <span className='vacancy-card-date'>{Vacancy.lastseen}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='vacancy-card-body'>
                        <div className='vacancy-card-body-left d-flex flex-column'>
                            <div>
                                <span className='vacancy-location-info'>
                                    <i className="bi bi-geo-alt-fill"></i>&nbsp;
                                    Location: {Vacancy.vacancylocation}
                                </span>
                            </div>
                            <div className='vacancy-card-body-inner-flex d-flex flex-row'>
                                <div>
                                    <span className='single-vacancy-title '>{Vacancy.vacancytitle}</span>&nbsp;&nbsp;
                                </div>
                                <div>
                                    <span className='single-vacancy-type d-flex justify-contents-center' id='vacancy-status'>{Vacancy.vacancytype}</span>
                                </div>
                            </div>
                            <div>
                                <span className='single-vacancy-description'>{Vacancy.vacancydescription}</span>
                            </div>
                            <div>
                                <span className='sinlge-vacancy-expiry-info'>Due Date - {Vacancy.duedate} | {Vacancy.servicename}</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className='vacancy-card-footer'>

                        <Link to={`/ServiceProvider/ViewAVacancy/${Vacancy.vacancyid}`} className="btn btn-default job-card-footer-btn" id="job-card-footer-btn-view">
                            <span className='btn btn-default vacancy-card-footer-btn' id='vacancy-card-footer-btn-view'>
                                <i className="bi bi-file-earmark-plus h5"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style={{ position: "relative", bottom: "1.5px" }}>Apply for Job</span>
                            </span>
                        </Link>

                    </div>
                </div>
            ))}


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

export default VacanciesBodyPage;