import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../../../style/Customer/PostVacancyForm.css";
import BgImage from "../../../assets/images/header/Background.png";
import { BsCloudUpload } from "react-icons/bs";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const response = sessionStorage.getItem("authenticatedUser");
const userData = JSON.parse(response);

function PostJobForm() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const [selectedDuration, setSelectedDuration] = useState("");

  const [selectedAdImages, setSelectedAdImages] = useState([]);

  const handleAdimages = (event) => {
    const selectedImages = Array.from(event.target.files);

    if (selectedAdImages.length + selectedImages.length <= 3) {
      setSelectedAdImages((prevSelectedAdImages) => [
        ...prevSelectedAdImages,
        ...selectedImages,
      ]);
    } else {
      alert("You can only select up to 3 files.");
    }
  };

  const handleRemoveAdImages = (index) => {
    const updatedAdImages = selectedAdImages.filter((_, i) => i !== index);
    setSelectedAdImages(updatedAdImages);
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);

    // Capture the selected location and update jobData
    if (event.target.name === "joblocation") {
      inputJobdata(event.target.name, event.target.value);
    }
    if (event.target.name === "servicename") {
      inputJobdata(event.target.name, event.target.value);
    }
  };

  const [isSubmitted, setIsSubmitted] = useState(false); // State to manage the alert

  const inputJobdata = (name, value) => {
    setJobData((prev) => ({ ...prev, [name]: value }));
    //console.log(hotelData);
  };

  const [jobData, setJobData] = useState({
    jobtitle: "",
    duedate: "",
    posteddate: new Date().toISOString().split("T")[0],
    servicename: "",
    jobstatus: "",
    jobdescription: "",
    joblocation: "",
    vacancytype: "",
    qualifications: "",
    responsibilities: "",
    isquotation: "",
   
  });

  const handleAddJob = async (e) => {
    e.preventDefault();
    const updatedImages = [];

    const formData = new FormData();

    // Append each selected image file to the FormData object

    for (const imageFile of selectedAdImages) {
      formData.append("jobsImages", imageFile);
    }
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    if (selectedDuration === "Long_term") {
      formData.append("vacancytitle", jobData.jobtitle);
      formData.append("vacancydescription", jobData.jobdescription);
      formData.append("posteddate", jobData.posteddate);
      formData.append("duedate", jobData.posteddate);
      formData.append("vacancylocation", jobData.joblocation);
      formData.append("servicename", jobData.servicename);
      formData.append("vacancytype", jobData.vacancytype);
      formData.append("qualifications", jobData.qualifications);
      formData.append("responsibilities", jobData.responsibilities);
      formData.append("userId", userData.userid);

      axios
        .post("http://localhost:8080/auth/createvacancies", formData)
        .then((response) => {
          console.log("created successfully!", response.data);
          setIsSubmitted(true);
          window.location.reload();
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error("Failed to create ad", error);
        });
    } else {
      formData.append("jobtitle", jobData.jobtitle);
      formData.append("posteddate", jobData.posteddate);
      formData.append("duedate", jobData.duedate);
      formData.append("joblocation", jobData.joblocation);
      formData.append("servicename", jobData.servicename);
      formData.append("jobdescription", jobData.jobdescription);
      formData.append("userId", userData.userid);
      formData.append("isquotation", jobData.isquotation);

      axios
        .post("http://localhost:8080/auth/createjobs", formData)
        .then((response) => {
          console.log("created successfully!", response.data);
          setIsSubmitted(true);
          window.location.reload();
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error("Failed to create ad", error);
        });
    }
    // if (response.status === 200) {
    //     console.log(jobData);
    //     // window.location.reload();
    //     setIsSubmitted(true);
    //     console.log("okkkk");
    // }
  };

  return (
    <div className="card2">
      <div
        className="back-button"
        onClick={handleBackClick}
        style={{ marginLeft: "10px" }}
      >
        <div className="back-icon">
          <i className="bi bi-arrow-left-circle-fill fs-3"></i>
        </div>
        <div className="back-text">
          <p className="m-0 p-0">Back</p>
        </div>
      </div>
      <div
        className="VacancyForm-container"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        <h3>Job Creation Form</h3>
        <br></br>
        <form className="vacancy-form">
          {/* Display the success alert when isSubmitted is true */}
          {isSubmitted && (
            <Alert variant="success">Form submitted successfully!</Alert>
          )}
          <div className="vacancy-form-group">
            <Row>
              <Col className="col-4">
                <label for="title">
                  Title <span style={{ color: "red" }}>&nbsp;*</span>{" "}
                </label>
              </Col>
              <Col className="col-6">
                <input
                  type="text"
                  name="jobtitle"
                  value={jobData.jobtitle}
                  onChange={(e) => {
                    inputJobdata(e.target.name, e.target.value);
                  }}
                  className="form-control"
                  id="title"
                  placeholder="Enter the title"
                />
              </Col>
            </Row>
          </div>
          <div className="vacancy-form-group">
            <label for="description">
              Description <span style={{ color: "red" }}>&nbsp;*</span>{" "}
            </label>
            <input
              type="text"
              name="jobdescription"
              value={jobData.jobdescription}
              onChange={(e) => {
                inputJobdata(e.target.name, e.target.value);
              }}
              className="form-control"
              id="description"
              placeholder="Enter your job details here"
            />
          </div>
          <div className="vacancy-form-group">
            <Row>
              <Col className="col-4">
                <label for="duedate">
                  Due Date <span style={{ color: "red" }}>&nbsp;*</span>{" "}
                </label>
              </Col>
              <Col className="col-6">
                {" "}
                <input
                  type="date"
                  name="duedate"
                  value={jobData.duedate}
                  onChange={(e) => {
                    inputJobdata(e.target.name, e.target.value);
                  }}
                  className="form-control"
                  id="duedate"
                />
              </Col>
            </Row>
          </div>
          <div className="vacancy-form-group">
            <Row>
              <Col className="col-4">
                <label htmlFor="Service_name">
                  {" "}
                  Location <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col className="col-6">
                <Form.Group className="mb-3">
                  <Form.Select
                    id="disabledSelect"
                    className="select-small-text"
                    name="joblocation" // Add the name attribute here
                    value={jobData.joblocation}
                    onChange={handleDurationChange}
                  >
                    <option value="" disabled>
                      Select a location
                    </option>
                    <option value="Ampara">Ampara</option>
                    <option value="Anuradhapura">Anuradhapura</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Batticaloa">Batticaloa</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Galle">Galle</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Hambantota">Hambantota</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Kalutara">Kalutara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kegalle">Kegalle</option>
                    <option value="Kilinochchi">Kilinochchi</option>
                    <option value="Kurunegala">Kurunegala</option>
                    <option value="Mannar">Mannar</option>
                    <option value="Matale">Matale</option>
                    <option value="Matara">Matara</option>
                    <option value="Monaragala">Monaragala</option>
                    <option value="Mullaitivu">Mullaitivu</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Polonnaruwa">Polonnaruwa</option>
                    <option value="Puttalam">Puttalam</option>
                    <option value="Ratnapura">Ratnapura</option>
                    <option value="Trincomalee">Trincomalee</option>
                    <option value="Vavuniya">Vavuniya</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="vacancy-form-group">
            <Row>
              <Col className="col-4">
                <label htmlFor="Service_name">
                  {" "}
                  Service <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col className="col-6">
                <Form.Group className="mb-3">
                  <Form.Select
                    id="disabledSelect"
                    className="select-small-text"
                    name="servicename" // Add the name attribute here
                    value={jobData.servicename}
                    onChange={handleDurationChange}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="AC_Repair">AC Repair</option>
                    <option value="Electrical_Wiring">Electrical Wiring</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Masonry">Masonry</option>
                    <option value="Tiles_Fitting">Tiles Fitting</option>
                    <option value="Iron_Works">Iron Works</option>
                    <option value="Glass_Aluminum">Glass Aluminum</option>
                    <option value="CCTV_Repair">CCTV Repair</option>
                    <option value="Fire_Alarm">Fire Alarm</option>
                    <option value="Video_Surveillance">
                      Video Surveillance
                    </option>
                    <option value="Sofa_cleaning">Sofa cleaning</option>
                    <option value="Carpet_cleaning">Carpet cleaning</option>
                    <option value="none">None</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="vacancy-form-group">
            <Row>
              <Col className="col-4">
                <label htmlFor="Duration">
                  {" "}
                  Duration <span style={{ color: "red" }}>*</span>
                </label>
              </Col>
              <Col className="col-6">
                <Form.Group className="mb-3">
                  <Form.Select
                    id="durationSelect"
                    className="select-small-text"
                    defaultValue=""
                    onChange={handleDurationChange}
                  >
                    <option value="" disabled>
                      Select a duration period
                    </option>
                    <option value="Long_term">Long term</option>
                    <option value="Short_term">Short term</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {selectedDuration === "Long_term" && (
            <div className="vacancy-form-group">
              <div className="vacancy-form-group">
                <Row>
                  <Col className="col-4">
                    <label htmlFor="category">
                      Employment Type <span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col className="col-6">
                    <Form.Group className="mb-3">
                      <Form.Select
                        id="category"
                        className="select-small-text"
                        name="vacancytype" // Change this to "vacancytype" to match your data structure
                        value={jobData.vacancytype}
                        onChange={(e) => {
                          inputJobdata(e.target.name, e.target.value);
                        }}
                      >
                        <option value="Full_Time">Full Time</option>
                        <option value="Hours_based">Hours based</option>
                        <option value="none">None</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="vacancy-form-group">
                <Row>
                  <Col className="col-4">
                    <label htmlFor="title">
                      Skill & Qualification Expect{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col className="col-6">
                    <input
                      type="text"
                      name="qualifications"
                      value={jobData.qualifications}
                      onChange={(e) => {
                        inputJobdata(e.target.name, e.target.value);
                      }}
                      className="form-control"
                      id="qualifications"
                    />
                  </Col>
                </Row>
              </div>

              <div className="vacancy-form-group">
                <Row>
                  <Col className="col-4">
                    <label htmlFor="title">
                      Responsibilities Expect{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                  </Col>
                  <Col className="col-6">
                    <input
                      type="text"
                      name="responsibilities"
                      value={jobData.responsibilities}
                      onChange={(e) => {
                        inputJobdata(e.target.name, e.target.value);
                      }}
                      className="form-control"
                      id="responsibilities"
                    />
                  </Col>
                </Row>
              </div>
            </div>
          )}
          {selectedDuration === "Short_term" && (
            <div className="vacancy-form-group">
              <Row>
                <Col className="col-4">
                  <label htmlFor="isquotation">
                    Quotation Selection <span style={{ color: "red" }}>*</span>
                  </label>
                </Col>
                <Col className="col-6">
                  <select
                    name="isquotation"
                    value={jobData.isquotation}
                    onChange={(e) => {
                      inputJobdata(e.target.name, e.target.value);
                    }}
                    className="form-select"
                  >
                    <option value="">Select an option</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </Col>
              </Row>
            </div>
          )}
          <div className="mb-3">
            <p className="mb-0">
              Upload Item Images (Maximum 3 Images){" "}
              <sup>
                <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
              </sup>
            </p>

            <input
              type="file"
              onChange={handleAdimages}
              multiple
              accept=".jpg, .jpeg, .png"
              className="BrowseImageInput form-control"
            />

            {/* {AdImageInputErr && (
              <p className="px-3 text-danger">
                Please select one or more files.
              </p>
            )} */}

            {selectedAdImages.length > 0 && (
              <div className="p-3 d-flex gap-3">
                <p>Selected Files:</p>
                <ul>
                  {selectedAdImages.map((file, index) => (
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <li key={index}>{file.name}</li>
                      <i
                        className="fa-solid fa-trash fa-lg AddeleteImg"
                        onClick={() => handleRemoveAdImages(index)}
                      ></i>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Row className="vacancy-form-group-buttons mt-3">
            <Col>
              <button
                method="POST"
                onClick={handleAddJob}
                type="submit"
                value="Send"
                className="btn btn-vacancy-form-k"
              >
                Submit
              </button>
            </Col>
            <Col>
              <a id="cancel-link" href="#">
                <button>Cancel</button>
              </a>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}

export default PostJobForm;
