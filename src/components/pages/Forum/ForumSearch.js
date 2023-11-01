import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const ForumSearch = () => {
  return (
    <Form>
      <fieldset>
        <Row className="AdsSearchRow">
          <h1>Search Questions</h1>
          <Col>
            <Form.Group className="mb-3">
              <Form.Control id="disabledTextInput" placeholder="Search" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select>
                <option>Select Category</option>
                <option>Electricial</option>
                <option>Plumbing</option>
                <option>Mechanical</option>
                <option>Tiles</option>
                <option>Carpentary</option>
                <option>Painting</option>
                <option>Glass And Aluminium Fiting</option>
                <option>iron Works</option>
                <option>CCTV</option>
                <option>Fire Alarm</option>
                <option>Video Surveillance</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select>
                <option>Newest</option>
                <option>Oldest</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </fieldset>
    </Form>
  );
};

export default ForumSearch;