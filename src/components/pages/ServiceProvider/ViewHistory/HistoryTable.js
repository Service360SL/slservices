import React, { useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HistoryTable() {

  const [viewHistoryJobsData, setViewHistoryJobsData] = useState(null);
  const [viewHistoryVacanciesData, setViewHistoryVacanciesData] = useState(null);

  // Number of cards (training sessions) to display per page
  const cardsPerPage = 10;

  // State to keep track of the current page number
  const [currentPage, setCurrentPage] = useState(1);

  // State to store the selected start and end dates for filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Function to handle page change when the user clicks on pagination buttons
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle start date changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setCurrentPage(1); // Reset current page to 1 when start date changes
  };

  // Function to handle end date changes
  const handleEndDateChange = (date) => {
    if (date) {
      date.setHours(23, 59, 59);  // Set the time to 23:59:59 to include the entire selected end date
    }

    setEndDate(date);
    setCurrentPage(1); // Reset current page to 1 when end date changes
  };

  // GETTING LOGGED IN SERVICEPROVIDER ID

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  useEffect(() => {
      axios.get('http://localhost:8080/auth/viewHistoryJobs',{
        params: {
          serviceproviderid: userData.userid
        }
      }).then((res) => {
        console.log(res.data);
        setViewHistoryJobsData(res.data);
      });

      axios.get('http://localhost:8080/auth/viewHistoryVacancies',{
        params: {
          serviceproviderid: userData.userid
        }
      }).then((res) => {
        console.log(res.data);
        setViewHistoryVacanciesData(res.data);
      });
  }, []);

  if (!viewHistoryJobsData || !viewHistoryVacanciesData) return 'Loading...';

  const allCards = [...viewHistoryJobsData, ...viewHistoryVacanciesData];

  if (!allCards) return 'No History found!';

  // Filter training sessions based on the selected date range
  const filteredProjects = allCards.filter((project) => {
    if (startDate && endDate) {
      const ProjectDate = new Date(project.posteddate);
      return ProjectDate >= startDate && ProjectDate <= endDate;
    } else if (startDate) {
      const ProjectDate = new Date(project.posteddate);
      return ProjectDate >= startDate;
    }
    else if (endDate) {
      const ProjectDate = new Date(project.posteddate);
      return ProjectDate <= endDate;
    }
    return true; // If start date or end date is not selected, return all sessions
  });

  // Calculate the start and end indices of the displayed training sessions for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  // Create a subset of training sessions to be displayed on the current page
  const displayedProjects = filteredProjects.slice(startIndex, endIndex);

  const format12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const parsedHours = parseInt(hours, 10);
    const period = parsedHours >= 12 ? "PM" : "AM";
    const formattedHours = parsedHours > 12 ? parsedHours - 12 : parsedHours;
    return `${formattedHours}:${minutes} ${period}`;
  };

  console.log(displayedProjects);

  return (
    <div>

      {/* Page Title*/}
      <span className="ms-3 align-self-start" style={{ fontSize: "28px", fontWeight: "600" }}>View History</span>


      {/* Body Nav */}
      <Navbar className="mt-4 ms-2 me-2">
        <div className='history-nav-container d-flex flex-row col-12'>
          <div className='history-nav-datepicker-container-1 d-flex flex-row ms-sm-auto'>
            {/* Date Picker */}
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              className="form-control date-picker-input history-nav-input"
              placeholderText="Date From"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span className="input-group-text history-nav-input">
              <i class="bi bi-calendar4-event"></i>
            </span>
          </div>
          <div className='history-nav-datepicker-container-2 d-flex flex-row'>
            {/* Date Picker */}
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              className="form-control date-picker-input history-nav-input"
              placeholderText="Date to"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
            <span className="input-group-text history-nav-input">
              <i class="bi bi-calendar2-minus"></i>
            </span>
          </div>
        </div>
      </Navbar>


      {/* Table*/}
      <div className="mt-3 d-flex flex-column w-100" style={{ width: '100%' }}>
        <Container className="table-responsive">
          <Table striped bordered hover size="sm" className="training-session-table">
            <thead className="text-center">
              <tr>
                <th>Job Type</th>
                <th>Service Name</th>
                <th>Location</th>
                <th>Customer Name</th>
                <th>jobStatus</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the displayed training sessions and render each row */}
              {displayedProjects.map((project) => (
                <tr key={project.id}>
                  <td className='text-center'>{project.jobid ? "short-term" : "long-term"}</td>
                  <td className="text-center">{project.servicename}</td>
                  <td className="text-center">{project.joblocation ? project.joblocation : project.vacancylocation}</td>
                  <td className="text-center">{project.customer.firstname}</td>
                  <td className="text-center">completed</td>

                  {/* 
                  <td className="text-center">{project.jobdate}</td>
                  <td className="text-center">{format12Hour(project.jobstarttime)}</td>
                  <td className="text-center">{format12Hour(project.jobendtime)}</td> 
                  */}

                  
                  <td className="text-center">
                    <Link   to={
                      project.jobid
                        ? `../CompletedJob/${project.jobid}`
                        : `../CompletedVacancy/${project.vacancyid}`
                    }>
                      <i className="bi bi-eye-fill fs-4" style={{color:"black"}}></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>


      {/* Pagination */}
      <div className="pagination justify-content-center">
        {/* Create pagination buttons for each page */}
        {Array.from({ length: Math.ceil(filteredProjects.length / cardsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            className={`page-link ${currentPage === index + 1 ? 'active' : ''
              }`}
            style={{ backgroundColor: '#292D32', color: '#fff' }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>

  );
}

export default HistoryTable;