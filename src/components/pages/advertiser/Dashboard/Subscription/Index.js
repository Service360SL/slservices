import React, { useState, useEffect } from "react";
import axios from "axios";

import Subscriped from "./subscribed";
import Subscribtion from "./subscription";

const SubscripetionIndex = () => {
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);

  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/auth/subscriptionDetails/${userDetail.userid}`
      )
      .then((res) => {
        console.log("suscess" + res.data);
        setSubscriptionDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  return (
    <div>
      {subscriptionDetails ? (
        <Subscriped
          id={subscriptionDetails.id}
          planName={subscriptionDetails.planName}
          price={subscriptionDetails.planPrice}
          status={subscriptionDetails.status}
          endDate={subscriptionDetails.endDate}
          startDate={subscriptionDetails.startDate}
          description={subscriptionDetails.planDescription}
          userid={subscriptionDetails.userid}
        />
      ) : (
        <Subscribtion />
      )}
    </div>
  );
};

export default SubscripetionIndex;
