import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "../../style/Admin/AdminSidebar.css";
import { Link } from "react-router-dom";
import Image from "../../assets/images/header/bg_1.png";
import styles from "../../style/Admin/AdminSidebar.module.css";

function AdvertiserSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.containerFluid4} ps-2 m-0 d-flex ${
        isOpen ? styles.largeScreen : styles.smallScreen
      }`}
    >
      <div className="row h-100">
        <div
          className={`side-bar-sub-container col-auto col-md-2.5 min-vh-100 d-xs-inline justify-content-between`}
          style={{ backgroundImage: `url(${Image})` }}
        >
          <div className="sidebar-content">
            <ul className={`nav nav-pills flex-column`} id="parentM">
              <li
                className={`fs-4 mt-3 py-2 d-flex d-none d-lg-inline ${
                  isOpen ? "align-self-end" : "mx-3"
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
                  to="/advertiser"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i className="bi bi-grid"></i>
                  <span
                    className={`ms-3 d-none ${
                      isOpen ? "d-lg-inline" : "d-none"
                    }`}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-1 py-2 py-xs-1">
                <Link
                  to="/Advertiser/Ads"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i className="bi bi-window-stack"></i>
                  <span
                    className={`ms-3 d-none ${
                      isOpen ? "d-lg-inline" : "d-none"
                    }`}
                  >
                    {" "}
                    Ads{" "}
                  </span>
                </Link>
              </li>

              <li className="nav-item text-white fs-4 my-0 py-2 py-xs-1">
                <Link
                  to="/advertiser/Subscription"
                  className="nav-link nav-link-sidebar text-white"
                >
                  <i
                    className="bi bi-tools"
                    id="nav-single-element"
                    style={{ fill: "none" }}
                  ></i>
                  <span
                    className={`ms-3 d-none ${
                      isOpen ? "d-lg-inline" : "d-none"
                    }`}
                  >
                    Subcription
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

export default AdvertiserSidebar;