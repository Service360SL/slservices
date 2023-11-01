import React from "react";

import "./../../../../style/User/AboutUs/About.css";

import AboutUs from "./AboutUs";
import Offer from "./Offer";
import Mission from "./Mission";
import Benifits from "./Benifits";
import UserFrd from "./UserFrd";
import Contact from "./Contact";

import AnimationRevealPage from "../../../../helpers/AnimationRevealPage";


const About = () => {

  return (
    <div>
      <AnimationRevealPage>
        <AboutUs />
        <Mission />
        <Offer />
        <Benifits />
        <UserFrd />
        <Contact />
      </AnimationRevealPage>
    </div>
  );
};

export default About;