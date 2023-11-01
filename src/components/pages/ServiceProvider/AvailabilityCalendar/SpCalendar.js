import React from "react";
import UserImg from '../../../../assets/images/header/user.jpg'
import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { FaRegCalendarTimes } from "react-icons/fa";


import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths
} from "date-fns";

function SpCalendar() {
    const [viewServiceProviderCalendarData, setViewServiceProviderCalendarData] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (date) => {
        setSelectedModalDate(date); // Set the selected date for the modal
        resetScheduleForm();
        setShow(true);
    };

    const resetScheduleForm = () => {
        setScheduleFormData({
            eventdate: format(selectedDate, "yyyy-MM-dd"),
            eventstarttime: "",
            eventendtime: "",
            eventdescription: "",
        });
    };

    const [selectedModalDate, setSelectedModalDate] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [activeDate, setActiveDate] = useState(new Date());

    const [selectedSchedules, setSelectedSchedules] = useState([]);    // New state for selected date's schedules

    const [scheduleFormData, setScheduleFormData] = useState({
        eventdate: "",
        eventstarttime: "",
        eventendtime: "",
        eventdescription: "",
    });

    useEffect(() => {
        setScheduleFormData((prevData) => ({
            ...prevData,
            eventdate: format(selectedDate, "yyyy-MM-dd"),
        }));
    }, [selectedDate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setScheduleFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getHeader = () => {
        return (

            <div className="SpCalendar-header d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <i
                        className="bi bi-chevron-left me-2"
                        onClick={() => setActiveDate(subMonths(activeDate, 1))}
                    />
                    <i
                        className="bi bi-chevron-right"
                        onClick={() => setActiveDate(addMonths(activeDate, 1))}
                    />
                </div>
                <span className="currentMonth">{format(activeDate, "MMMM yyyy")}</span>
                <div
                    className="SpCalendar-todayButton"
                    onClick={() => {
                        setSelectedDate(new Date());
                        setActiveDate(new Date());
                    }}
                >
                    Today
                </div>
            </div>


        );
    };

    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            weekDays.push(
                <div className="day weekNames">
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            );
        }
        return <div className="weekContainer">{weekDays}</div>;
    };

    const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
        let currentDate = date;
        const week = [];

        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            const formattedDate = format(currentDate, "yyyy-MM-dd");

            const schedulesForDate = getSchedulesForDate(cloneDate);
            const numSchedules = schedulesForDate.length;

            const hasSchedules = numSchedules > 0;
            const hasFewSchedules = numSchedules === 1;
            const hasManySchedules = numSchedules >= 2;

            week.push(
                <div
                    className={`day ${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"
                        } ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
              ${isSameDay(currentDate, new Date()) ? "today" : ""}
              ${isSameDay(currentDate, new Date()) ? "" : hasSchedules ? "hasSchedules" : ""}
              ${isSameDay(currentDate, new Date()) ? "" : hasFewSchedules ? "hasFewSchedules" : ""}
              ${isSameDay(currentDate, new Date()) ? "" : hasManySchedules ? "hasManySchedules" : ""}`}
                    onClick={() => {
                        setSelectedDate(cloneDate);
                        setSelectedSchedules(getSchedulesForDate(cloneDate)); // Update selected schedules
                        // setSelectedModalDate(cloneDate); // Pass the selected date to handleShow
                    }}
                >
                    {format(currentDate, "d")}
                </div>
            );
            currentDate = addDays(currentDate, 1);
        }
        return <>{week}</>;
    };

    // GETTING LOGGED IN SERVICEPROVIDER ID

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    const handleSchedule = () => {
        const newScheduleData = {
            ...scheduleFormData,
            serviceproviderid: userData.userid,
        };

        axios.post(`http://localhost:8080/auth/createServiceProviderCalendar?serviceproviderid=${userData.userid}`, newScheduleData).then((response) => {
            console.log('Schedule created successfully:', response.data);
            handleClose();
            const updatedSchedules = [...selectedSchedules, response.data]; // Assuming the response data contains the newly created event
            setSelectedSchedules(updatedSchedules);
            
            refreshCalendarData();
        })
            .catch((error) => {
                console.error('Error creating schedule:', error);
            });
    };

    const refreshCalendarData = () => {
        axios.get('http://localhost:8080/auth/viewServiceProviderCalendar')
            .then((res) => {
                console.log(res.data);
                setViewServiceProviderCalendarData(res.data);
            })
            .catch((error) => {
                console.error('Error fetching calendar data:', error);
            });
    };

    useEffect(() => {
        refreshCalendarData();
    }, []);

    const handleDelete = (eventId) => {
        axios.delete(`http://localhost:8080/auth/deleteServiceProviderCalendar/${eventId}`)
            .then(() => {
                console.log('Event deleted successfully');

                setSelectedSchedules((prevSchedules) =>
                    prevSchedules.filter((work) => work.eventid !== eventId)
                );

                refreshCalendarData();
            })
            .catch((error) => {
                console.error('Error deleting event:', error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8080/auth/viewServiceProviderCalendar',{
            params: {
                serviceproviderid: userData.userid
            }
        }).then((res) => {
            console.log(res.data);
            setViewServiceProviderCalendarData(res.data);
        });
    }, []);

    if (!viewServiceProviderCalendarData) return 'No Calandar data found!';

    const getSchedulesForDate = (date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        return viewServiceProviderCalendarData.filter((work) => work.eventdate === formattedDate);
    };

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;

        const allWeeks = [];

        while (currentDate <= endDate) {
            allWeeks.push(
                generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
            );
            currentDate = addDays(currentDate, 7);
        }

        return <div className="weekContainer">{allWeeks}</div>;
    };

    const format12Hour = (time) => {
        const [hours, minutes] = time.split(":");
        const parsedHours = parseInt(hours, 10);
        const period = parsedHours >= 12 ? "PM" : "AM";
        const formattedHours = parsedHours > 12 ? parsedHours - 12 : parsedHours;
        return `${formattedHours}:${minutes} ${period}`;
    };


    return (
        <div className="ms-lg-4">
            {/* Page Title*/}
            <span className="align-self-start" style={{ fontSize: "28px", fontWeight: "600" }}>Availability Calendar</span>
            <div className="spCalendar-container mt-4 d-flex flex-row">
                <div className="Sp-div-calendar w-xl-50 w-100">
                    <div className="p-3 border rounded">

                        {getHeader()}
                        {getWeekDaysNames()}
                        {getDates()}

                    </div>
                    <Button className="mt-3 d-flex ms-auto btn-ServiceProvider-1" onClick={() => handleShow(activeDate)}>Add Schedule</Button>
                </div>

                <div className="div-schedules w-xl-50 w-100">
                    <div className=" col-lg-10 col-12 ms-lg-5 mt-xl-0 mt-4">
                        <span style={{ fontSize: "24px" }}>Schedule for {format(selectedDate, "yyyy-MM-dd")}</span>    {/* date is not rendering */}
                    </div>


                    {selectedSchedules.length === 0 ? (
                        <div className="col-lg-10 ms-lg-5 px-3 mt-1">
                            <Row>
                                <div
                                    className="mt-3 p-3 d-flex justify-content-center align-items-center"
                                    style={{ border: "1px solid black", borderRadius: "15px" }}
                                >
                                    <FaRegCalendarTimes /> &nbsp;&nbsp;
                                    No schedules for this date
                                </div>
                            </Row>
                        </div>
                    ) : (
                        selectedSchedules.map((work) => (
                            <Col key={work.id} className="col-lg-12 col-12 ms-lg-5">
                                <div className="col-lg-10 px-3 mt-1">
                                    <Row>
                                        <div className="mt-3 p-3" style={{ border: "1px solid black", borderRadius: "15px" }}>
                                            <div className=" d-flex flex-row">
                                                <div className="d-flex flex-column spCalendar-username-container ms-4">
                                                    <span className="spCalendar-comment-body-text" style={{ fontWeight: "500" }}>{format12Hour(work.eventstarttime)} - {format12Hour(work.eventendtime)}</span>
                                                    <span className="spCalendar-comment-body-text" style={{ fontWeight: "500" }}>{work.eventdescription}</span>
                                                </div>
                                                <div className="ms-auto d-flex flex-column justify-content-center align-items-center">
                                                    <i className="bi bi-x-circle-fill" style={{ fontSize: "26px", cursor: "pointer" }} onClick={() => handleDelete(work.eventid)}></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>
                            </Col>
                        )
                        ))}
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton style={{ background: '#282b3d', color: '#fff' }}>
                    <Modal.Title>Schedule Visitation</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Date</Form.Label>
                            <Form.Control className='mb-2' type="date" name="eventdate" value={format(selectedDate, "yyyy-MM-dd")} onChange={(e) => setSelectedDate(new Date(e.target.value))} autoFocus />

                            <Form.Label>Start Time</Form.Label>
                            <Form.Control className='mb-2' type="time" step={1} name="eventstarttime" value={scheduleFormData.eventstarttime} onChange={handleInputChange} autoFocus />

                            <Form.Label>End Time</Form.Label>
                            <Form.Control className='mb-2' type="time" step={1} name="eventendtime" value={scheduleFormData.eventendtime} onChange={handleInputChange} autoFocus />

                            <Form.Label>Description</Form.Label>
                            <Form.Control className='mb-2' type="text" name="eventdescription" value={scheduleFormData.eventdescription} onChange={handleInputChange} autoFocus />
                        </Form.Group>

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button className='btn-ServiceProvider-2' onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='btn-ServiceProvider-1' onClick={handleSchedule}>
                        Schedule
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default SpCalendar;