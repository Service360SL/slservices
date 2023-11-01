import React, { useState } from "react";
import { Container } from "react-bootstrap";

import ForumQuestion from "./ForumQuestion";
import ForumAnswer from "./ForumAnswer";
import CreateAns from "./CreateAns";
// import PageNumber from "../PageNumber";

import ForumImage from "../../../../assets/images/forum/AC.jpg";
import profileIcon from "../../../../assets/images/advertiser/Adam.jpg";
import backgroundImage from "../../../../assets/images/header/Background.png";

import AnswerPro from "../../../../assets/images/advertiser/proAd.jpg";
import sara from "../../../../assets/images/advertiser/sara.jpg";

import Ans1 from "../../../../assets/images/forum/Ans1.jpg";
import Ans2 from "../../../../assets/images/forum/Ans2.png";
import Ans3 from "../../../../assets/images/forum/Ans3.jpg";
import Ans4 from "../../../../assets/images/forum/Ans4.jpeg";

import "../../../../style/advertiser/AdIndex.css";

const ViewThread = () => {
  const [AnsModalShow, setAnsModalShow] = useState(false);
  const AnsImages1 = [Ans1, Ans2];
  const AnsImages2 = [Ans4, Ans3];

  const Question = [
    {
      id: 1,
      profileIcon: profileIcon,
      forumImage: ForumImage,
      username: "Adam",
      title: "How to install AC",
      description:
        "I am currently planning to install a window AC unit in my room and would greatly appreciate a comprehensive step-by-step guide to ensure a successful and hassle-free installation. The guide should cover all aspects of mounting the AC unit using brackets, from selecting the ideal location to securely attaching the unit for maximum stability and performance. Safety is of utmost importance, so I'm eager to learn essential precautions and best practices to handle electrical connections and power requirements safely. As a first-time installer, I'm also interested in cooling tips to optimize the system's efficiency, set the thermostat effectively, and maintain a comfortable indoor environment. Any insights and expertise shared would be immensely valuable to me, and I want to extend my sincere gratitude in advance for any assistance provided. Thank you kindly for your help!",
      category: "Electrical",
      date: "3 days ago",
      views: 252,
      likes: 25,
      commentsCount: 12,
      answers: 18,
    },
  ];

  const Answers = [
    {
      id: 2,
      profileIcon: AnswerPro,
      forumImage: AnsImages1,
      username: "Simith",
      title: "Follow This",
      description:
        "To install a window AC unit with mounting brackets, start by selecting a suitable location close to an electrical outlet and with sufficient window space. Clean the area, attach the mounting brackets securely to the window sill, and carefully place the AC unit on them. Secure the unit to the brackets, seal any gaps, and plug it into the electrical outlet. Prioritize safety, double-check connections, and follow the manufacturer's instructions. Once installed, set the thermostat to a comfortable temperature and keep doors and windows closed for efficient cooling. Regularly clean or replace the AC filter to maintain performance. If unsure, seek professional assistance for a safe and proper installation.",
      category: "Electrical",
      date: "31 Jul 2023",
      views: 252,
      likes: 25,
      answerCount: 18,
    },
    {
      id: 3,
      profileIcon: sara,
      forumImage: AnsImages2,
      username: "Sara Arjun",
      title: "Follow This",
      description:
        "To install a window AC unit with mounting brackets, start by selecting a suitable location close to an electrical outlet and with sufficient window space. Clean the area, attach the mounting brackets securely to the window sill, and carefully place the AC unit on them. Secure the unit to the brackets, seal any gaps, and plug it into the electrical outlet. Prioritize safety, double-check connections, and follow the manufacturer's instructions. Once installed, set the thermostat to a comfortable temperature and keep doors and windows closed for efficient cooling. Regularly clean or replace the AC filter to maintain performance. If unsure, seek professional assistance for a safe and proper installation.",
      category: "Electrical",
      date: "31 Jul 2023",
      views: 252,
      likes: 25,
      answerCount: 18,
    },
  ];




  return (
    <Container>
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="p-3"
      >
        <div>
          {Question.map((post) => (
            <ForumQuestion key={post.id} {...post} />
          ))}
        </div>
        <div className="d-flex justify-content-center pt-4">
          <button className="PostAd" onClick={() => setAnsModalShow(true)}>
            Your Answer
          </button>
        </div>
        <CreateAns show={AnsModalShow} onHide={() => setAnsModalShow(false)} />
        <div>
          <h3>{Question[0].answers} Answers</h3>
          {Answers.map((post) => (
            <ForumAnswer key={post.id} {...post} />
          ))}
        </div>

        {/* <div className="d-flex justify-content-center">
          <PageNumber />
        </div> */}
      </div>
    </Container>
  );
};

export default ViewThread;