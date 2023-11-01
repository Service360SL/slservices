import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { Card, Row, Col, Form, Container } from "react-bootstrap";
import BgImage from "../../../../assets/images/header/Background.png";
import "../../../../style/User/Admin/ViewReviewandRating.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating-stars-component";
import axios from "axios";
import reviewImg from "../../../../assets/images/header/reviews.png";

const serverLink = 'http://localhost:8080';

const AddReviewandRating = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [data, setData] = useState({
    reviewData: [],
    averageRating: 0,
    totalRatings: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(serverLink + '/auth/getAllSystemReview');
        const detail = response.data;
        console.log(detail);
        const totalRatings = detail.reduce((total, review) => total + review.rating, 0);
        const averageRating = totalRatings / detail.length;
        setData({
          ...data,
          reviewData: detail,
          averageRating,
          totalRatings: detail.length,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderStars = (ratingValue) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold" }} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key={fullStars}
          icon={faStarHalfAlt}
          style={{ color: "gold" }}
        />
      );
    }

    return stars;
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <Container>
      <h2 className="text-center m-3">View Reviews And Ratings About Our System</h2>
      <Form
        className="block py-5  "
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <Row className="mt-5 d-justify flex-content-around">
          <Col>
            <Card style={{ backgroundImage: `url(${BgImage})`, height: '190px' }} className="block">
              <div className="text-center">
                <div className="d-flex justify-content-center fs-3 px-2">
                  Average Rating:
                </div>
                <div className="fs-1 d-flex justify-content-center fw-bold px-2">
                  {data.averageRating.toFixed(1)}
                </div>
                <div className="d-flex justify-content-center fs-1 px-2">
                  {renderStars(data.averageRating)}
                </div>
              </div>
            </Card>
          </Col>

          <Col>
            <Card style={{ backgroundImage: `url(${BgImage})`, height: '190px' }} className="block">
              <div className="text-center">
                <div className="fs-3 d-flex justify-content-center px-2">
                  {" "}
                  Reviews
                </div>
                <div className="fs-1 d-flex justify-content-center fw-bold px-2">
                  {data.totalRatings}
                </div>
                <div className="fs-1 d-flex justify-content-center fw-bold px-2">
                  <img src={reviewImg} style={{ height: '50px', width: '50px' }} />
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row className="m-5">
          <Col className="d-flex justify-content-center  input-group">
            <DatePicker
              style={{ borderradius: 40 }}
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="From Date"
              dateFormat="dd/MM/yyyy"
              className="form-control"
            />
            <span className="input-group-text">
              <i className="bi bi-calendar2-week"></i>
            </span>
          </Col>

          <Col className="input-group">
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="To Date"
              dateFormat="dd/MM/yyyy"
              minDate={startDate}
              className="form-control"
            />
            <span className="input-group-text">
              <i className="bi bi-calendar2-week"></i>
            </span>
          </Col>
        </Row>

        {data.reviewData.map((review) => (
          <Card key={review.ratingid} className="col-xs-12">
            <Card.Body className="py-3" style={{ backgroundImage: `url(${BgImage})` }}>
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <img
                    src={review.users.profilePic}
                    className="rounded-circle mb-4 mb-lg-0 shadow-2 d-none d-lg-block"
                    alt="Profile Picture"
                    width="100"
                    height="100"
                  />
                  <Rating count={5} value={review.rating} size={25} activeColor="#ffd700" />
                </div>
                <div className="flex-grow-1 ms-4 ps-3">
                  <blockquote className="blockquote mb-4"> <FontAwesomeIcon icon={faQuoteLeft} className="fa-lg text-warning me-2" />
                    <p> <span className="font-italic">{review.review}</span></p>
                    <footer className="blockquote-footer mb-3">{review.users.firstname}{" "}{review.users.lastname}</footer>
                  </blockquote>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}

      </Form>
    </Container>
  );
};

export default AddReviewandRating;
