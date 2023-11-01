import React, { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import axios from "axios";


import "bootstrap/dist/css/bootstrap.min.css";

import "../../../style/advertiser/AdIndex.css";

import profileIcon from "./../../../assets/images/advertiser/Adam.jpg";
import adImage from "./../../../assets/images/advertiser/Ad.png";

import SlideShow from "./AdSlide";
import PageNumber from "./../Forum/PageNumber.js";
import ViewSingleAd from "./ViewAd";

import AdImg1 from "../../../assets/images/advertiser/Ads/Drill1.png";
import AdImg2 from "../../../assets/images/advertiser/Ads/Drill2.png";
import AdImg3 from "../../../assets/images/advertiser/Ads/Driller3.png";
import Ad2_1 from "../../../assets/images/admin/ads/Screw_1.jpeg";
import Ad2_2 from "../../../assets/images/admin/ads/Screw_2.jpeg";
import Ad2_3 from "../../../assets/images/admin/ads/Screw_3.jpeg";
import Ad3_1 from "../../../assets/images/admin/ads/Grinder_1.jpeg";
import Ad3_2 from "../../../assets/images/admin/ads/Grinder_2.jpeg";
import Ad3_3 from "../../../assets/images/admin/ads/Grinder_3.jpeg";
import Ad4_1 from "../../../assets/images/admin/ads/drills_2.jpeg";
import Ad4_2 from "../../../assets/images/admin/ads/drills_1.jpeg";
import Ad4_3 from "../../../assets/images/admin/ads/drills_3.jpeg";
import Ad5_1 from "../../../assets/images/admin/ads/handsaw_1.jpeg";
import Ad5_2 from "../../../assets/images/admin/ads/handsaw_2.jpeg";
import Ad5_3 from "../../../assets/images/admin/ads/handsaw_3.jpeg";


const VerifiedAdCont = ({
  ad,
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

const AdsPage = () => {
  const [ads, setAds] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAds, setFilteredAds] = useState([]);

  // Function to handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the ads based on the search query
    const filtered = ads.filter((ad) =>
      ad.adsName.toLowerCase().includes(query.toLowerCase())
    );
    
  };


  useEffect(() => {
    const apiUrl = `http://localhost:8080/auth/getAllAds`;

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

  

  const [ViewAdmodalVisible, setViewAdModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null); // To store the selected ad

  const ViewAdopenModal = (ad) => {
    setSelectedAd(ad);
    setViewAdModalVisible(true);
  };

  const viewColosedModel = () => {
    setViewAdModalVisible(false);
  };

  return (
    <Container>
      <div>
        <SlideShow ads={ads} />

        <Form>
          <fieldset>
            <Row className="AdsSearchRow">
              <h1>Search</h1>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    id="searchInput"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Select>
                    <option>Select Category</option>
                    <option>Electician</option>
                    <option>Plumber</option>
                    <option>Mechanic</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Select>
                    <option>Price Order</option>
                    <option>Lowest</option>
                    <option>Highest</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </fieldset>
        </Form>

        <hr className="AdHr" />

        <Row>
          <div className="AdsRow mt-3">
            {ads.map((ad, index) => {
              return (
                <VerifiedAdCont
                  key={ad.adsId}
                  ad={ad}
                  profileIcon={ad.profileImage}
                  proName={ad.firstName}
                  adImage={`data:image/png;base64,${ad.adsImages[0]}`}
                  adName={ad.adsName}
                  price={ad.price}
                  location={ad.area}
                  status={ad.status}
                  openModal={() => ViewAdopenModal(ad)}
                />
              );
            })}
          </div>

          {selectedAd && (
            <ViewSingleAd
              key={selectedAd.id}
              ad={selectedAd}
              show={ViewAdmodalVisible}
              onHide={viewColosedModel}
            />
          )}
        </Row>
       
      </div>
    </Container>
  );
};

export default AdsPage;