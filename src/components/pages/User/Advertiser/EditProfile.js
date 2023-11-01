import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import profileIcon from "../../../../assets/images/header/user.jpg";
import '../../../../style/User/Advertiser/EditProfile.css';

const AdvertiserProfile = () => {
  const formStyle = {
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
    padding: "50px",
    borderRadius: "20px",
  };

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [passwordType, setPasswordType] = useState("password");
  const [password, setPassword] = useState("");
  const showHidePassword = () => {
    if (isPasswordHidden) {
      setPasswordType("text");
      setIsPasswordHidden(false);
    } else {
      setPasswordType("password");
      setIsPasswordHidden(true);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    // <Container>
    <Form className="aForm" style={formStyle}>
      <div className="aTopProfile">
        <Form.Group className="aProfile">
          <Form.Label>Profile</Form.Label>
        </Form.Group>

        <Form.Group
          controlId="formBasicProfilePicture"
          className="profile-picture-group"
        >
          <Form.Label className="aProfile-picture-label">
            Choose Profile Picture
          </Form.Label>
          <img
            src={profileIcon}
            alt="Profile"
            className="aProfileIcon"
            style={{ width: "120px", height: "120px" }}
          />
        </Form.Group>
      </div>

      {/* <div className='start'> */}
      <div className="aname-container">
        <Form.Group className="afName">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Sinnaththamby" style={{ width: "px" }} />
        </Form.Group>

        <Form.Group className="alName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Mithilan" style={{ width: "px" }} />
        </Form.Group>
      </div>

      <Form.Group className="storeName">
        <Form.Label>Store Name</Form.Label>
        <Form.Control placeholder="Jal Store" style={{ width: "px" }} />
      </Form.Group>

      <Form.Group className="aaddress">
        <Form.Label>Store Address</Form.Label>
        <Form.Control placeholder="Kachchai South Kodikamam" />
      </Form.Group>

      <Form.Group className="acontactNumber">
        <Form.Label>Contact Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="+94 775794064"

        />
      </Form.Group>

      <Form.Group className="amail" controlId="formBasicEmail">
        <Form.Label>Current Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="mithilan999@gmail.com"

          readOnly
        />
      </Form.Group>

      <div className="aword">
        <p className="mb-0">Current Password</p>
        <div className="input-group ">
          <input
            type={passwordType}
            className="form-control"
            placeholder="Enter Your Current Password"
            // style={{width:"870px"}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="input-group-text">
            <button
              className="btn btn-outline-dark border-0 focus-visible" // Add focus-visible class here
              type="button"
              id="button-addon1"
              onClick={showHidePassword}
            >
              {isPasswordHidden ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
          </span>
        </div>
      </div>

      <div className="anewWord">
        <p className="mb-0">New Password</p>
        <div className="input-group ">
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
              className="btn btn-outline-dark border-0 focus-visible" // Add focus-visible class here
              type="button"
              id="button-addon1"
              onClick={showHidePassword}
            >
              {isPasswordHidden ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
          </span>
        </div>
      </div>

      <div className="aconfirmWord">
        <p className="mb-0">Confirm Password</p>
        <div className="input-group ">
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
              className="btn btn-outline-dark border-0 focus-visible" // Add focus-visible class here
              type="button"
              id="button-addon1"
              onClick={showHidePassword}
            >
              {isPasswordHidden ? (
                <i className="bi bi-eye-slash-fill"></i>
              ) : (
                <i className="bi bi-eye-fill"></i>
              )}
            </button>
          </span>
        </div>
      </div>

      <div className="abutton">
        <Button className="aedit" variant="primary" type="submit">
          Edit
        </Button>

        <Button className="acancel" variant="primary" type="submit">
          Cancel
        </Button>
      </div>
    </Form>
    // </Container>
  );
};

// heellokvsknv\

export default AdvertiserProfile;