import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../../../../assets/images/header/Background.png";

import "../../../../../style/advertiser/AdIndex.css";

const ShopDetailsModal = ({ show, onHide, shopData }) => {
  console.log(shopData);
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#292D32", color: "#ffffff" }}
      >
        <Modal.Title>{shopData.shopName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center border-bottom">
          <Col className="col-4">Owner Name</Col>
          <Col className="col-6">{shopData.ownerName}</Col>
        </Row>
        <br />
        <Row className="d-flex justify-content-center border-bottom">
          <Col className="col-4">Mobile No</Col>
          <Col className="col-6">{shopData.mobileNo}</Col>
        </Row>
        <br />
        <Row className="d-flex justify-content-center border-bottom">
          <Col className="col-4 align-self-center">Address</Col>
          <Col className="col-6">{shopData.address}</Col>
        </Row>
        <br />

        <Row className="d-flex justify-content-center">
          <button className="AdSlideButton">Chat</button>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

const EnableAdModal = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  console.log(id);
  function handleEnable() {
    axios
      .put(`http://localhost:8080/auth/enable/${id}`)
      .then((response) => {
        console.log("Ad Disabled successfully!", response.data);
        props.onHide();
        navigate(`/Advertiser/Ads`);
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Failed to Disabled ad", error);
      });
  }
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#292D32", color: "#ffffff" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Enable Ad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <button className="AdCancel rounded" onClick={props.onHide}>
            Close
          </button>
          <button className="AdEnableBut rounded" onClick={handleEnable}>
            Enable
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DisableAdPop = ({ ads, modalVisible, closeModal }) => {
  //Enable Model
  const [EnableModalShow, setEnableModalShow] = React.useState(false);

  // Shop Details

  const [showShopDetails, setShowShopDetails] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const openShopDetailsModal = (shopData) => {
    setSelectedShop(shopData);
    setShowShopDetails(true);
  };

  const closeShopDetailsModal = () => {
    setShowShopDetails(false);
    setSelectedShop(null);
  };

  const [, setShowModal] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };


   const shopData = {
     shopName: ads.shopName,
     ownerName: ads.firstName,
     mobileNo: ads.shopPhone,
     address: ads.shopAddress,
   };
  

 const [selectedImage, setSelectedImage] = useState(
   `data:image/png;base64,${ads.adsImages[0]}`
 );

  const navigate = useNavigate();
  const id = ads.id;
  const handleOpenAdEditModal = () => {
    navigate(`/Advertiser/editAd/${id}`);
  };

  return (
    <div className="p-5">
      <Modal
        show={modalVisible}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#292D32", color: "#ffffff" }}
        >
          <Modal.Title>View Ad</Modal.Title>
        </Modal.Header>
        <Container>
          <div style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="d-flex justify-content-between align-items-center">
              <div md="auto" className="d-flex align-items-center ">
                <div>
                  <img
                    src={ads.profileImage}
                    alt="Profile of Advertiser"
                    roundedCircle
                    className="AdProfilePic"
                  />
                </div>
                <div className="namediv">
                  <p>{ads.firstName}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i
                  className="fa-solid fa-pen-to-square fa-2xl AdEditBut"
                  onClick={handleOpenAdEditModal}
                ></i>
                <button
                  className="AdEnableBut rounded"
                  onClick={() => setEnableModalShow(true)}
                >
                  Enable
                </button>

                <EnableAdModal
                  id={ads.id}
                  show={EnableModalShow}
                  onHide={() => setEnableModalShow(false)}
                />
              </div>
            </div>

            <div className="d-flex align-items-center AdsViewCont">
              <div>
                <div className="AdViewImage">
                  <Image
                    src={selectedImage}
                    alt="Main image"
                    fluid
                    onClick={() =>
                      handleImageClick(
                        `data:image/png;base64,${ads.adsImages[0]}`
                      )
                    }
                  />

                  <div className="py-3 ">
                    <div className="d-flex justify-content-center AdsRowImg">
                      {ads.adsImages.map((image, index) => (
                        <div key={index} className="m-3 AdsColImg">
                          <Image
                            src={`data:image/png;base64,${image}`}
                            alt={`Gallery image ${index + 1}`}
                            thumbnail
                            fluid
                            onClick={() =>
                              handleImageClick(`data:image/png;base64,${image}`)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-center">
                  <h1 className="AdSlideHeading">{ads.adName}</h1>
                </div>
                <div>
                  <p>
                    The New Listing Digital Drill Angle Machine Cordless Hammer
                    Set Electric Specification 24V Cordless Power Drills
                  </p>
                  <hr />
                  <p> category: {ads.category}</p>
                  <p> Warranty: {ads.warrantyMonths}</p>
                  <p> Delivery: {ads.delivery}</p>
                  <h1 className="AdPrice text-center">{ads.price} LKR</h1>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <Button
                    className="AdSlideButton"
                    onClick={() => openShopDetailsModal(shopData)}
                  >
                    {" "}
                    Shop Details
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <ShopDetailsModal
            show={showShopDetails}
            onHide={closeShopDetailsModal}
            shopData={shopData}
          />
        </Container>
      </Modal>
    </div>
  );
};

export default DisableAdPop;
