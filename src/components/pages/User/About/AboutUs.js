import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";


import ABoutBgImg from "./../../../../assets/images/About/BGPic1.jpg";


const AboutUs = () => {
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    // Set a timeout to mark the typing animation as done
    setTimeout(() => setIsTypingDone(true), 3000);
  }, []);
  return (
    <div className="aboutUs-block ">
      <Carousel className="hide-navigation-icons">
        <Carousel.Item>
          <img className="d-block w-100" src={ABoutBgImg} alt={"bacground"} />
          <Carousel.Caption>
            <div className="d-flex justify-content-center align-items-center flex-column p-3">
              <p
                className={`typewriter ${isTypingDone ? "typing-done" : ""}`}
                id="AboutUsP"
              >
                About Us
              </p>
              <p className="AboutDisP m-5">
                Welcome to{" "}
                <b>
                  Service
                  <span className="P360" style={{ color: "#9F390D" }}>
                    360
                  </span>
                </b>
                ! We are a user-friendly platform that aims to address the
                challenges faced by service providers and customers by bringing
                together a wide range of selected services under one roof. Our
                mission is to create a seamless experience for both service
                providers and customers, making it effortless to find and hire
                the best services or showcase their skills.
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default AboutUs;
