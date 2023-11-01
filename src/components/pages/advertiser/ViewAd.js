import React, { useState } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../../assets/images/header/Background.png";
import { Link, useLocation } from "react-router-dom";
import "../../../style/advertiser/AdIndex.css";

const ShopDetailsModal = ({ show, onHide, shopData }) => {
  const location = useLocation();

  const hasServiceProvider = location.pathname.includes("ServiceProvider");
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
        {/* <br />

        {hasServiceProvider ? (
          <Link
            to="/ServiceProvider/Chat"
            className="d-flex justify-content-center"
          >
            <button className="AdSlideButton">Chat</button>
          </Link>
        ) : (
          <Link to="/Customer/Chat" className="d-flex justify-content-center">
            <button className="AdSlideButton">Chat</button>
          </Link>
        )} */}
      </Modal.Body>
    </Modal>
  );
};

const ViewSingleAd = ({ id, ad, show, onHide }) => {
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
    `data:image/png;base64,${ad.adsImages[0]}`
  );

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const shopData = {
    shopName: ad.shopName,
    ownerName: ad.firstName,
    mobileNo: ad.shopPhone,
    address: ad.shopAddress,
  };

  return (
    <div className="p-5">
      <Modal
        show={show}
        onHide={onHide}
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
                    src={ad.profileImage}
                    alt="Profile of Advertiser"
                    className="AdProfilePic"
                  />
                </div>
                <div className="namediv">
                  <p>{ad.firstName}</p>
                </div>
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
                        `data:image/png;base64,${ad.adsImages[0]}`
                      )
                    }
                  />

                  <div className="py-3 ">
                    <div className="d-flex justify-content-center AdsRowImg">
                      {ad.adsImages.map((image, index) => (
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
                  <h1 className="AdSlideHeading">{ad.adsName}</h1>
                </div>
                <div>
                  <p>{ad.description}</p>
                  <hr />
                  <p> category: {ad.category}</p>
                  <p>
                    Warranty: {ad.warrantyMonths ? ad.warrantyMonths : "N/A"}
                  </p>

                  <p> Delivery: {ad.delivery}</p>
                  <h1 className="AdPrice text-center">{ad.price} LKR</h1>
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

export default ViewSingleAd;
