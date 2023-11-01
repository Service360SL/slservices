import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import TextEditor from "./TextEditor";
import { Col, Row } from "react-bootstrap";

const CreateAns = (props) => {
  console.log(props);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#292D32" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="AskQPop">Your Answer</p>
        </Modal.Title>
      </Modal.Header>
      <div className="InnerCreateForum">
        <Form>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">
                Title
                <sup>
                  <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                </sup>
              </Form.Label>
              <Form.Control
                id="disabledTextInput"
                required
                placeholder="Title"
              />
            </Form.Group>

            <div className="mb-3">
              <p className="mb-0">Upload Releated Pictures ( Not required )</p>
              <input type="file" className="form-control" multiple required />
            </div>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <TextEditor />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">
                <i
                  className="fa-brands fa-youtube fa-2xl"
                  style={{ color: "#ff0000" }}
                ></i>
                &nbsp;Youtube Link
              </Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    id="disabledTextInput"
                    required
                    placeholder="Video Name"
                  />
                </Col>
                <Col>
                  <Form.Control
                    id="disabledTextInput"
                    required
                    placeholder="Link (https://www.youtube.com/)"
                  />
                </Col>
              </Row>
            </Form.Group>

            <div className="d-flex justify-content-center">
              <button className="PostAd">Post</button>
            </div>
          </fieldset>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateAns;