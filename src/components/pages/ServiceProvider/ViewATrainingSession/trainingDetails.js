import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { all } from "axios";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Payment from "../../Payment/Payment";

function TrainingSession() {
    const [viewTrainingSessionData, setviewTrainingSessionData] = useState(null);

    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [orderID, setOrderID] = useState(null);

    const [registrationData, setRegistrationData] = useState({
        email: "",
        mobilenumber:""
    });

    const [isChecked, setIsChecked] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const [showAlertRed, setShowAlertRed] = useState(false);
    const [alertMessageRed, setAlertMessageRed] = useState("");

    useEffect(() => {
        if (paymentSuccess && orderID) {
            if (paymentSuccess) {
                    axios.post(`http://localhost:8080/auth/registerTrainingSession/${trainingsessionId}`, registrationData,{
                            params:{
                                serviceproviderid:userData.userid,
                            }
                        })
                        .then((response) => {
                            console.log('Registration successfully:', response.data);
                            setRegistrationData({
                                email: "",
                                mobilenumber: "",
                            });
        
                            showAlertWithMessage("Registration successful!, Check your email for more details.");
                        })
                        .catch((error) => {
                            console.error('Error Registration:', error);    
                        }); 
            } else {
                showAlertWithMessage("Payment Failed, Please try again!");
            }
        }
    }, [paymentSuccess, orderID]);

    const navigate = useNavigate();
        const handleBackClick = () => {
        navigate(-1);
    };

    const { id } = useParams();
    const trainingsessionId = parseInt(id, 10);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewTrainingSessions/${trainingsessionId}`).then((res) => {
            console.log(res.data);
            setviewTrainingSessionData(res.data);
        });
    }, []);

    if (!viewTrainingSessionData) return 'No training session found!';

    // GETTING LOGGED IN SERVICEPROVIDER ID

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);
     
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({
            ...registrationData,
            [name]: value,
        });
    };

    function convertTo12HourFormat(time24) {
        const [hour, minute] = time24.split(":");
        const hourInt = parseInt(hour);
        const amPm = hourInt >= 12 ? "PM" : "AM";
        const hour12 = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
      
        return `${hour12}:${minute} ${amPm}`;
    }

    // Calculate the duration in hours and minutes
    const startTimeParts = viewTrainingSessionData.trainingsessions.trainingstarttime.split(':');
    const endTimeParts = viewTrainingSessionData.trainingsessions.trainingendtime.split(':');

    const startHours = parseInt(startTimeParts[0], 10);
    const startMinutes = parseInt(startTimeParts[1], 10);
    const endHours = parseInt(endTimeParts[0], 10);
    const endMinutes = parseInt(endTimeParts[1], 10);

    const hoursDiff = endHours - startHours;
    const minutesDiff = endMinutes - startMinutes;

    // Construct the duration string
    let durationString = '';
    if (hoursDiff > 0) {
    durationString += `${hoursDiff} hour${hoursDiff !== 1 ? 's' : ''}`;
    if (minutesDiff > 0) {
        durationString += ` and ${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
    }
    } else if (minutesDiff > 0) {
        durationString += `${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
    } else {
        durationString = '0 minutes';
    }
    
    // Get all images from the training sessions
    const trainingSessionImagesArray = viewTrainingSessionData.trainingsessionimages;
    
    // Initialize an empty array to store all images
    const allImages = [];

    // Iterate through trainingSessionImagesArray
    trainingSessionImagesArray.forEach((sessionImages) => {
    // Check if the current object has an 'images' property
    if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
        // Concatenate the 'images' array to the 'allImages' array
        allImages.push(...sessionImages.images);
    }
    });

    console.log(allImages);

    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
          }, 7000);
      };

    const showAlertWithMessageRed = (message) => {
    setAlertMessageRed(message);
    setShowAlertRed(true);

    setTimeout(() => {
        setShowAlertRed(false);
        }, 7000);
    };
    
    return (
        <div className="ms-lg-4 me-lg-4">
            <div className="ViewATraining-image-container d-flex justify-content-center mt-4 mb-3 vertical-align-middle Sp-image-view-container">
                <Carousel fade className="Sp-image-view-carousel" style={{ overflow: 'hidden', width: '100%'}}>
                    {allImages.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100 Sp-image-view"
                                src={`data:image/jpg;base64,${image}`}
                                alt={`Training Session ${index}`}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className="d-flex flex-column mb-3 mt-3">
                <span className="ViewATraining-title h3">{viewTrainingSessionData.trainingsessions.trainingtitle}</span>
                <span className="ViewATraining-sub-title h6">{viewTrainingSessionData.trainingsessions.trainingdescription}.</span>
            </div>

            <div className="ViewATraining-details border rounded px-4 py-2">
                <span className="ViewATraining-details-title h5">Details</span>
                <div className="ViewATraining-details-body-left mt-2 d-flex flex-row flex-wrap">
                    <div className="col-lg-4 col-md-6 col-12">
                        <i className="bi bi-calendar2-event-fill"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.trainingdate}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12  d-lg-flex justify-content-center">
                        <i className="bi bi-clock-fill"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{convertTo12HourFormat(viewTrainingSessionData.trainingsessions.trainingstarttime)}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 d-lg-flex justify-content-end">
                        <i className="bi bi-hourglass-top"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{durationString}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <i className="bi bi-geo-alt-fill"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.traininglocation}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 d-lg-flex justify-content-center">
                        <i className="bi bi-person-fill"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.serviceprovider.firstname}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 d-lg-flex justify-content-end">
                        <i className="bi bi-cash"></i>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.trainingcost}</span>
                    </div>
                </div>
            </div>
            <div className="border rounded px-4 py-2 mt-2">
                <span className="ViewATraining-details-title h5">Guests</span>
                <div className="ViewATraining-details-body-left mt-2 d-flex flex-row flex-wrap">
                    <div className="col-lg-4 col-md-6 col-12">
                        <Link to="#">
                            <span style={{ color: "black" }}>interested</span>&nbsp;&nbsp;&nbsp;
                        </Link>
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.interested}</span>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12 d-lg-flex justify-content-center">
                        <span>on going</span>&nbsp;&nbsp;&nbsp;
                        <span className="ViewATraining-details-sub-info-val mb-1">{viewTrainingSessionData.trainingsessions.going}</span>
                    </div>
                </div>
            </div>
            
            <br/>

            <div>
                <span className="h5 ViewATraining-title">Registration</span>
            </div>
            <Form>
                <Form.Group className="mt-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        name="email" 
                        value={registrationData.email}
                        onChange={handleInputChange} 
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-2" controlId="formBasicPassword">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter mobile number" 
                        name="mobilenumber" 
                        value={registrationData.mobilenumber}
                        onChange={handleInputChange} 
                        required
                    />
                </Form.Group>

                <Form.Group className="mt-2" controlId="formBasicPassword">
                    <Form.Label>Amount Payable</Form.Label>
                    <Form.Control type="text" value={`LKR ${viewTrainingSessionData.trainingsessions.trainingcost}`} disabled />
                </Form.Group>
                <div class="form-check mt-3">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={isChecked} onChange={handleCheckboxChange}/>
                    <label class="form-check-label" for="exampleCheck1">I have verified the event name, venue and time before proceeding my payment.</label>
                </div>
                <div className="ViewATraining-button-container mt-4 d-flex flex-row">

                    <Payment
                        firstname={userData.firstname}
                        lastname={userData.lastname}
                        email={userData.email}
                        paymentTitle={viewTrainingSessionData.trainingsessions.trainingtitle}
                        amount={viewTrainingSessionData.trainingsessions.trainingcost}
                        sendUserId={userData.userid}
                        reciveUserID={null}
                        setPaymentSuccess={setPaymentSuccess}
                        setOrderID={setOrderID}
                        onClick={(e) => {
                            e.preventDefault(); // Prevents the default behavior of the button
                        }}
                    />
                    <Button className="btn-ServiceProvider-2 ViewATraining-cancel ms-auto"  onClick={handleBackClick}>Back</Button>
                </div>
            </Form>

            <Alert
                show={showAlert}
                    variant="info"
                    onClose={() => setShowAlert(false)}
                    dismissible
                    style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999, // Adjust the z-index as needed
                    }}
                >
                {alertMessage}
            </Alert>

            <Alert
                show={showAlertRed}
                    variant="danger"
                    onClose={() => setShowAlertRed(false)}
                    dismissible
                    style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999, // Adjust the z-index as needed
                    }}
                >
                {alertMessageRed}
            </Alert>
        </div>
    );
}

export default TrainingSession;