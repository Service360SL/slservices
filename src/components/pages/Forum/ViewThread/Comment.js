import React from "react";
import { Modal, Form } from "react-bootstrap";

import "../../../../style/advertiser/AdIndex.css";

import backgroundImage from "../../../../assets/images/header/Background.png";
import userProfileIcon from "../../../../assets/images/advertiser/proAd.jpg";


const Comment = (props) => {
  const { commentData } = props;
  console.log(commentData[0]);

  if (!commentData || commentData.length === 0) {
    return (
      <div>
        <p>No comments available.</p>
      </div>
    );
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#292D32" }}>
          <Modal.Title id="contained-modal-title-vcenter">
            <p className="AskQPop">Comments</p>
          </Modal.Title>
        </Modal.Header>
        <div
          className="InnerCreateForum"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Form>
            <fieldset>
              {commentData.map((comment) => (
                <div key={comment.id}>
                  <div>
                    <div className="d-flex align-items-center  ">
                      <div>
                        <img
                          src={comment.profileIcon}
                          alt="Comment User"
                          className="AdProfilePic"
                        />
                      </div>
                      <div className="namediv text-muted">
                        <p className="small">{comment.author}</p>
                      </div>
                    </div>

                    <div
                      className="p-3 ms-3 mb-1  border shadow-sm  rounded"
                      style={{ backgroundColor: "#f5f6f7" }}
                    >
                      {comment.content}
                    </div>
                    <div className="d-flex justify-content-end text-muted">
                      <p style={{ fontSize: "x-small" }}>{comment.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                <img
                  src={userProfileIcon}
                  alt="User Profile"
                  className="AdProfilePic m-2"
                />
                <input
                  type="text"
                  className="form-control form-control-lg ForummessageInput"
                  id="exampleFormControlInput2"
                  placeholder="Type message"
                />
                <a className="ms-3" href="#!">
                  <i
                    className="fa-solid fa-paper-plane fa-lg"
                    style={{ color: "#292D32" }}
                  ></i>
                </a>
              </div>
            </fieldset>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Comment;