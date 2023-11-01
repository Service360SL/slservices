import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import axios from "axios";

import DisabledAdPopUp from "./DisabledAdPopUp";

import "../../../../../style/advertiser/AdIndex.css";

import profileIcon from "./../../../../../assets/images/advertiser/Adam.jpg";

import Ad6_1 from "../../../../../assets/images/admin/ads/hammer_1.jpeg";
import Ad6_2 from "../../../../../assets/images/admin/ads/hammer_2.jpeg";
import Ad6_3 from "../../../../../assets/images/admin/ads/hammer_3.jpeg";
import Ad7_1 from "../../../../../assets/images/admin/ads/disk_2.jpeg";
import Ad7_2 from "../../../../../assets/images/admin/ads/disk_1.jpeg";
import Ad7_3 from "../../../../../assets/images/admin/ads/disk_3.jpeg";
import Ad8_1 from "../../../../../assets/images/admin/ads/plier_1.jpeg";
import Ad8_2 from "../../../../../assets/images/admin/ads/plier_2.jpeg";
import Ad8_3 from "../../../../../assets/images/admin/ads/plier_3.jpeg";

const VerifiedAdCont = ({
  profileIcon,
  proName,
  adImage,
  adName,
  price,
  location,
  openModal,
}) => {
  return (
    <Col className="adCont">
      <div className="AdSampleCont">
        <Row>
          <Col md="auto" className="d-flex align-items-center ">
            <div>
              <img
                src={profileIcon}
                alt="Profile of Advertiser"
                className="AdProfilePic"
              />
            </div>
            <div className="namediv">
              <p>{proName}</p>
            </div>
          </Col>
          {/* <Col className="d-flex align-items-center justify-content-end">
            <div className="namediv float-right">
              <p className="AdVrifiedP  "> Verified</p>
            </div>
          </Col> */}
        </Row>

        <Row>
          <h3 className="adname">{adName}</h3>
        </Row>

        <Row className="d-flex justify-content-center">
          <Image src={adImage} fluid alt="Item" style={{ maxHeight: "10em" }} />
        </Row>

        <Row>
          <h3 className="Adprice mt-3">{price} LKR</h3>
        </Row>

        <Row>
          <Col sm={4} className="d-flex gap-1">
            <div>
              <i className="fa-solid fa-location-dot"></i>
            </div>

            <p>{location}</p>
          </Col>
          <Col sm={8} className="d-flex justify-content-end gap-1">
            <div>
              <i className="fa-solid fa-truck-front"></i>
            </div>
            <p>Free Delivery</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center ">
          <button className="AdViewButton mb-3" onClick={openModal}>
            View
          </button>
        </Row>
      </div>
    </Col>
  );
};

const DisableAds = () => {
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // To store the selected ad
  const [adsDetails, setAdsDetails] = useState([]);
  const openModal = (ad) => {
    setSelectedAd(ad); // Set the selected ad
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:8080/auth/getAds/${userDetail.userid}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setAds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <Container>
      <h2 className="AdPageHeading">Disabled Ads</h2>
      <Row>
        <div className="AdsRow">
          {ads.map((ad, index) => {
            if (ad.status === "Disabled") {
              return (
                <VerifiedAdCont
                  key={ad.adsId}
                  profileIcon={ad.profileImage}
                  proName={ad.firstName}
                  adImage={`data:image/png;base64,${ad.adsImages[0]}`}
                  adName={ad.adsName}
                  price={ad.price}
                  location={ad.area}
                  openModal={() => openModal(ad)}
                />
              );
            } else {
              return null; // Render nothing for non-verified ads
            }
          })}
        </div>

        {selectedAd && (
          <DisabledAdPopUp
            key={selectedAd.adsId}
            ads={selectedAd}
            modalVisible={modalVisible}
            closeModal={closeModal}
          />
        )}
      </Row>
    </Container>
  );
};

export default DisableAds;
