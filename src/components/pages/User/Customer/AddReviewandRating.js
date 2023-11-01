import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import Rating from "react-rating-stars-component";
import BgImage from "../../../../assets/images/header/Background.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import axios from "axios";

//import {Authentication } from


// Assuming your response object contains user data with a 'userid' property

function AddReviewandRating(props) {
  // Remove the userId state as it will be determined from the authentication

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    const formData = new FormData();
        formData.append('userid', userData.userid);
        formData.append('review',review);
        formData.append('rating',rating);
        
    // Replace 'userId' with the actual 'userId' obtained from the user's authentication

    axios
            .post(`http://localhost:8080/auth/addSystemReview`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
  
      // if (response.ok) {
      //   console.log('Review added successfully.');
        
      // } else {
      //   console.error('Error adding review.');
       
      // }
    
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#292D32", color: "#ffffff" }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <h2>Add Review And Rating</h2>
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Card
          className="py-4 px-2"
          style={{ backgroundImage: `url(${BgImage})` }}
        >
          <Card.Body>
            <Row className="d-flex justify-content-center mt-3">
              <Col>
                <div style={{ fontWeight: 50, fontSize: 20 }}>
                  Give Your Rating For Our System
                </div>
                <Rating
                  count={5}
                  value={rating}
                  onChange={handleRatingChange}
                  size={40}
                  activeColor="#ffd700"
                />
              </Col>
            </Row>

            <div className="mt-3">
              <Form.Group controlId="comment">
                <Form.Label style={{ fontWeight: 50, fontSize: 20 }}>
                  Please Give Your Comments To Improve Our System
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter your comment"
                  rows={3}
                  onChange={handleReviewChange}
                />
              </Form.Group>
            </div>
            <div className="d-flex justify-content-end  mt-3">
              <Button type="submit" className=" btn-effect">
                <FontAwesomeIcon icon={faCheck} className="submit-icon" />
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Form>
      {/* {showSuccessMessage && (
        <div className=" mt-3">
          Successfully added the review and rating!
        </div>
      )} */}
    </Modal>
  );
}

export default AddReviewandRating;