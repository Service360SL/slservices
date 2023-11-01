import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LocationByCitiesJson from '../../../loginForm/cities-by-district.json';

function MyProjectsBody(){
    const [MyProjectsJobsData, setMyProjectsJobsData] = useState(null);
    const [MyProjectsVacanciesData, setMyProjectsVacanciesData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategoryTerm, setFilterCategoryTerm] = useState('');
    const [filterLocationTerm, setFilterLocationTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState(''); 
    const [myservicesData, setMyservicesData] = useState([]);

    const navigate = useNavigate();
    const handleBackClick = () => {
      navigate(-1);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialActiveTab = queryParams.get('tab') || 'defaultTab'; // 'defaultTab' is the fallback

    useEffect(() => {
        setActiveTab(initialActiveTab);
    }, [initialActiveTab]);

    useEffect(() => {
        setCurrentPage(1);
        setSearchTerm('');  // Reset search term when active tab changes
        setFilterCategoryTerm('');  // Reset category filter when active tab changes
    }, [activeTab]);
    
    // GETTING LOGGED IN SERVICEPROVIDER ID

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`).then((res) => {
            console.log(res.data);
            setMyservicesData(res.data);
        });
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8080/auth/viewMyJobs', {
            params: {
                serviceproviderid: userData.userid
            }
        })
        .then((res) => {
            console.log(res.data);
            setMyProjectsJobsData(res.data);
        });

        axios.get('http://localhost:8080/auth/viewMyVacancies',{
            params: {
                serviceproviderid: userData.userid
            }
        })
        .then((res) => {
            console.log(res.data);
            setMyProjectsVacanciesData(res.data);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchTerm]);

    if (!MyProjectsJobsData || !MyProjectsVacanciesData) return 'No jobs found!';

    const handleAcceptJob = (jobId, isQuotation) => {
        let apiUrl="";

        if(isQuotation==="true"){
            apiUrl = `http://localhost:8080/auth/updateJobStatusInviteToPending/${jobId}?serviceproviderid=${userData.userid}`;
        }
        else if(isQuotation==="false"){
            apiUrl = `http://localhost:8080/auth/updateJobStatusInviteToOngoing/${jobId}?serviceproviderid=${userData.userid}`;
        }

        axios.put(apiUrl)
          .then((res) => {
            console.log(res.data); // Log the API response
            fetchData(); // Update the state after the rejection
          })
          .catch((error) => {
            // Handle errors
          });
    };

    const handleRejectJob = (jobId) => {
        const apiUrl = `http://localhost:8080/auth/updateJobStatusInviteToRejected/${jobId}?serviceproviderid=${userData.userid}`;

        axios.put(apiUrl)
        .then((res) => {
            console.log(res.data); // Log the API response
            fetchData(); // Update the state after the rejection
        })
        .catch((error) => {
        // Handle errors
        });
    };

    const handleAcceptVacancy = (vacancyId) => {
        const apiUrl = `http://localhost:8080/auth/updateVacancyStatusInviteToOngoing/${vacancyId}?serviceproviderid=${userData.userid}`;
    
        axios.put(apiUrl)
        .then((res) => {
            console.log(res.data); // Log the API response
            fetchData(); // Update the state after the rejection
        })
        .catch((error) => {
            // Handle errors
        });
    };
    
    const handleRejectVacancy = (vacancyId) => {
        const apiUrl = `http://localhost:8080/auth/updateVacancyStatusInviteToRejected/${vacancyId}?serviceproviderid=${userData.userid}`;
    
        console.log(vacancyId);

        axios.put(apiUrl)
        .then((res) => {
            console.log(res.data); // Log the API response
            fetchData(); // Update the state after the rejection
        })
        .catch((error) => {
            // Handle errors
        });

    };

    const allCards = [...MyProjectsJobsData, ...MyProjectsVacanciesData];

    const filteredCards = allCards.filter((card) => {
        const serviceMatch = !filterCategoryTerm || card.job?.servicename === filterCategoryTerm || card.vacancy?.servicename === filterCategoryTerm; // Check servicename in job or vacancy

        const locationMatch = !filterLocationTerm || card.job?.joblocation.toLowerCase() === filterLocationTerm.toLowerCase() || card.vacancy?.vacancylocation.toLowerCase() === filterLocationTerm.toLowerCase();

        const searchTermMatch = (
            (card.job?.servicename && card.job.servicename.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.job?.joblocation && card.job.joblocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.job?.jobdescription && card.job.jobdescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.job?.jobtitle && card.job.jobtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.vacancy?.vacancylocation && card.vacancy.vacancylocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.vacancy?.vacancydescription && card.vacancy.vacancydescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.vacancy?.vacancytitle && card.vacancy.vacancytitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (card.customer?.firstname && card.customer.firstname.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    
        return serviceMatch && searchTermMatch && locationMatch;
    });
    
    const filteredAndSortedCards = filteredCards.filter((card) => {
        if (card.jobStatus) {
            return card.jobStatus === activeTab; // Check job status
        } else if (card.vacancyStatus) {
            return card.vacancyStatus === activeTab; // Check vacancy status
        }
        return false; // Exclude cards without valid status
    });
    
    const cardsPerPage = 3;
    
    // Calculate the total number of pages based on the filtered and sorted cards
    const totalNumPages = Math.ceil(filteredAndSortedCards.length / cardsPerPage);

    // Create an array of page numbers from 1 to totalNumPages
    const pageNumbers = Array.from({ length: totalNumPages }, (_, index) => index + 1);

    // Calculate the start and end indices of the displayed training sessions for the current page
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    // Create a subset of training sessions to be displayed on the current page
    const displayedCards = filteredAndSortedCards.slice(startIndex, endIndex);
    
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

    console.log(displayedCards);

    return(
        <div>
            
            {/* Page Title*/}
            <span className="back-button-service-provider" onClick={handleBackClick} style={{ marginRight:'50px', maxWidth: '120px', fontWeight:600, float:'right' }}>
              <i className="bi bi-arrow-left-circle-fill fs-3"></i>
              <p className="m-0 p-0 fs-5">&nbsp; Back</p>
            </span>
            <span className="ms-4 align-self-start" style={{fontSize:"28px",fontWeight:"600"}}>My Jobs</span>

            {/* Nav Bar */}
            <div className="mt-4 ms-lg-4 me-md-4">
                <Navbar className="MyProjects-top-nav me-lg-4" expand="lg md sm">
                    <Nav className="ms-3">
                        <Nav.Link 
                            active={activeTab === 'invite'} 
                            onClick={() => {
                                setActiveTab('invite');
                                const newUrl = new URL(window.location);
                                newUrl.searchParams.set('tab', 'invite');
                                window.history.pushState(null, '', newUrl.toString());
                            }}
                        >
                            Invites
                        </Nav.Link>
                        <Nav.Link 
                            active={activeTab === 'pending'} 
                            onClick={() => {
                                setActiveTab('pending');
                                const newUrl = new URL(window.location);
                                newUrl.searchParams.set('tab', 'pending');
                                window.history.pushState(null, '', newUrl.toString());
                            }} 
                        >
                            Pending
                        </Nav.Link>
                        <Nav.Link 
                            active={activeTab === 'ongoing'} 
                            onClick={() => {
                                setActiveTab('ongoing');
                                const newUrl = new URL(window.location);
                                newUrl.searchParams.set('tab', 'ongoing');
                                window.history.pushState(null, '', newUrl.toString());
                            }} 
                        >
                            Ongoing
                        </Nav.Link>
                        <Nav.Link 
                            active={activeTab === 'rejected'} 
                            onClick={() => {
                                setActiveTab('rejected');
                                const newUrl = new URL(window.location);
                                newUrl.searchParams.set('tab', 'rejected');
                                window.history.pushState(null, '', newUrl.toString());
                            }} 
                        >
                            Rejected
                        </Nav.Link>
                    </Nav>
                </Navbar>
                <Navbar className='MyProjects-bottom-nav mt-2 mb-3 me-lg-4 d-flex flex-row'>
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
                </Navbar>
            </div>

            <div className="row my-projects-jobs-row-wrap">
                {/* only display pending jobs */}
                {activeTab === 'pending' && displayedCards.filter((job) => job.jobStatus === 'pending').map((job) => (
                    <div key={job.job.jobid} className="single-my-job-card mx-auto mt-3">
                        <div className="ms-sm-3">
                            <div className='d-flex flex-column'>
                                <div>
                                    <span className="job-card-title">{job.job.jobtitle}</span>
                                </div>
                                <div className='d-flex'>
                                    <span className="my-job-card-customer-name">By {job.job.customer.firstname}</span>
                                </div>
                                <div>
                                    <span className="my-job-location-info">
                                        <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp; {job.job.joblocation}
                                    </span>
                                    <span className="my-job-location-info ms-4">
                                        <i class="fa-solid fa-hourglass-start"></i>&nbsp;&nbsp; short-term
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin:"0.5rem"}} />
                        <div className="my-job-card-footer d-flex flex-row mb-sm-2 mx-auto mt-md-0 mt-1 mb-2">
                            {job.jobStatus === 'pending' && (
                            <Link to={`../PendingJob/${job.job.jobid}`} className="btn btn-default my-job-card-footer-btn-ongoing" id="my-job-card-footer-btn-view">
                              <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id="job-card-footer-btn-view" style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}}>
                                  <span class="my-jobs-page-btn-label">
                                  <i class="bi bi-eye"></i>
                                  </span>
                                  View
                              </button>
                            </Link>  
                            )}
                        </div>
                    </div>
                ))}

                {/* only display ongoing jobs */}
                {activeTab === 'ongoing' && displayedCards.filter((job) => job.jobStatus === 'ongoing').map((job) => (
                    <div key={job.job.jobid} className="single-my-job-card mx-auto mt-3">
                        <div className="ms-sm-3">
                            <div className='d-flex flex-column'>
                                <div>
                                    <span className="job-card-title">{job.job.jobtitle}</span>
                                </div>
                                <div className='d-flex'>
                                    <span className="my-job-card-customer-name">By {job.job.customer.firstname}</span>
                                </div>
                                <div>
                                    <span className="my-job-location-info">
                                        <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp; {job.job.joblocation}
                                    </span>
                                    <span className="my-job-location-info ms-4">
                                        <i class="fa-solid fa-hourglass-start"></i>&nbsp;&nbsp; short-term
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin:"0.5rem"}} />
                        <div className="my-job-card-footer d-flex flex-row mb-sm-2 mx-auto mt-md-0 mt-1 mb-2">
                            {job.jobStatus === 'ongoing' && (
                            <Link to={`../OngoingJob/${job.job.jobid}`} className="btn btn-default my-job-card-footer-btn-ongoing" id="my-job-card-footer-btn-view">
                                <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id="job-card-footer-btn-view" style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}}>
                                    <span class="my-jobs-page-btn-label">
                                    <i class="bi bi-eye"></i>
                                    </span>
                                    View
                                </button>
                            </Link>                     
                            )}
                        </div>
                    </div>
                ))}

                {/* only display rejected jobs */}
                {activeTab === 'rejected' && displayedCards.filter((job) => job.jobStatus === 'rejected').map((job) => (
                    <div key={job.job.jobid} className="single-my-job-card mx-auto mt-3">
                        <div className="ms-sm-3">
                            <div className='d-flex flex-column'>
                                <div>
                                    <span className="job-card-title">{job.job.jobtitle}</span>
                                </div>
                                <div className='d-flex'>
                                    <span className="my-job-card-customer-name">By {job.job.customer.firstname}</span>
                                </div>
                                <div>
                                    <span className="my-job-location-info">
                                        <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp; {job.job.joblocation}
                                    </span>
                                    <span className="my-job-location-info ms-4">
                                        <i class="fa-solid fa-hourglass-start"></i>&nbsp;&nbsp; short-term
                                    </span>
                                </div>
                            </div>
                        </div>
                        <hr style={{margin:"0.5rem"}} />
                        <div className="my-job-card-footer d-flex flex-row mb-sm-2 mx-auto mt-md-0 mt-1 mb-2">
                            {job.jobStatus === 'rejected' && (
                            <Link to={`../ViewAJob/${job.job.jobid}`} className="btn btn-default my-job-card-footer-btn-ongoing" id="my-job-card-footer-btn-view">
                                <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id="job-card-footer-btn-view" style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}}>
                                    <span class="my-jobs-page-btn-label">
                                    <i class="bi bi-eye"></i>
                                    </span>
                                    View
                                </button>
                            </Link>
                            )}
                        </div>
                    </div>
                ))}

                {/* only display ongoing vacancies */}
                {activeTab === 'ongoing' && displayedCards.filter((vacancy) => vacancy.vacancyStatus === 'ongoing').map((vacancy) => (
                    <div key={vacancy.vacancy.jobid} className="single-my-vacancy-card mx-auto mt-3">
                        <div className="ms-sm-3">
                                <div className='d-flex flex-column'>
                                    <div >
                                        <span className="job-card-title">{vacancy.vacancy.vacancytitle}</span>
                                    </div>
                                    <div className='d-flex'>
                                        <span className="job-card-date">By {vacancy.vacancy.customer.firstname}</span>
                                    </div>
                                    <div>
                                        <span className="my-job-location-info">
                                            <i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp; {vacancy.vacancy.vacancylocation}
                                        </span>
                                        <span className="my-job-location-info ms-4">
                                            <i class="fa-solid fa-hourglass-start"></i>&nbsp;&nbsp; long-term
                                        </span><br/>
                                        <span className="my-job-location-info ">
                                            <i class="fa-solid fa-clock"></i>&nbsp;&nbsp; {vacancy.vacancy.vacancytype}
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <hr style={{margin:"0.5rem"}} />
                        <div className="my-job-card-footer d-flex flex-row mb-sm-2 mx-auto mt-md-0 mt-1 mb-2">
                            {vacancy.vacancyStatus === 'ongoing' && (
                            <Link to={`../OngoingVacancy/${vacancy.vacancy.vacancyid}`} className="btn btn-default my-vacancy-card-footer-btn-ongoing" id="my-vacancy-card-footer-btn-view">
                                <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id="job-card-footer-btn-view" style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}}>
                                    <span class="my-jobs-page-btn-label">
                                    <i class="bi bi-eye"></i>
                                    </span>
                                    View
                                </button>
                            </Link>
                            )}
                        </div>
                    </div>
                ))}

                {/* only display rejected vacancies */}
                {activeTab === 'rejected' && displayedCards.filter((vacancy) => vacancy.vacancyStatus === 'rejected').map((vacancy) => (
                    <div key={vacancy.vacancy.vacancyid} className="single-my-vacancy-card mx-auto mt-3">
                        <div className="ms-sm-3">
                                <div className='d-flex flex-column'>
                                    <div >
                                        <span className="job-card-title">{vacancy.vacancy.vacancytitle}</span>
                                    </div>
                                    <div className='d-flex'>
                                        <span className="job-card-date">By {vacancy.vacancy.customer.firstname}</span>
                                    </div>
                                    <div>
                                        <span className="my-job-location-info">
                                            <i class="fa-solid fa-location-dot"></i>&nbsp;&nbsp; {vacancy.vacancy.vacancylocation}
                                        </span>
                                        <span className="my-job-location-info ms-4">
                                            <i class="fa-solid fa-hourglass-start"></i>&nbsp;&nbsp; long-term
                                        </span><br/>
                                        <span className="my-job-location-info">
                                            <i class="fa-solid fa-clock"></i>&nbsp;&nbsp; {vacancy.vacancy.vacancytype}
                                        </span>
                                    </div>
                                </div>
                        </div>
                        <hr style={{margin:"0.5rem"}} />
                        <div className="my-job-card-footer d-flex flex-row mb-sm-2 mx-auto mt-md-0 mt-1 mb-2">
                            {vacancy.vacancyStatus === 'rejected' && (
                            <Link to={`../ViewAVacancy/${vacancy.vacancy.vacancyid}`} className="btn btn-default my-vacancy-card-footer-btn-ongoing" id="my-vacancy-card-footer-btn-view">
                                <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id="job-card-footer-btn-view" style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}}>
                                    <span class="my-jobs-page-btn-label">
                                    <i class="bi bi-eye"></i>
                                    </span>
                                    View
                                </button>
                            </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* only display job invites for me */}
            {activeTab === 'invite' && displayedCards.filter((job) => job.jobStatus === 'invite').map((job) => (
                <div className="single-job-card mx-auto mt-3">
                    <div className="">
                        <div className='d-flex flex-column ms-sm-3'>
                            <div className="invite-header-container d-flex flex-row">
                                <div>
                                    <span className="my-job-card-title">{job.job.jobtitle}</span>
                                </div>
                                
                                <div className="isquatation d-flex flex-row ms-auto me-sm-3">
                                    {job.job.isquotation === 'true' && (
                                        <span className="single-job-status" id="job-status">Quotation</span>
                                    )}
                                    <span className="single-job-status ms-2" id="job-status">Short-Term</span>
                                </div>

                            </div>
                            <div className='d-flex'>
                                <span className="my-job-card-customer-name">By {job.job.customer.firstname}</span>
                            </div>
                            <div className='mt-1'>
                                <span className="single-job-description">
                                    {job.job.jobdescription}
                                </span>
                            </div>
                            <div className='mt-1'>
                                <span className="sinlge-my-job-sub-info"><i className="bi bi-calendar-event"></i>&nbsp;&nbsp; Due Date - {job.job.duedate}</span>
                            </div>
                            <div className='mt-1'>
                                <span className="my-job-location-info">
                                    <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp; {job.job.joblocation}
                                </span>
                            </div>
                        </div>
                    </div>
                    <hr style={{margin:"0.5rem"}} />
                    <div className="my-job-card-footer d-flex flex-row justify-content-between mx-md-4 mb-sm-2 mt-md-0 mt-4">
                        <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id={`my-job-card-footer-btn-view-${job.job.jobid}`} style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}} onClick={() => handleAcceptJob(job.job.jobid,job.job.isquotation)}>
                            <span class="view-jobs-page-btn-label">
                                <i class="bi bi-check-circle"></i>
                            </span>
                            Accept
                        </button>

                        <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn mt-md-0 mt-1" id={`my-job-card-footer-btn-view-${job.job.jobid}`} style={{color:"white",backgroundColor:"rgb(182, 14, 14)"}}  onClick={() => handleRejectJob(job.job.jobid)}>
                            <span class="view-jobs-page-btn-label">
                                    <i class="bi bi-x-circle"></i>
                            </span>
                            Reject
                        </button>
                    </div>
                </div>
            ))}

            {/* only display vacancy invites for me */}
            {activeTab === 'invite' && displayedCards.filter((vacancy) => vacancy.vacancyStatus === 'invite').map((vacancy) => (
            <div className="single-vacancy-card mx-auto mt-3">
                <div className="">
                    <div className="d-flex flex-column ms-sm-3">
                        <div className="invite-header-container d-flex flex-row">
                            <div>
                                <span className="my-job-card-title">{vacancy.vacancy.vacancytitle}</span>
                            </div>
                            <div className="isquatation ms-auto me-sm-3">
                                    <span className="single-job-status ms-2" id="job-status">Long-Term</span>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <span className="job-card-date">By {vacancy.vacancy.customer.firstname}</span>
                        </div>
                        <div className='mt-1'>
                            <span className="single-job-description">
                                {vacancy.vacancy.vacancydescription}
                            </span>
                        </div>
                        <div className='mt-1'>
                            <span className="sinlge-my-job-sub-info"><i className="bi bi-calendar-event"></i>&nbsp;&nbsp; Due Date - {vacancy.vacancy.duedate}</span>
                        </div>
                        <div className='mt-1'>
                            <span className="my-vacancy-location-info">
                                <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp; Location: {vacancy.vacancy.vacancylocation}
                            </span>
                            <span className="my-job-location-info ms-4">
                                <i class="fa-regular fa-clock"></i>&nbsp;&nbsp; {vacancy.vacancy.vacancytype}
                            </span>
                        </div>
                    </div>
                </div>
                <hr style={{margin:"0.5rem"}} />
                <div className="my-job-card-footer d-flex flex-row justify-content-between mx-md-4 mb-sm-2 mt-md-0 mt-4">
                    <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn" id={`my-job-card-footer-btn-view-${vacancy.vacancy.vacancyid}`} style={{color:"white",backgroundColor:"rgb(11, 133, 160)"}} onClick={() => handleAcceptVacancy(vacancy.vacancy.vacancyid)}>
                        <span class="view-jobs-page-btn-label">
                            <i class="bi bi-check-circle"></i>
                        </span>
                        Accept
                    </button>

                    <button type="button" class="btn view-jobs-page-btn-labeled my-job-card-footer-btn mt-md-0 mt-1" id={`my-job-card-footer-btn-view-${vacancy.vacancy.vacancyid}`} style={{color:"white",backgroundColor:"rgb(182, 14, 14)"}} onClick={() => handleRejectVacancy(vacancy.vacancy.vacancyid)}>
                        <span class="view-jobs-page-btn-label">
                                <i class="bi bi-x-circle"></i>
                        </span>
                        Reject
                    </button>
                </div>
            </div>
            ))}

            {/* Pagination */}
            <div className="pagination justify-content-center">
                {/* Create pagination buttons for each page */}
                {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`page-link ${currentPage === pageNumber ? 'active' : ''}`}
                    style={{ backgroundColor: '#292D32', color: '#fff', width: '35px', height: '35px', fontSize: '16px' }}
                    onClick={() => handlePageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
                ))}
            </div>
        </div>
    );
}

export default MyProjectsBody;