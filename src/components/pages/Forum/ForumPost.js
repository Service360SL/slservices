import React from "react";
import { Image } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

import "../../../style/advertiser/AdIndex.css";

import backgroundImage from "../../../assets/images/header/Background.png";


const ForumPost = ({
  profileIcon,
  forumImage,
  username,
  title,
  description,
  category,
  date,
  views,
  likes,
  answers,
}) => {
  return (
    <div
      className="border rounded shadow-sm d-flex SingleForumCont"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Row>
        <Col xs={2} md={2} className="forumImage">
          <Image src={forumImage} alt="Main image" fluid rounded />
        </Col>
        <Col>
          <Row>
            <Col className="d-flex align-items-center ">
              <div>
                <img
                  src={profileIcon}
                  alt="Profile of Advertiser"
                  roundedCircle
                  className="AdProfilePic"
                />
              </div>
              <div className="namediv">
                <p>{username}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <p className="Forumtitle">{title}</p>
          </Row>
          <Row>
            <p className="Forumtitle">{description}</p>
          </Row>

          <Row>
            <div className="forumFotter">
              <div className="d-flex gap-3 justify-content-end">
                <div>{date}</div>
                <div>{views}Views</div>
                <div>{likes} Likes</div>
                <div>{answers} Answers</div>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ForumPost;