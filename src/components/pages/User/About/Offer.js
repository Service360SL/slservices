import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import backgroundImage from "../../../../assets/images/header/Background.png";

import OfferImg from "./../../../../assets/images/About/Offer1.jpg";

const Offer = () => {
  return (
    <div className="d-flex p-3 AboutSectionCont">
      <div className="AboutImageContainer">
        <Image src={OfferImg} className="AboutTitleImg" rounded />
      </div>
      <div
        className="d-flex align-items-center flex-column justify-content-center AboutContentContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mt-3">
          <h1>What We Offer</h1>
        </div>
        <div className="p-5 d-flex align-items-center gap-2">
          <p className="AboutPoinsP">
            we offer an extensive array of services that cater to diverse
            needs. Our platform is a one-stop solution for customers looking
            to find and hire service providers based on service charges,
            ratings, and locations. Likewise, service providers can showcase
            their talents and skills, expanding their reach and securing new
            work opportunities.
          </p>
        </div>

        <div className="p-5 d-flex align-items-center gap-2">
          <Link to="/services">
            <button className="AboutSBut">View Services</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;