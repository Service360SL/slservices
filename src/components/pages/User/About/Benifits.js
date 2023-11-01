import React from "react";
import { Image } from "react-bootstrap";

import backgroundImage from "../../../../assets/images/header/Background.png";


import BenifitsImg from "./../../../../assets/images/About/Benifits1.jpg";

const Benifits = () => {
  return (
    <div className="d-flex p-3 AboutSectionCont">
      <div
        className="d-flex  flex-column justify-content-center AboutContentContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mx-4 mt-3 px-4 ">
          <div>
            <h1 className="text-center">
              Discover the Benefits of Our Services and Expertise
            </h1>
            <p className="AboutPoinsP">
              Our services offer a range of advantages, from easy service
              discovery and transparent ratings to hassle-free hiring and
              convenient location searches.
            </p>
          </div>
          <div className="d-flex flex-column" style={{ marginTop: "4em" }}>
            {" "}
            <div className="mx-3 mt-3 d-flex align-items-center gap-3 AboutSubHeading">
              <i className="fa-solid fa-wrench " />
              <p>
                <b>Benefits for Customers</b>
              </p>
            </div>
            <div className="mx-4 px-4 py-2">
              <div className="d-flex gap-3 align-items-center">
                <i className="fa-solid fa-bolt fa-lg"></i>

                <p className="AboutBenP">Easy Service Discovery</p>
              </div>
            </div>
            <div className="mx-4 px-4 py-2">
              <div className="d-flex gap-3 align-items-center">
                <i className="fa-solid fa-bolt fa-lg"></i>

                <p className="AboutBenP"> Transparent Ratings and Reviews</p>
              </div>
            </div>
            <div className="mx-4 px-4 py-2">
              <div className="d-flex gap-3 align-items-center">
                <i className="fa-solid fa-bolt fa-lg"></i>

                <p className="AboutBenP">Convenient Location Search</p>
              </div>
            </div>
            <div className="mx-4 px-4 py-2">
              <div className="d-flex gap-3 align-items-center">
                <i className="fa-solid fa-bolt fa-lg"></i>

                <p className="AboutBenP">Hassle-free Hiring</p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column align-items-end">
            <div>
              {" "}
              <div className="mx-3 mt-4 d-flex align-items-center gap-3 AboutSubHeading">
                <i className="fa-solid fa-wrench " />
                <p>
                  <b>Benefits for Service Providers</b>
                </p>
              </div>
              <div className="mx-4 px-4 py-2">
                <div className="d-flex gap-3 align-items-center">
                  <i className="fa-solid fa-bolt fa-lg"></i>

                  <p className="AboutBenP">Showcase Your Skills</p>
                </div>
              </div>
              <div className="mx-4 px-4 py-2">
                <div className="d-flex gap-3 align-items-center">
                  <i className="fa-solid fa-bolt fa-xl"></i>

                  <p className="AboutBenP"> Expand Your Reach</p>
                </div>
              </div>
              <div className="mx-4 px-4 py-2">
                <div className="d-flex gap-3 align-items-center">
                  <i className="fa-solid fa-bolt fa-lg"></i>

                  <p className="AboutBenP">Secure Payments</p>
                </div>
              </div>
              <div className="mx-4 px-4 py-2">
                <div className="d-flex gap-3 align-items-center">
                  <i className="fa-solid fa-bolt fa-lg"></i>

                  <p className="AboutBenP">Manage Bookings Effortlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="AboutImageContainer">
        <Image src={BenifitsImg} className="AboutTitleImg" rounded />
      </div>
    </div>
  );
};

export default Benifits;