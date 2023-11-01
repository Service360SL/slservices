import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";

import ViewSingleAd from "./ViewAd";

import "../../../style/advertiser/AdIndex.css";

import adImage from "./../../../assets/images/advertiser/Ad.png";
import backgroundImage from "../../../assets/images/header/Background.png";

import AdImg1 from "../../../assets/images/advertiser/Ads/Drill1.png";
import AdImg2 from "../../../assets/images/advertiser/Ads/Drill2.png";
import AdImg3 from "../../../assets/images/advertiser/Ads/Driller3.png";

import AdG1_1 from "../../../assets/images/advertiser/Ads/AdG1.png";
import AdG1_2 from "../../../assets/images/advertiser/Ads/AdG2.png";
import AdG1_3 from "../../../assets/images/advertiser/Ads/AdG3.png";

import f1 from "../../../assets/images/advertiser/Ads/F1.png";
import f2 from "../../../assets/images/advertiser/Ads/F2.png";
import f3 from "../../../assets/images/advertiser/Ads/F3.png";

import profileIcon from "./../../../assets/images/advertiser/Adam.jpg";

const AdSlide = ({ads}) => {
  const [ViewSlideAdmodalVisible, setSlideViewAdModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);


  // Filter ads with Platinum package
  const platinumAds = ads.filter((ad) => ad.packageName === "Platinum");

  // Shuffle the platinumAds array
  for (let i = platinumAds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [platinumAds[i], platinumAds[j]] = [platinumAds[j], platinumAds[i]];
  }

  // Select the first 10 ads (or all if there are less than 10)
  const selectedAds = platinumAds.slice(0, 10);

  // // Extract the required data and format it
  // const slideData = selectedAds.map((ad) => ({
  //   id: ad.id,
  //   proName: ad.firstName,
  //   profileIcon: ad.profileImage,
  //   adImages: ad.adsImages[0],
  //   adName: ad.adName,
  //   delivery: ad.delivery,
  //   price: ad.price,
  //   location: ad.area,
  // }));

  // console.log(slideData);

  const OpenSlideViewAdModal = (ad) => {
    setSelectedAd(ad);
    setSlideViewAdModalVisible(true);
  };
  const viewSlideColosedModel = () => {
    setSlideViewAdModalVisible(false);
  };

  return (
    <div>
      <div className="AdSlideDiv">
        <Carousel>
          {selectedAds.map((ad, index) => (
            <Carousel.Item key={index}>
              <div
                className="AdSlide"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="AdLeftCol">
                  <Image
                    src={`data:image/png;base64,${ad.adsImages[0]}`}
                    alt="Item"
                    className="rounded"
                  />
                </div>
                <div className="AdRightCol">
                  <div>
                    <h1 className="AdSlideHeading">{ad.adsName}</h1>
                  </div>

                  <br />
                  <br />
                  <div>
                    <h1 className="AdPrice">{ad.price} LKR</h1>
                  </div>
                  <div className="mt-3">
                    <button
                      className="AdSlideButton"
                      onClick={() => OpenSlideViewAdModal(ad)}
                    >
                      View
                    </button>
                  </div>
                  <div className="d-flex gap-2 p-3">
                    <div>
                      <i className="fa-solid fa-truck-front"></i>
                    </div>
                    <h4>{ad.delivery}</h4>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-1 m-3">
                <div>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="d-flex align-items-center">
                  <h4>{ad.area}</h4>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      {selectedAd && (
        <ViewSingleAd
          key={selectedAd.id}
          id={selectedAd.id}
          modalVisible={ViewSlideAdmodalVisible}
          closeModal={viewSlideColosedModel}
        />
      )}
    </div>
  );
};

export default AdSlide;