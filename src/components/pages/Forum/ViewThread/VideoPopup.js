import React from "react";
import { Modal } from "react-bootstrap";

const VideoPopup = (props) => {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton style={{ backgroundColor: "#292D32" }}>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="d-flex align-items-center"
        >
          <p className="AskQPop">Watch Video</p>
        </Modal.Title>
      </Modal.Header>

      <div className="InnerCreateForum">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/9nbK1FFBC7U"
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>

    </Modal>
  );
};

export default VideoPopup;