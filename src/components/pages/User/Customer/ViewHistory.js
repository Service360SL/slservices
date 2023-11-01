import React, { useState } from "react";
import { Container, Form, Table, Row, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BgImage from "../../../../assets/images/header/Background.png";
import { FaSearch } from "react-icons/fa";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCalendarAlt);
const CustomerHistory = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const [data, setData] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setData((prevState) => ({
      ...prevState,
      searchTerm: value,
    }));
  };

  return (
    <Container>
      <Form>
        <div
          className="block serviceProvider py-3"
          style={{ backgroundImage: `url(${BgImage})` }}
        >
          <h2 className="ms-5 fw-bold align-self-start">CustomerHistory</h2>
          <div className="d-flex justify-content-center w-100">
            <Row className="d-flex justify-content-around">
              <Col>
                <div className="input-group">
                  <DatePicker
                    className="form-control"
                    selected={startDate}
                    onChange={handleStartDateChange}
                    placeholderText="From Date"
                    dateFormat="dd/MM/yyyy"
                  />
                  <span className="input-group-text">
                    <i class="bi bi-calendar2-week"></i>
                  </span>
                </div>
              </Col>
              <Col>
                <div className="input-group">
                  <DatePicker
                    className="form-control"
                    selected={endDate}
                    onChange={handleEndDateChange}
                    placeholderText="To Date"
                    dateFormat="dd/MM/yyyy"
                    minDate={startDate}
                  />
                  <span className="input-group-text">
                    <i class="bi bi-calendar2-week"></i>
                  </span>
                </div>
              </Col>

              <Col>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Search Services"
                    onChange={handleSearchChange}
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </div>
          <div
            className="mt-4 d-flex flex-column w-100"
            style={{ width: "100%" }}
          >
            <Container className="table-responsive">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Service Provider Name</th>
                    <th>Date</th>
                    <th>Event</th>
                    <th>Service Type</th>
                    <th>Service Status</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>AcRepaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the Air Conditioner</td>
                    <td>Ac Repaire</td>
                    <td>Finished</td>
                    <td>Finished</td>
                  </tr>
                  <tr>
                    <td>Pranavan</td>
                    <td>
                      {" "}
                      12/07/2023 <br /> 9.00am
                    </td>
                    <td>Change the wire for full house</td>
                    <td>Electrical Wiring</td>
                    <td>Pending</td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </Table>
            </Container>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default CustomerHistory;