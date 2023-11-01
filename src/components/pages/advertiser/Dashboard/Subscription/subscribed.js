import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link, } from "react-router-dom";

import HistoryModal from "./subscriptionHistory";

import backgroundImage from "../../../../../assets/images/header/Background.png";

const Subscriped = ({id,planName, price, startDate, endDate, description,status, userid}) => {
  // History Modal

  const [historyModal, setHistoryModal] = React.useState(false);

  const openHistoryModal = () => {
    setHistoryModal(true);
  };

  const closeHistoryModal = () => {
    setHistoryModal(false);
  };

  const plans = [
    {
      id: 0,
      title: "Bronze",
      points: [
        "Limited Ads Posting",
        "10 Ads Allowed",
        "Basic Ad Verification",
      ],
      price: "0 LKR",
      duration: 0,
    },
    {
      id: 1,
      title: "Gold",
      points: [
        "Unlimited Ad Posting",
        "Verified Badge by Admin",
        "Premium Ad Verification",
      ],
      price: "299 LKR",
      duration: 1,
    },
    {
      id: 2,
      title: "Platinum",
      points: [
        "Unlimited Ad Posting",
        "Verified Badge by Admin",
        "Random Ads in Slide",
        "Enhanced Ad Visibility",
      ],
      price: "499 LKR",
      duration: 1,
    },
  ];
  const { subId } = useParams();
  const subData = plans.find((plan) => plan.id === parseInt(subId));


   const endDateObject = new Date(endDate);

   // Calculate the time difference in milliseconds
   const timeDifference = endDateObject - new Date();

   // Convert the time difference into days
   const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));


  return (
    <Container
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="py-4 mb-3"
    >
      <div className="d-flex justify-content-between">
        <h2>Your Plan</h2>
        <button
          className="ChooseSubBut py-2  px-4"
          style={{ height: "fit-content" }}
          onClick={openHistoryModal}
        >
          History
        </button>
      </div>
      <HistoryModal show={historyModal} onHide={closeHistoryModal} />

      <div className="d-flex gap-3 justify-content-center">
        {" "}
        <div
          style={{ width: "fit-content" }}
          className="shadow p-5 bg-white rounded border d-flex flex-column align-items-center gap-3"
        >
          <div className="text-center">
            <h4 className="text-center">Your Plan</h4>
          </div>
          <div className="d-flex align-items-center">
            {planName === "Bronze" && (
              <i className="fa-solid fa-chess-knight fa-2xl">{planName}</i>
            )}
            {planName === "Gold" && (
              <i className="fa-solid fa-chess-king fa-2xl">{planName}</i>
            )}
            {planName === "Platinum" && (
              <i className="fa-solid fa-chess-queen fa-2xl">{planName}</i>
            )}
          </div>
        </div>
        <div
          style={{ width: "fit-content" }}
          className="shadow p-5 bg-white rounded border d-flex flex-column align-items-center gap-3"
        >
          <div>
            <h4 className="text-center">Start Date</h4>
          </div>
          <div className="d-flex  gap-3">
            <div style={{ height: "fit-content" }}>
              <h3 className="GreenDate">{startDate}</h3>
            </div>
          </div>
        </div>
        <div
          style={{ width: "fit-content" }}
          className="shadow p-5 bg-white rounded border d-flex flex-column align-items-center gap-3"
        >
          <div>
            <h4 className="text-center">End Date</h4>
          </div>
          <div className="d-flex align-items-center gap-3">
            <h3 className="redDate"> {endDate}</h3>
          </div>
        </div>
        <div
          style={{ width: "fit-content" }}
          className="shadow p-5 bg-white rounded border d-flex flex-column align-items-center gap-3"
        >
          <div>
            <h4 className="text-center">Remaining Days</h4>
          </div>
          <div className="d-flex  gap-3">
            <div style={{ height: "fit-content" }}>
              <h3 className="GreenDate">{remainingDays} Days</h3>
            </div>
          </div>
        </div>
      </div>
      {planName === "Bronze" && (
        <div className="px-5 mt-3">
          <h4 className="text-center">
            Your current plan is set to automatically renew at 0LKR. For a more
            enhanced experience and the ability to post more than 10 ads,
            consider exploring our other plans.
          </h4>
        </div>
      )}

      <div className="p-3 mt-5">
        <h3 className="text-center">
          Elevate Your Advertising Experience: Upgrade or Renew Your Plan for
          Continued Success.
        </h3>

        <div className={` d-flex justify-content-center`}>
          <Link to="/advertiser/Subscribtion">
            <button className="ChooseSubBut py-2 px-4">Upgrade</button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Subscriped;