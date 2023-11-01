import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UserImg from "../../../assets/images/header/user.jpg";
import ServiceProvideimg from '../../../assets/images/Customer/ServiceProvider1.png';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

function ViewPostedJobs2() {

    return (

        <div className="d-flex flex-column col-12  justify-content-center align-items-center">
            <Col className="commentSection-col-container col-12 col-lg-10 col-md-10 col-sm-11 mt-3">

                <Row>
                    <Col className="d-flex flex-column align-items-start">
                        <span className="commentSection-comment-title" style={{ fontWeight: "650" }}>Comments</span>
                    </Col>
                    <Col className="commentSection-comment-count-container d-flex flex-column align-items-end">
                        <span className="commentSection-comment-count" style={{ fontWeight: "650" }}>3 comments</span>
                    </Col>
                </Row>

                {/* NEED TO PUT LOOP HERE*/}
                <Row>
                    <div className="commentSection-comment-container mt-3 p-3" style={{ border: "1px solid black", borderRadius: "15px" }}>
                        <div className="commentSection-comment-header d-flex flex-row">
                            <div className="commentSection-avatar-container">
                                <Link to={`/customer/ViewServiceProvider`}>        <img
                                    src={ServiceProvideimg}
                                    alt="avatar"
                                    className="commentSection-avatar rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                /></Link>
                            </div>
                            <div className="commentSection-username-container ms-3">
                                <span className="commentSection-username" style={{ fontWeight: "650" }}>Alex</span>
                            </div>
                            <div className="commentSection-comment-date-container ms-auto ">
                                <span className="commentSection-comment-date" style={{ fontWeight: "650" }}>2021-08-01</span>
                            </div>
                        </div>
                        <div className="commentSection-body mt-2">
                            <span className="commentSection-comment-body-text" style={{ fontWeight: "500" }}>I can do this job. Please contact me.</span>
                        </div>
                    </div>
                </Row>
            </Col>


            <Col className="commentSection-col-container col-12 col-lg-10 col-md-10 col-sm-11 mt-2">
                <Row>
                    <div className="commentSection-comment-container mt-3 p-3" style={{ border: "1px solid black", borderRadius: "15px" }}>
                        <div className="commentSection-comment-header d-flex flex-row">
                            <div className="commentSection-avatar-container">
                                <img
                                    src={UserImg}
                                    alt="avatar"
                                    className="commentSection-avatar rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </div>
                            <div className="commentSection-username-container ms-3">
                                <span className="commentSection-username" style={{ fontWeight: "650" }}>Juliyan</span>
                            </div>
                            <div className="commentSection-comment-date-container d-flex ms-auto ">
                                <span className="commentSection-comment-date" style={{ fontWeight: "650" }}>2021-08-01</span>
                            </div>
                        </div>
                        <div className="commentSection-body mt-2">
                            <span className="commentSection-comment-body-text" style={{ fontWeight: "500" }}>I can do this job. Please contact me.</span>
                        </div>
                    </div>
                </Row>
            </Col>


            <Col className="commentSection-col-container col-12 col-lg-10 col-md-10 col-sm-11 mt-2">
                <Row>
                    <div className="commentSection-comment-container mt-3 p-3" style={{ border: "1px solid black", borderRadius: "15px" }}>
                        <div className="commentSection-comment-header d-flex flex-row">
                            <div className="commentSection-avatar-container">
                                <img
                                    src={UserImg}
                                    alt="avatar"
                                    className="commentSection-avatar rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                />
                            </div>
                            <div className="commentSection-username-container ms-3">
                                <span className="commentSection-username" style={{ fontWeight: "650" }}>Juliyan</span>
                            </div>
                            <div className="commentSection-comment-date-container ms-auto ">
                                <span className="commentSection-comment-date" style={{ fontWeight: "650" }}>2021-08-01</span>
                            </div>
                        </div>
                        <div className="commentSection-body mt-2">
                            <span className="commentSection-comment-body-text" style={{ fontWeight: "500" }}>I can do this job. Please contact me.</span>
                        </div>
                    </div>
                </Row>
            </Col>

        </div>
    );
}

export default ViewPostedJobs2;