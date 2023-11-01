import React, { useState } from "react";
import { Row, Col, Form, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import profileIcon from "../../../../assets/images/header/user.jpg";
import styled from "styled-components";

const EditProfile = (props) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const [showMore, setShowMore] = useState(false);

  const showHidePassword = () => {
    if (isPasswordHidden) {
      setPasswordType("text");
      setIsPasswordHidden(false);
    } else {
      setPasswordType("password");
      setIsPasswordHidden(true);
    }
  };

  const showHidenPassword = () => {
    setIsPasswordHidden((prev) => !prev);
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const StyledButton = styled.button`
    background-color: #292d32;
    
    @media (max-width: 768px) {
      width: 100%;
      margin-top: 1rem;
    }
    &:hover {
      background: #fff;
      border-color: #2596be;
      color: #9f390d;
    }
  `;

  const StyledButton1 = styled.button`
    background-color: #292d32;
    
    @media (max-width: 768px) {
      width: 100%;
      margin-top: 1rem;
    }
    &:hover {
      background: #fff;
      border-color: #2596be;
      color: #9f390d;
    }
  `;

  const StyledButton3 = styled.button`
  background-color: #292d32;
 
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
  }
  &:hover {
    background: #fff;
    border-color: #2596be;
    color: #9f390d;
  }
`;

  return (
    <Container>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "#282b3d", color: "#fff" }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            My Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form className="p-3 m-3">
              <div className="d-flex justify-content-center mt-3">
                <img
                  src={profileIcon}
                  alt="Profile"
                  className="abc"
                  style={{

                    width: "auto",
                    height: "120px",
                    borderRadius: "100%",
                  }}
                />
                <div className="d-flex justify-content-end align-items-end align-self-end">
                  <i class="bi bi-plus-circle-fill fs-4" > </i>
                </div>
              </div>

              <div className="mt-5">
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control placeholder="Sinnaththamby" />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control placeholder="Mithilan" />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="mt-3">
                <Row>
                  <Form.Group>
                    <Form.Label>Residential Address</Form.Label>
                    <Form.Control placeholder="Kachchai South Kodikamam" />
                  </Form.Group>
                </Row>
              </div>

              <div className="mt-3">
                <Row>
                  <Form.Group>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control type="tel" placeholder="+94 775794064" />
                  </Form.Group>
                </Row>
              </div>

              <div className="mt-3">
                <Row>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label> Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="mithilan999@gmail.com"
                      readOnly
                    />
                  </Form.Group>
                </Row>
              </div>

              <>
                <div className="mt-3">
                  <Row>
                    <div>
                      <p className="mb-0">Current Password</p>
                      <div className="input-group">
                        <input
                          type={passwordType}
                          className="form-control"
                          placeholder="Enter Your Current Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <span className="input-group-text">
                          <button
                            className="btn btn-outline-dark border-0 focus-visible"
                            type="button"
                            id="button-addon1"
                            onClick={showHidePassword}
                          >
                            {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                          </button>
                        </span>
                      </div>
                    </div>
                  </Row>

                  {showMore && (
                    <>
                      <Row>
                        <div className="mt-3">
                          <p className="mb-0">New Password</p>
                          <div className="input-group">
                            <input
                              type={passwordType}
                              className="form-control"
                              placeholder="Enter Your New Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <span className="input-group-text">
                              <button
                                className="btn btn-outline-dark border-0 focus-visible"
                                type="button"
                                id="button-addon1"
                                onClick={showHidePassword}
                              >
                                {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                              </button>
                            </span>
                          </div>
                        </div>
                      </Row>

                      <Row>
                        <div className="mt-3">
                          <p className="mb-0">Confirm Password</p>
                          <div className="input-group">
                            <input
                              type={passwordType}
                              className="form-control"
                              placeholder="Enter Confirm Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <span className="input-group-text">
                              <button
                                className="btn btn-outline-dark border-0 focus-visible"
                                type="button"
                                id="button-addon1"
                                onClick={showHidePassword}
                              >
                                {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                              </button>
                            </span>
                          </div>
                        </div>
                      </Row>
                    </>
                  )}

                  <div className="mt-3">
                    <StyledButton3 className="btn btn-dark btn-block" type="button" onClick={() => setShowMore((prev) => !prev)}>
                      {showMore ? 'Show Less' : 'Change Password'}
                    </StyledButton3>
                  </div>
                </div>
              </>

              <div
                className="mt-5 d-flex justify-content-between"

              >
                <Button className="btn-effect3" type="button">
                  Edit
                </Button>

                <Button className="btn-effect2" type="button">
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditProfile;