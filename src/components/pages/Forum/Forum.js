import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import ForumSearch from "./ForumSearch";
import ForumPost from "./ForumPost";
import PageNumber from "./PageNumber";
import ForumPopUp from "./CreateThread/CreateThread.js";

import ForumImage from "../../../assets/images/forum/AC.jpg";
import profileIcon from "../../../assets/images/advertiser/Adam.jpg";
import "../../../style/advertiser/AdIndex.css";

import backgroundImage from "../../../assets/images/header/Background.png";

function Forum() {
  const [modalShow, setModalShow] = useState(false);

  const posts = [
    {
      profileIcon: profileIcon,
      forumImage: ForumImage,
      username: "Adam",
      title: "How to install AC",
      description:
        "I want to install a window AC unit in my room with mounting brackets. Need a step-by-step guide, safety precautions, and cooling tips. Thanks!",
      category: "Electrical",
      date: "3 days ago",
      views: 252,
      likes: 100,
      answers: 18,
    },
    {
      profileIcon: profileIcon,
      forumImage: ForumImage,
      username: "Adam",
      title: "How to install AC",
      description:
        "I want to install a window AC unit in my room with mounting brackets. Need a step-by-step guide, safety precautions, and cooling tips. Thanks!",
      category: "Electrical",
      date: "3 days ago",
      views: 252,
      likes: 100,
      answers: 18,
    },
    {
      profileIcon: profileIcon,
      forumImage: ForumImage,
      username: "Adam",
      title: "How to install AC",
      description:
        "I want to install a window AC unit in my room with mounting brackets. Need a step-by-step guide, safety precautions, and cooling tips. Thanks!",
      category: "Electrical",
      date: "3 days ago",
      views: 252,
      likes: 100,
      answers: 18,
    },
    {
      profileIcon: profileIcon,
      forumImage: ForumImage,
      username: "Adam",
      title: "How to install AC",
      description:
        "I want to install a window AC unit in my room with mounting brackets. Need a step-by-step guide, safety precautions, and cooling tips. Thanks!",
      category: "Electrical",
      date: "3 days ago",
      views: 252,
      likes: 100,
      answers: 18,
    },
  ];

  return (
    <Container>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="p-4"
      >
        <div>
          <h1>Forum</h1>
        </div>
        <div className="d-flex justify-content-center">
          <button className="PostAd" onClick={() => setModalShow(true)}>
            Ask Question
          </button>
        </div>
        <ForumPopUp show={modalShow} onHide={() => setModalShow(false)} />
        <br />
        <div>
          <ForumSearch />
        </div>
      </div>
      <div className="ForumDiv p-3">
        <h3>368 Questions</h3>
        {posts.map((post, index) => (
          <Link to={`/ServiceProvider/ViewThread/`} key={index}>
            <ForumPost {...post} />
          </Link>
        ))}
      </div>
      <br />
      <div className="d-flex justify-content-center">
        <PageNumber />
      </div>
    </Container>
  );
}

export default Forum;
