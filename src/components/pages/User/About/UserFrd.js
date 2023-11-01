import React from "react";
import { Image } from "react-bootstrap";

import backgroundImage from "../../../../assets/images/header/Background.png";

import FrdImg from "./../../../../assets/images/About/frd4.jpg";

const UserFrd = () => {
  return (
    <div className="d-flex p-3 AboutSectionCont">
      <div className="AboutImageContainer">
        <Image src={FrdImg} alt="UserFrdly" className="AboutTitleImg" rounded />
      </div>
      <div
        className="d-flex align-items-center flex-column justify-content-center AboutContentContainer"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mt-3">
          <h1>User-Friendly Interface</h1>
        </div>
        <div className="p-5 d-flex align-items-center gap-2">
          <p className="AboutPoinsP">
            Our platform is designed with simplicity and ease of use in mind.
            With a clean and intuitive interface, you can navigate effortlessly,
            making your journey through Service360 a delightful one.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserFrd;