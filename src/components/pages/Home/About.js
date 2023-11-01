import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as SvgDotPatternIcon } from '../../../assets/images/home/dot-pattern.svg';
import tw from "twin.macro";
import BgImage from './../../../assets/images/header/Background.png';
import axios from 'axios';
import Rating from "react-rating-stars-component";
// const aboutData = [
//     {
//         id: 1,
//         image: require('../../../assets/images/home/Customer_1.png'),
//         name: 'Angelina Jolie',
//         city: 'Jaffna',
//         review: `I've been using this platform for a few months now, and it has made my life so much easier.
//         I can easily find service providers based on my requirements and hire them within minutes.
//         The variety of services available is impressive, and the platform is user-friendly. Highly recommended!`,
//     },
//     {
//         id: 2,
//         image: require('../../../assets/images/home/Customer_2.png'),
//         name: 'Virat Kholi',
//         city: 'Colombo',
//         review: `As a busy professional, I don't have the time to search for service providers individually.
//         This platform has simplified the process for me. I can compare prices, read reviews,
//         and make an informed decision about hiring service providers.
//         It has saved me time and provided me with reliable professionals. Thank you!`,
//     },
//     {
//         id: 3,
//         image: require('../../../assets/images/home/Customer_3.png'),
//         name: 'John Smith',
//         city: 'Batticalo',
//         review: `I recently used this platform to find a service provider, and I must say,
//         I'm impressed.The website is intuitive, and the booking process was seamless.
//         I found a skilled professional who delivered excellent service.
//         It's great to have a platform that connects customers with trusted service providers.
//         I will definitely be using it again.`,
//     },
// ]

const serverLink = 'http://localhost:8080';

const DecoratorBlob1 = tw(SvgDotPatternIcon)`relative bottom-0 left-0 w-32 h-32 mb-0 ml-0 transform -translate-x-1/2 translate-y-1/2 fill-current text-gray-500 opacity-50`
const DecoratorBlob2 = tw(SvgDotPatternIcon)`relative top-0 right-0 w-32 h-32 mt-16 mr-6 transform translate-x-1/2 -translate-y-1/2 fill-current text-gray-500 opacity-50`

export default function AppAbout() {

    const [data, setData] = React.useState({
        reviewData: [],
        selectedReviews: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getAllSystemReview');
                const detail = response.data;
                setData({
                    ...data,
                    reviewData: detail,
                    selectedReviews: detail.filter((review) => review.status === 'Selected'),
                });
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="block about-block" style={{ backgroundImage: `url(${BgImage})` }}>

            <div className="title-holder">
                <h2>Customers Says About Us</h2>
                <div className="subtitle">Discover insightful blogs uploaded by service providers</div>
            </div>

            <Container className="py-5 h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col className="xl-10">
                        <Card>
                            <Card.Body className="py-3">
                                <Carousel controls indicators>
                                    {
                                        data.selectedReviews.map((review) => {
                                            return (
                                                <Carousel.Item key={review.ratingid}>
                                                    <Row className="justify-content-center">
                                                        <Col md="8" lg="9" xl="8">
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0">
                                                                    <img
                                                                        src={review.users.profilePic}
                                                                        className="rounded-circle mb-4 mb-lg-0 shadow-2 d-none d-lg-block"
                                                                        alt="Customers Profile Picture"
                                                                        width="100"
                                                                        height="100"
                                                                    />
                                                                    <Rating count={5} value={review.rating} size={25} activeColor="#ffd700" />
                                                                </div>
                                                                <div className="flex-grow-1 ms-4 ps-3">
                                                                    <blockquote className="blockquote mb-4">
                                                                        <FontAwesomeIcon
                                                                            icon={faQuoteLeft}
                                                                            className="fa-lg text-warning me-2"
                                                                        />
                                                                        <p>
                                                                            <span className="font-italic">
                                                                                {review.review}
                                                                            </span>
                                                                        </p>
                                                                        <footer className="blockquote-footer mb-3">
                                                                            {review.users.firstname}
                                                                        </footer>
                                                                    </blockquote>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <DecoratorBlob2 className="d-none d-md-block" />
                                                        <DecoratorBlob1 className="d-none d-lg-block" />
                                                    </Row>
                                                </Carousel.Item>
                                            )
                                        })
                                    }
                                </Carousel>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </section>
    );
}