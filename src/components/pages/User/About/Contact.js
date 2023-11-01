import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import backgroundImage from "../../../../assets/images/header/Background.png";

import TouchImg from "./../../../../assets/images/About/Touch1.jpg";


const Contact = () => {
  return (
    <div className="d-flex p-3 AboutSectionCont">
      <div
        className="d-flex  flex-column justify-content-center AboutContentContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div
          className="d-flex align-items-center flex-column justify-content-center AboutContentContainer"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="mt-3">
            <h1>Connect with Us</h1>
          </div>
          <div className="p-5 d-flex align-items-center gap-2">
            <p className="AboutPoinsP">
              For any inquiries, feedback, or support, please don't hesitate
              to contact our team. We are here to assist you and ensure your
              experience with us is exceptional.
            </p>
          </div>
          <div className=" d-flex align-items-center gap-2">
            <Link to="/services">
              <button className="AboutSBut">Contact</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="AboutImageContainer">
        <Image src={TouchImg} alt="Hand" className="AboutTitleImg" rounded />
      </div>
    </div>
  );
};

export default Contact;