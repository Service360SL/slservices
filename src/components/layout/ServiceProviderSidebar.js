import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "../../style/ServiceProvider/ServiceProviderSidebar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Image from "../../assets/images/header/bg_1.png";
import styles from "../../style/ServiceProvider/ServiceProviderSideBar.module.css";

function ServiceProviderSideBar() {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={`${styles.containerFluid4} ps-2 m-0 ${isOpen ? styles.largeScreen : styles.smallScreen}`}>
            <div className="row h-100">
                <div className="side-bar-sub-container col-auto col-md-2.5 min-vh-100 d-xs-inline d-flex justify-content-between flex-column" style={{ backgroundImage: `url(${Image})` }}>
                    <div className="sidebar-content">
                        <ul className="nav nav-pills flex-column" id="parentM">

                            <li className={`fs-4 mt-3 py-2 d-flex d-none d-lg-inline ${isOpen ? "align-self-end" : "mx-3"}`} onClick={toggle}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}>
                                <i className="bi bi-list text-white" style={{ marginLeft: 'auto' }}></i>
                            </li>



                            <li className="nav-item text-white fs-4 mt-4 py-2 py-xs-1">
                                <Link to="/ServiceProvider" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-grid"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Dashboard</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/ServiceProvider/MyProjectStates" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-briefcase" id="nav-single-element" style={{ fill: "none" }}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>My Projects</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/ServiceProvider/AvailabilityCalendar" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-calendar2-check" id="nav-single-element" style={{ fill: "none" }}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Availability Calendar</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="#submenu-1"
                                    className={`nav-link nav-link-sidebar text-white d-none ${isOpen ? "d-lg-block" : "d-none"}`}
                                    data-bs-toggle="collapse"
                                    aria-current="page"
                                >
                                    <i className={`bi bi-window-stack d-none ${isOpen ? "d-lg-inline" : "d-none"}`}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Training Session</span>
                                    <i className={`bi bi-chevron-down ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"} custom-icon-size`}></i>
                                </Link>

                                <NavDropdown
                                    title={<> <i className="bi bi-window-stack" style={{ color: "white" }}></i> </>}
                                    id="basic-nav-dropdown"
                                    className={`dropdown-icon d-md-inline d-xs-inline custom-dropdown ${isOpen ? " d-lg-none" : "d-lg-inline"}`}
                                >
                                    <NavDropdown.Item as={Link} to="/ServiceProvider/ViewTrainingSessions" className="no-hover"> View Session </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/ServiceProvider/CreateTrainingSession" className="no-hover"> Create Sessions </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/ServiceProvider/MyTrainingSessions" className="no-hover">  My Sessions </NavDropdown.Item>
                                </NavDropdown>

                                <ul
                                    className="nav collapse ms-4.5 flex-column"
                                    id="submenu-1"
                                    data-bs-parent="#parentM"
                                >
                                    <li className={`nav-item fs-5 ${isOpen ? "d-lg-inline" : "d-none"}`}>
                                        <Link to="/ServiceProvider/ViewTrainingSessions" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4" > View Sessions  </Link>
                                        <Link to="/ServiceProvider/CreateTrainingSession" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4" > Create Session  </Link>
                                        <Link to="/ServiceProvider/MyTrainingSessions" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> My Sessions </Link>
                                    </li>
                                </ul>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/ServiceProvider/MyServices" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-tools" id="nav-single-element" style={{ fill: "none" }}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>My Services</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/ServiceProvider/ViewHistory" className="nav-link nav-link-sidebar text-white">
                                    <i class="fas fa-history" id="nav-single-element" ></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>View History</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/ServiceProvider/CreateBlog" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-card-heading" id="nav-single-element" style={{ fill: "none" }}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Create Blog</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                                <Link to="/ServiceProvider/AdsPage" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-window-stack"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Ads</span>
                                </Link>
                            </li>



                            <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                                <Link to="/ServiceProvider/Forum" className="nav-link nav-link-sidebar text-white">
                                    <i className="fa-brands fa-wpforms"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Forum</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceProviderSideBar;