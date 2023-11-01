import React from "react";
import { Image } from "react-bootstrap";

import backgroundImage from "../../../../assets/images/header/Background.png";

import MissonImg from "./../../../../assets/images/About/misson.jpg";

const Mission = () => {
  return (
    <div className="d-flex p-3 AboutSectionCont">
      <div
        className="d-flex align-items-center flex-column justify-content-center AboutContentContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mt-3">
          <h1>Our Misson And Visson</h1>
        </div>
        <div className="p-5 d-flex align-items-center gap-2">
          <i className="fa-solid fa-wrench fa-xl" />
          <p className="AboutPoinsP">
            To simplify the process of connecting customers with top-notch
            service providers, offering a platform that promotes efficiency,
            reliability, and transparency.
          </p>
        </div>

        <div className="p-5 d-flex align-items-center gap-2">
          <i className="fa-solid fa-wrench fa-xl" />
          <p className="AboutPoinsP">
            We envision a world where customers can easily find and hire the
            services they need while empowering service providers to grow
            their businesses and find new opportunities.
          </p>
        </div>
      </div>
      <div className="AboutImageContainer">
        <Image src={MissonImg} className="AboutTitleImg" rounded />
      </div>
    </div>
  );
};

export default Mission;