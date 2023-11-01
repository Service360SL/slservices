import React from "react";
import { Row, Col, Card, InputGroup } from "react-bootstrap";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import Aisu from "./../../../assets/images/advertiser/aishu.jpg";
import Adam from "./../../../assets/images/advertiser/Adam.jpg";
import Sara from "./../../../assets/images/advertiser/sara.jpg";
import ProAd from "./../../../assets/images/advertiser/proAd.jpg";
import cus1 from "./../../../assets/images/home/Customer_1.png";
import cus2 from "./../../../assets/images/home/Customer_2.png";
import cus3 from "./../../../assets/images/home/Customer_3.png";

import "./../../../style/Chat/chat.css";

const ChatApp = () => {
  return (

    <div fluid>
      <Row>
        <Col md="12">
          <Card id="chat3">
            <Card.Body>
              <Row>
                <Col md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <div className="p-3">
                    <InputGroup className="rounded mb-3 border">
                      <input
                        className="form-control rounded"
                        placeholder="Search"
                        type="search"
                      />
                      <InputGroup.Text className="border-0" id="search-addon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </InputGroup.Text>
                    </InputGroup>

                    <Scrollbar
                      suppressScrollX
                      style={{ position: "relative", height: "40em" }}
                    >
                      <li className="p-2 border-bottom chathover">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src={Aisu}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Aiswarya Ranjan
                              </p>
                              <p className="small text-muted">
                                Hello, Are you there?
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Just now</p>
                            <span
                              className="badge  rounded-pill float-end"
                              style={{ backgroundColor: "#292D32" }}
                            >
                              3
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom chathover">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div class="d-flex flex-row">
                            <div>
                              <img
                                src={Adam}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Kumar Sanga
                              </p>
                              <p className="small text-muted">
                                Need to discuss about Work.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">
                              5 mins ago
                            </p>
                            <span
                              className="badge rounded-pill float-end"
                              style={{ backgroundColor: "#292D32" }}
                            >
                              2
                            </span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom chathover">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src={Sara}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Sara Arjun
                              </p>
                              <p className="small text-muted">
                                Work Will Complete Next Week.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom chathover">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src={ProAd}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Vijay Kumar
                              </p>
                              <p className="small text-muted">
                                You can meet me tomorrow.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom chathover">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div className="d-flex flex-row">
                            <div>
                              <img
                                src={cus1}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Jenifer Josep
                              </p>
                              <p className="small text-muted">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2">
                        <a
                          href="#!"
                          className="d-flex justify-content-between"
                        >
                          <div class="d-flex flex-row">
                            <div>
                              <img
                                src={cus2}
                                alt="avatar"
                                className="chatProImg d-flex align-self-center me-3"
                              />
                            </div>
                            <div className="pt-1">
                              <p
                                className="fw-bold mb-0"
                                style={{ color: "#000000" }}
                              >
                                Ben Smith
                              </p>
                              <p className="small text-muted">
                                Your work is Complete.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-muted mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                    </Scrollbar>
                  </div>
                </Col>
                <Col md="6" lg="7" xl="8">
                  <Scrollbar
                    suppressScrollX
                    style={{ position: "relative", height: "40em" }}
                    className="pt-3 pe-3"
                  >
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={Aisu}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          Hi there! I'm having some issues with my electrical
                          outlets. They're not working properly.
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p
                          className="small p-2 me-3 mb-1 text-white rounded-3"
                          style={{ backgroundColor: "#292D32" }}
                        >
                          I'd be happy to help. Can you provide me with more
                          details about the problem? Have you noticed any
                          specific patterns?
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={cus3}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={Aisu}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          It seems like some outlets in the living room aren't
                          providing power, while others are working fine. I've
                          checked the circuit breaker, but it hasn't solved
                          the issue.
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p
                          className="small p-2 me-3 mb-1 text-white rounded-3"
                          style={{ backgroundColor: "#292D32" }}
                        >
                          Thanks for letting me know. It could be a wiring
                          problem or a faulty outlet. I recommend not using
                          those outlets for safety reasons. I can come by
                          tomorrow to take a look. Does that work for you?
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={cus3}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={Aisu}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          That sounds good. What's your availability tomorrow?
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p
                          className="small p-2 me-3 mb-1 text-white rounded-3 "
                          style={{ backgroundColor: "#292D32" }}
                        >
                          I have openings in the morning between 9 AM and 12
                          PM or in the afternoon between 2 PM and 5 PM. Which
                          time slot would you prefer?
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={cus3}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                    </div>

                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src={Aisu}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: "#f5f6f7" }}
                        >
                          The morning works best for me. Let's schedule for 10
                          AM.
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p
                          className="small p-2 me-3 mb-1 text-white rounded-3 "
                          style={{ backgroundColor: "#292D32" }}
                        >
                          Great! I'll see you tomorrow at 10 AM. Please make
                          sure to clear the area around the outlets so I can
                          work comfortably. Is there anything else you'd like
                          to mention before the visit?
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src={cus3}
                        alt="avatar"
                        className="chatProImg d-flex align-self-center me-3"
                      />
                    </div>
                  </Scrollbar>
                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src={cus3}
                      alt="avatar"
                      className="chatProImg d-flex align-self-center me-3"
                    />
                    <div className="d-flex border align-items-center rounded-3 px-3"
                      style={{ width: "100%" }}>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput2"
                        placeholder="Type message"
                      />
                      <a className="ms-1 text-muted" href="#!">
                        <i
                          className="fa-solid fa-paperclip"
                          style={{
                            color: "#292D32",
                          }}
                        ></i>
                      </a>
                      <a className="ms-3 text-muted" href="#!">
                        <i
                          className="fa-solid fa-face-smile"
                          style={{
                            color: "#292D32",
                          }}
                        ></i>
                      </a>
                      <a className="ms-3" href="#!">
                        <i
                          className="fa-solid fa-paper-plane"
                          style={{
                            color: "#292D32",
                          }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatApp;