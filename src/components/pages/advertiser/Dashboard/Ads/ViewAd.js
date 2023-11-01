import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../../../../assets/images/header/Background.png";

import "../../../../../style/advertiser/AdIndex.css";

const ShopDetailsModal = ({ show, onHide, shopData }) => {
  // console.log(shopData);
  return (
    <Modal
      show={show}
      onHide={onHide}
      // size="sm"
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

const ConfirmDelete = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  // console.log(id);
  function handleDelete() {
    axios
      .delete(`http://localhost:8080/auth/deleteAd/${id}`)
      .then((response) => {
        console.log("Ad Deleted successfully!", response.data);
        props.onHide();
        navigate(`/Advertiser/Ads`);
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Failed to Delete ad", error);
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
          Confirm Delete Ad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <button className="AdCancel rounded" onClick={props.onHide}>
            Close
          </button>
          <button className="AdDeleted rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ConfirmDisabled = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  // console.log(id);
  function handleDisable() {
    axios
      .put(`http://localhost:8080/auth/disable/${id}`)
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
          Confirm Disabled Ad
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center justify-content-center gap-3">
          <button className="AdCancel rounded" onClick={props.onHide}>
            Close
          </button>
          <button className="AdDeleted rounded" onClick={handleDisable}>
            Disable
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ViewAd = ({ ads, modalVisible, closeModal }) => {
  // disable disable pop
  const [DisableModalShow, setDisableModalShow] = React.useState(false);
  // show delete details
  const [DeleteModalShow, setDeleteModalShow] = React.useState(false);

  //Show Shop details

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



  const [selectedImage, setSelectedImage] = useState(
    `data:image/png;base64,${ads.adsImages[0]}`
  );


  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };



const shopData = {
  shopName: ads.shopName, 
  ownerName: ads.firstName, 
  mobileNo: ads.shopPhone, 
  address: ads.shopAddress, 
};

  // Open Edit Ad Page
  const navigate = useNavigate();
  const id = ads.id;
  const handleOpenAdEditModal = () => {
    // Navigate to the editAd route with the id as a parameter
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
                    className="AdProfilePic"
                  />
                </div>
                <div className="namediv">
                  <p>{ads.firstName}</p>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <button
                  className="AdDisableBut rounded"
                  onClick={() => setDisableModalShow(true)}
                >
                  Disable
                </button>
                <i
                  className="fa-solid fa-pen-to-square fa-2xl AdEditBut"
                  onClick={handleOpenAdEditModal}
                ></i>
                <i
                  className="fa-solid fa-trash fa-2xl AdDeleteBut"
                  onClick={() => setDeleteModalShow(true)}
                ></i>
                <ConfirmDelete
                  id={ads.id}
                  show={DeleteModalShow}
                  onHide={() => setDeleteModalShow(false)}
                />
                <ConfirmDisabled
                  id={ads.id}
                  show={DisableModalShow}
                  onHide={() => setDisableModalShow(false)}
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
                      handleImageClick(`data:image/png;base64,${ads.adsImages[0]}`)
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
                  <p> Warranty: {ads.warrantyMonths} Months</p>
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
        <div>
          {" "}
          {ads.reason && <h3 className="AdrejectP p-4">{ads.reason}</h3>}
        </div>
      </Modal>
    </div>
  );
};

export default ViewAd;
