import React, { useEffect, useState } from "react";
import axios from "axios";

const Payment = ({
  firstname,
  lastname,
  email,
  paymentTitle,
  amount,
  sendUserId,
  reciveUserID,
  setPaymentSuccess,
  setOrderID,
}) => {
  const [Pay, setPay] = useState({});
  const [success, setSuccess] = useState(false);

  const formattedAmount = parseFloat(amount);

  useEffect(() => {
    axios
      .post("http://localhost:8080/auth/calculateHash", null, {
        params: { amount: formattedAmount }, // Send amount as a request parameter
      })
      .then((res) => {
        console.log(res.data);
        setPay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [amount]);

   useEffect(() => {
     if (success) {
       axios
         .post("http://localhost:8080/auth/PaymentNotification", null, {
           params: {
             order_id: Pay.orderId, // Add the 'order_id' parameter here
             items: paymentTitle,
             amount: Pay.amount,
             sendUserId: sendUserId,
             reciveUserID: reciveUserID,
           },
         })
         .then((res) => {
           console.log(res.data);
         })
         .catch((err) => {
           console.log(err);
         });

     }
   }, [success]);

  var payment = {
    sandbox: true,
    merchant_id: "1224501",
    return_url: "http://localhost:3000/advertiser/",
    cancel_url: "http://localhost:3000/advertiser/",
    notify_url: "http://localhost:8080/auth/PaymentNotification",
    order_id: Pay.orderId,
    items: paymentTitle,
    amount: Pay.amount,
    currency: "LKR",
    hash: Pay.hash,
    first_name: firstname,
    last_name: lastname,
    email: email,
    phone: "0778964983",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
  };

  console.log(payment);

  function pay(e) {
    e.preventDefault(); 
    window.payhere.startPayment(payment);
  }

  window.payhere.onCompleted = function onCompleted(order_id) {
    console.log("Payment completed. OrderID:" + order_id);
    setPaymentSuccess(true);
    setSuccess(true);
    setOrderID(order_id);
  };

  return (
    <button onClick={pay} className="btn-ServiceProvider-1 px-1">
      Pay with Payhere
    </button>
  );
};

export default Payment;
