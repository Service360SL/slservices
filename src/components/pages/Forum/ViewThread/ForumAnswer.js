import React, { useState } from "react";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";

import VideoPopup from "./VideoPopup";
import Comment from "./Comment";

import profileIcon1 from "../../../../assets/images/advertiser/Adam.jpg";
import profileIcon2 from "../../../../assets/images/advertiser/sara.jpg";
import profileIcon3 from "../../../../assets/images/advertiser/aishu.jpg";

const ForumAnswer = ({
  id,
  profileIcon,
  forumImage,
  username,
  title,
  description,
  date,
  views,
  likes,
}) => {
  const [VideoModalShow, setVideoModalShow] = useState(false);
  const [CommentModalShow, setCommentModalShow] = useState(false);
  const liked = false;




  const commentData = [
    {
      id: 1,
      author: "John Doe",
      content: "This is the first comment.",
      timestamp: "2023-08-05 12:34:56",
      profileIcon: profileIcon1,
    },
    {
      id: 2,
      author: "Jane Smith",
      content: "I agree with John.",
      timestamp: "2023-08-05 13:45:32",
      profileIcon: profileIcon2,
    },
    {
      id: 3,
      author: "Michael Johnson",
      content: "Nice post!",
      timestamp: "2023-08-05 14:20:10",
      profileIcon: profileIcon3,
    },
  ];

  return (
    <div className="p-3" key={id}>
      <hr></hr>
      <div className="ForumHeader d-flex  justify-content-between">
        <div className="d-flex align-items-center">
          <div>
            <img
              src={profileIcon}
              alt="Profile of Advertiser"
              className="AdProfilePic"
            />
          </div>
          <div className="namediv">
            <p>{username}</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <p>Posted on {date}</p>
        </div>
      </div>
      <div>
        <h3>{title}</h3>
      </div>

      <div>
        <p>{description}</p>
      </div>

      <div>
        <div className="d-flex align-items-center justify-content-center gap-2">
          {forumImage.map((image) => (
            <div>
              <Image
                src={image}
                alt="Related"
                thumbnail
                fluid
                className="ForumQImg"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 gap-3">
        <div>
          <h4>Check This Video</h4>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div>
            <p style={{ all: "unset" }}>How to install AC </p>
          </div>
          <div className="btn" onClick={() => setVideoModalShow(true)}>
            {/* <i
              class="fa-brands fa-youtube fa-2xl"
              style={{ color: "#bb0707" }}
            ></i> */}

            <button
              className="btn btn-sm"
              style={{
                backgroundColor: "#292D32",
                color: "#ffffff",
                height: "fit-content",
              }}
              size="sm"
            >
              Watch
            </button>
          </div>
        </div>
        <div>
          <VideoPopup
            show={VideoModalShow}
            onHide={() => setVideoModalShow(false)}
          />
        </div>
        <div className="d-flex justify-content-center">
          <hr className="w-50" />
        </div>
        <div className="d-flex justify-content-around align-items-start mt-3 ">
          <hr />
          <div style={{ cursor: "pointer" }}>
            {liked ? (
              <i
                className="fa-light fa-thumbs-up fa-lg"
                style={{ color: "#292D32" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-thumbs-up fa-lg"
                style={{ color: "#292D32" }}
              ></i>
            )}
            <p className="text-muted">{likes}</p>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setCommentModalShow(true)}
          >
            <i
              className="fa-solid fa-comments fa-lg"
              style={{ color: "#292D32" }}
            ></i>
            <p className="text-muted">10</p>
          </div>
          <div style={{ cursor: "pointer" }}>
            {liked ? (
              <i
                className="fa-light fa-thumbs-down fa-lg"
                style={{ color: "#292D32" }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-thumbs-down fa-lg"
                style={{ color: "#292D32" }}
              ></i>
            )}
            <p className="text-muted">{likes}</p>
          </div>

          <Comment
            commentData={commentData}
            show={CommentModalShow}
            onHide={() => setCommentModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ForumAnswer;