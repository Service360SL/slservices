import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Payment from "../../../Payment/Payment";

import "../../../../../style/advertiser/AdIndex.css";

import backgroundImage from "../../../../../assets/images/header/Background.png";

const Subscribtion = () => {
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);


  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderID, setOrderID] = useState(null);

  const [subscriptionStartDate] = useState(new Date()); 
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);
  const [chosenPlan, setChosenPlan] = useState(null);
  const [billDetailsPointerEvents, setBillDetailsPointerEvents] =
    useState("none");

  const handleSelectPlan = (index) => {
    setSelectedPlanIndex(index);
    setChosenPlan(plans[index]);
    setBillDetailsPointerEvents("auto");
  };

  const calculateSubscriptionEndDate = (startDate, duration) => {
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + duration);
    return endDate;
  };

  const subscriptionEndDate = chosenPlan
    ? calculateSubscriptionEndDate(subscriptionStartDate, chosenPlan.duration)
    : null;

  const plans = [
    {
      id: 1,
      title: "Bronze",
      points: [
        "Limited Ads Posting",
        "10 Ads Allowed",
        "Basic Ad Verification",
      ],
      price: 0,
      duration: 0,
    },
    {
      id: 2,
      title: "Gold",
      points: [
        "Unlimited Ad Posting",
        "Verified Badge by Admin",
        "Premium Ad Verification",
      ],
      price: 299,
      duration: 1,
    },
    {
      id: 3,
      title: "Platinum",
      points: [
        "Unlimited Ad Posting",
        "Verified Badge by Admin",
        "Random Ads in Slide",
        "Enhanced Ad Visibility",
      ],
      price: 499,
      duration: 1,
    },
  ];

  const navigate = useNavigate();

  const handleOpenSubscripedModal = (id) => {
    axios
      .put(`http://localhost:8080/auth/subscription/${userDetail.userid}/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (paymentSuccess && orderID) {
      handleOpenSubscripedModal(chosenPlan.id);
    }
  }, [paymentSuccess, orderID]);


  return (
    <Container
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="py-4 mb-3"
    >
      <div>
        <div className="p-3">
          <h1>Discover Our Subscription Plans</h1>
        </div>
        <div className="px-5 py-3">
          <h4>
            Select the plan that best suits your needs and unlock a world of
            convenience and exclusive benefits with our subscription plans.
          </h4>
        </div>
      </div>

      <div className={`d-flex gap-4 justify-content-center MainAdSubDiv`}>
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`AdSubDiv ${
              selectedPlanIndex === index ? "selectedAdSub" : ""
            }`}
            onClick={() => handleSelectPlan(index)}
            // style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <Card.Body>
              <Card.Title className="text-center d-flex align-items-center gap-2">
                {plan.title === "Platinum" && (
                  <i className="fa-solid fa-chess-queen fa-2xl"></i>
                )}
                {plan.title === "Gold" && (
                  <i className="fa-solid fa-chess-king fa-2xl"></i>
                )}
                {plan.title === "Bronze" && (
                  <i className="fa-solid fa-chess-knight fa-2xl"></i>
                )}
                <h2 className="AdsubH">{plan.title}</h2>
              </Card.Title>
              <Card.Text className=" AdMP">What You Will Get</Card.Text>
              {plan.points.map((point, index) => (
                <div
                  key={index}
                  className={`d-flex align-items-center gap-2 py-3`}
                >
                  <i className="fa-solid fa-feather-pointed"></i>
                  <p className="SubP">{point}</p>
                </div>
              ))}
            </Card.Body>
            <div className="px-4">
              <p className="AdSubPriceP">
                {plan.price}
                <sub> LKR/month</sub>
              </p>
            </div>
            <Card.Footer className="AdSubCarFoot">
              <div className={` d-flex justify-content-center`}>
                <button className="ChooseSubBut py-1 px-3">
                  {selectedPlanIndex === index ? "Chosen" : "Choose"}
                </button>
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>

      <div
        className="p-4  d-flex justify-content-center "
        style={{ pointerEvents: billDetailsPointerEvents }}
      >
        {chosenPlan !== null && (
          <div className="AdBillDetails p-5 shadow border">
            <h1 className="text-center">Billing Details</h1>
            <p className="AdBillDetailsP">
              Plan: <b>{chosenPlan.title}</b>
            </p>
            <p className="AdBillDetailsP">
              Price: <b>{chosenPlan.price} LKR</b>
            </p>
            {console.log("chosenPlan.id:" + chosenPlan.id)}
            {chosenPlan.title === "Bronze" ? (
              <div>
                <p className="AdBillDetailsP text-center">
                  <b>
                    {" "}
                    This is the default plan. You don't need to pay for this
                    plan.
                  </b>
                </p>
                <div className={` d-flex justify-content-center`}>
                  <button
                    className="ChooseSubBut py-2 px-4"
                    onClick={() => handleOpenSubscripedModal(chosenPlan.id)}
                  >
                    Activate
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="AdBillDetailsP">
                  Duration: <b>1 Month</b>
                </p>
                <p className="AdBillDetailsP">
                  Subscription Start Date:{" "}
                  <b> {subscriptionStartDate.toDateString()}</b>
                </p>
                {subscriptionEndDate && (
                  <p className="AdBillDetailsP">
                    Subscription End Date:{" "}
                    <b> {subscriptionEndDate.toDateString()}</b>
                  </p>
                )}
                <div className={` d-flex justify-content-center`}>
                  <Payment
                    firstname={userDetail.firstname}
                    lastname={userDetail.lastname}
                    email={userDetail.email}
                    paymentTitle={chosenPlan.title}
                    amount={chosenPlan.price}
                    sendUserId={userDetail.userid}
                    reciveUserID={null}
                    setPaymentSuccess={setPaymentSuccess}
                    setOrderID={setOrderID}
                  />

                  {/* {paymentSuccess && orderID && (
                    handleOpenSubscripedModal(chosenPlan.id)
                  )} */}
                  
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Subscribtion;
