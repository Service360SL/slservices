import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import '../../style/Admin/AdminSidebar.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Image from '../../assets/images/header/bg_1.png'
import styles from "../../style/Admin/AdminSidebar.module.css";

function AdminSideBar() {

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <div className={`${styles.containerFluid4} ps-2 m-0 d-flex ${isOpen ? styles.largeScreen : styles.smallScreen}`}>
            <div className="row h-100">
                <div className={`side-bar-sub-container col-auto col-md-2.5 min-vh-100 d-xs-inline justify-content-between`} style={{ backgroundImage: `url(${Image})` }}>
                    <div className="sidebar-content">
                        <ul className={`nav nav-pills flex-column`} id="parentM">

                            <li className={`fs-4 mt-3 py-2 d-flex d-none d-lg-inline ${isOpen ? "align-self-end" : "mx-3"}`} onClick={toggle}
                                style={{
                                    position: 'relative',
                                    cursor: 'pointer',
                                }}>
                                <i className="bi bi-list text-white" style={{ marginLeft: 'auto' }}></i>
                            </li>

                            <li className="nav-item text-white fs-4 mt-4 py-2 py-xs-1">
                                <Link to="/admin" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-grid"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Dashboard</span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/admin/services" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-tools" id="nav-single-element" style={{ fill: "none" }}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Services</span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="#submenu-1"
                                    className={`nav-link nav-link-sidebar text-white d-none ${isOpen ? "d-lg-block" : "d-none"}`}
                                    data-bs-toggle="collapse"
                                    aria-current="page"
                                >
                                    <i className={`bi bi-people d-none ${isOpen ? "d-lg-inline" : "d-none"}`}></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Users</span>
                                    <i className={`bi bi-chevron-down ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"} custom-icon-size`}></i>
                                </Link>

                                <NavDropdown
                                    title={<> <i className="bi bi-people ps-3"></i> </>}
                                    id="basic-nav-dropdown"
                                    className={`dropdown-icon d-md-inline d-xs-inline custom-dropdown ${isOpen ? " d-lg-none" : "d-lg-inline"}`}
                                >
                                    <NavDropdown.Item as={Link} to="/admin/customers" className="no-hover"> Customers </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/admin/serviceProviders" className="no-hover"> Service Providers </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/admin/advertisers" className="no-hover"> Advertisers </NavDropdown.Item>
                                </NavDropdown>

                                <ul
                                    className="nav collapse ms-4.5 flex-column"
                                    id="submenu-1"
                                    data-bs-parent="#parentM"
                                >
                                    <li className={`nav-item fs-5 ${isOpen ? "d-lg-inline" : "d-none"}`}>
                                        <Link to="/admin/customers" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4" > Customers </Link>
                                        <Link to="/admin/serviceProviders" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Service Providers </Link>
                                        <Link to="/admin/advertisers" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Advertisers </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                                <Link to="/admin/advertisements" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-window-stack"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Advertisements </span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                                <Link to="/admin/sessions" className="nav-link nav-link-sidebar text-white">
                                    <i className="bi bi-display"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Training Sessions </span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/admin/reviews" className="nav-link nav-link-sidebar text-white" >
                                    <i className="fas fa-star-half-alt"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Reviews </span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/admin/history" className="nav-link nav-link-sidebar text-white" >
                                    <i className="fas fa-history" id="nav-single-element" ></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> History </span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/admin/invoice" className="nav-link nav-link-sidebar text-white" >
                                    <i className="bi bi-receipt"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Payments</span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                                <Link to="/admin/complaints" className="nav-link nav-link-sidebar text-white" >
                                    <i className="bi bi-person-exclamation"></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Complaints</span>
                                </Link>
                            </li>

                            <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                                <Link to="/admin/report" className="nav-link nav-link-sidebar text-white" >
                                    <i className="bi bi-clipboard-data" ></i>
                                    <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Reports </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSideBar;