import React from "react";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Link } from "react-router-dom";

import RejectedAds from "./RejectedAds";
import VerifiedAds from "./VerifiedAds";
import PendingAds from "./YetToVerifyAds";
import DisabledAds from "./DisabledAds"

import backgroundImage from "../../../../../assets/images/header/Background.png";
import { Container } from "react-bootstrap";

const Ads = () => {
  const [key, setKey] = useState("home");
  return (
    <Container>
      {" "}
      <div
        className="p-3"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="p-5 ">
          <h1 className="text-center">
            Unlock Your Potential Create a New Ad Today And Reach a Wider
            Audience
          </h1>
          <div className="adCenterCont">
            <Link to="/advertiser/CreateAd">
              <button className="PostAd">Post New Ad</button>
            </Link>
          </div>
        </div>
        <div>
          {" "}
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="home" title="Pending">
              <PendingAds />
            </Tab>
            <Tab eventKey="profile" title="Verified">
              <VerifiedAds />
            </Tab>
            <Tab eventKey="contact" title="Rejected">
              <RejectedAds />
            </Tab>
            <Tab eventKey="Disabled" title="Disabled">
              <DisabledAds />
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default Ads;