import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "../../style/Admin/AdminSidebar.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Image from "../../assets/images/header/bg_1.png";
import styles from "../../style/Admin/AdminSidebar.module.css";

function CustomerSideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.containerFluid4} ps-2 m-0 d-flex ${isOpen ? styles.largeScreen : styles.smallScreen
        }`}
    >
      <div className="customer-sidebar row h-100">
        <div
          className={`side-bar-sub-container col-auto col-md-2.5 min-vh-100 d-xs-inline justify-content-between`}
          style={{ backgroundImage: `url(${Image})` }}
        >
          <div className="sidebar-content">
            <ul className={`nav nav-pills flex-column`} id="parentM">
              <li
                className={`fs-4 mt-3 py-2 d-flex d-none d-lg-inline ${isOpen ? "align-self-end" : "mx-3"
                  }`}
                onClick={toggle}
                style={{
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <i
                  className="bi bi-list text-white"
                  style={{ marginLeft: "auto" }}
                ></i>
              </li>
              <li className="nav-item text-white fs-4 mt-4 py-2 py-xs-1">
                <Link
                  to="/customer"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i className="bi bi-grid"></i>
                  <span
                    className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link
                  to="/customer/Searchserviceprovider"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i
                    className="bi bi-tools"
                    id="nav-single-element"
                    style={{ fill: "none" }}
                  ></i>
                  <span
                    className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  >
                    Services
                  </span>
                </Link>
              </li>
              {/* <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link
                  to="#submenu-1"
                  className={`nav-link nav-link-sidebar text-white d-none ${isOpen ? "d-lg-block" : "d-none"
                    }`}
                  data-bs-toggle="collapse"
                  aria-current="page"
                >
                  <i
                    className={`bi bi-file-text d-none ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  ></i>
                  <span
                    className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  >
                    Vacancies
                  </span>
                  <i
                    className={`bi bi-chevron-down ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"
                      } custom-icon-size`}
                  ></i>
                </Link>

                <NavDropdown
                  title={
                    <>
                      {" "}
                      <i className="bi bi-file-text ps-0"></i>{" "}
                    </>
                  }
                  id="basic-nav-dropdown"
                  className={`dropdown-icon d-md-inline d-xs-inline custom-dropdown ${isOpen ? " d-lg-none" : "d-lg-inline"
                    }`}
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/customer/PostVacancyFormIndex"
                    className="no-hover"
                  >
                    Post Vacancies{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/customer/PostedVacancies"
                    className="no-hover"
                  >
                    {" "}
                    End Vacancies{" "}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/customer/ViewVacancy"
                    className="no-hover"
                  >
                    {" "}
                    Responses{" "}
                  </NavDropdown.Item>
                </NavDropdown>

                <ul
                  className="nav collapse ms-4.5 flex-column"
                  id="submenu-1"
                  data-bs-parent="#parentM"
                >
                  <li
                    className={`nav-item fs-5 ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  >
                    <Link
                      to="/customer/PostVacancyFormIndex"
                      className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"
                    >
                      {" "}
                      Post Vacancies{" "}
                    </Link>
                    <Link
                      to="/customer/PostedVacancies"
                      className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"
                    >
                      {" "}
                      Posted Vacancies{" "}
                    </Link>
                    <Link
                      to="/customer/ViewVacancy"
                      className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"
                    >
                      {" "}
                      Responses{" "}
                    </Link>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link
                  to="#submenu-2"
                  className={`nav-link nav-link-sidebar text-white d-none ${isOpen ? "d-lg-block" : "d-none"}`}
                  data-bs-toggle="collapse"
                  aria-current="page"
                >
                  <i className={`bi bi-briefcase d-none ${isOpen ? "d-lg-inline" : "d-none"}`}></i>
                  <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Jobs</span>
                  <i className={`bi bi-chevron-down ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"} custom-icon-size`}></i>
                </Link>

                <NavDropdown
                  title={<> <i className="bi bi-briefcase ps-0"></i> </>}
                  id="jobs-nav-dropdown"
                  className={`dropdown-icon d-md-inline d-xs-inline custom-dropdown ${isOpen ? " d-lg-none" : "d-lg-inline"}`}
                >
                  <NavDropdown.Item as={Link} to="/customer/PostJob" className="no-hover">Post Jobs</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/customer/PostedJobs" className="no-hover">Posted Jobs</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/customer/ViewVacancy" className="no-hover">Responses</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/customer/RequestedJobs" className="no-hover">Requested Jobs</NavDropdown.Item>

                </NavDropdown>

                {/* Add Jobs submenu */}
                <ul
                  className="nav collapse ms-4.5 flex-column"
                  id="submenu-2"
                  data-bs-parent="#parentM"
                >
                  <li className={`nav-item fs-5 ${isOpen ? "d-lg-inline" : "d-none"}`}>
                    <Link to="/customer/PostJobForm" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Post Jobs </Link>
                    <Link to="/customer/PostedJobs" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Posted Jobs </Link>
                    <Link to="/customer/ViewVacancy" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Responses </Link>
                    <Link to="/customer/RequestedJobs" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4"> Requested Jobs </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link
                  to="#submenu-3"
                  className={`nav-link nav-link-sidebar text-white d-none ${isOpen ? "d-lg-block" : "d-none"}`}
                  data-bs-toggle="collapse"
                  aria-current="page"
                >
                  <i className={`bi bi-receipt d-none ${isOpen ? "d-lg-inline" : "d-none"}`}></i>
                  <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>Quotations</span>
                  <i className={`bi bi-chevron-down ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"} custom-icon-size`}></i>
                </Link>

                <NavDropdown
                  title={<> <i className="bi bi-receipt ps-0"></i> </>}
                  id="quotations-nav-dropdown"
                  className={`dropdown-icon d-md-inline d-xs-inline custom-dropdown ${isOpen ? " d-lg-none" : "d-lg-inline"}`}
                >
                  <NavDropdown.Item as={Link} to="/customer/RequestedQuotation" className="no-hover">Requested</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/customer/ReceivedQuotation" className="no-hover">Received</NavDropdown.Item>
                </NavDropdown>

                <ul
                  className="nav collapse ms-4.5 flex-column"
                  id="submenu-3"
                  data-bs-parent="#parentM"
                >
                  <li className={`nav-item fs-5 ${isOpen ? "d-lg-inline" : "d-none"}`}>
                    <Link to="/customer/RequestedQuotation" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4">Requested</Link>
                    <Link to="/customer/ReceivedQuotation" className="nav-link nav-link-sidebar text-white sub-item-nav ms-4">Received</Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link to="/customer/CustomerComplaintPage" className="nav-link nav-link-sidebar text-white" >
                  <i className="bi bi-file-earmark-text"></i>
                  <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}> Complaints</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link to="/customer/History" className="nav-link nav-link-sidebar text-white" >
                  <i className="fas fa-history"></i>
                  <span className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"}`}>View History</span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                <Link
                  to="/customer/AdsPage"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i className="bi bi-window-stack"></i>
                  <span
                    className={`ms-3 d-none ${isOpen ? "d-lg-inline" : "d-none"
                      }`}
                  >
                    Ads
                  </span>
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default CustomerSideBar;