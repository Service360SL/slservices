import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";

function JobDetails() {
  const [viewJobData, setViewJobData] = useState(null);
  const [singleJobReplies, setSingleJobReplies]=useState(null);

  const [addReplyData, setAddReplyData] = useState({
    replymessage: "",
  });

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { id } = useParams();
  const jobId = parseInt(id, 10);
 
  useEffect(() => {
    axios.get(`http://localhost:8080/auth/viewNewJobs/${jobId}`).then((res) => {
        console.log(res.data);
        setViewJobData(res.data);
    });

    axios.get(`http://localhost:8080/auth/viewJobReplies/${jobId}`).then((res) => {
      console.log(res.data);
      setSingleJobReplies(res.data);
    });
  }, []);

  if (!viewJobData) return 'No training sessions found!';

  // GETTING LOGGED IN SERVICEPROVIDER ID

  const response = sessionStorage.getItem('authenticatedUser');
  const userData = JSON.parse(response);

  const handleAddReply = () => {
    const formData = new FormData();
    formData.append('replymessage', addReplyData.replymessage);
    formData.append('serviceproviderid', userData.userid);

    axios
        .post(`http://localhost:8080/auth/AddJobReply/${jobId}`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log('Reply Added successfully:', response.data);
            setAddReplyData({ replymessage: "" });      // Clear the input field by resetting addReplyData

            // Update singleJobReplies with the newly added comment
            setSingleJobReplies([...singleJobReplies, response.data]);
        })
        .catch((error) => {
            console.error('Error Adding Reply:', error);
        });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddReplyData({
        ...addReplyData,
        [name]: value,
    });
};


  // Get all images from the job
  const jobImagesArray = viewJobData.jobimages;
      
  // Initialize an empty array to store all images
  const allImages = [];

  // Iterate through trainingSessionImagesArray
  jobImagesArray.forEach((sessionImages) => {
    // Check if the current object has an 'images' property
    if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
        // Concatenate the 'images' array to the 'allImages' array
        allImages.push(...sessionImages.images);
    }
  });

  return (
    <>
    <Row className="JobDetails-Col-container">
      <Col className="jobDetails-img-container col-12 col-lg-2 d-flex flex-column align-items-center">
        <div className="jobDetails-avatar-container mb-2">
            <img
            src={'data:image/jpeg;base64;' + viewJobData.jobs.customer.profilePic}
            alt="avatar"
            className="jobDetails-avatar rounded-circle"
            style={{ width: "50px", height: "50px" }}
            />
        </div>
        <div
          className="jobDetails-username mb-1"
          style={{ fontSize:"18px",fontFamily: "'Rubik', sans-serif" }}
        >
          {viewJobData.jobs.customer.firstname}
        </div>

      </Col>
      <Col className="jobDetails-details-container col-12 col-lg-10 d-flex flex-column">
        <div className="jobDetails-status-container mb-2">
          <span className="jobDetails-status" id="job-status" style={{fontSize:"16px",fontWeight:"400",padding:"4px 6px",border:"2px solid rgb(37, 199, 37)",borderRadius:"8px"}}>
            new
          </span>
        </div>
        <div className="jobDetails-title-container mb-2">
          <span className="back-button-service-provider" onClick={handleBackClick} style={{ marginRight:'50px', marginTop:'-40px', maxWidth: '110px', fontWeight:600, float:'right' }}>
              <i className="bi bi-arrow-left-circle-fill fs-3"></i>
              <p className="m-0 p-0 fs-5">&nbsp; Back</p>
          </span>
          <span className="jobDetails-title" style={{fontWeight:"650"}}>{viewJobData.jobs.jobtitle}</span>
        </div>
        <div className="jobDetails-category-container mb-2 d-flex flex-column">
          <span className="jobDetails-category" style={{fontWeight:"650"}}>Category</span>
          <span className="jobDetails-category-value">{viewJobData.jobs.servicename}</span>
        </div>
        <div className="jobDetails-location-container mb-2 d-flex flex-column">
          <span className="jobDetails-location" style={{fontWeight:"650"}}>Location</span>
          <span className="jobDetails-location-value">{viewJobData.jobs.joblocation}</span>
        </div>
        <div className="jobDetails-dueDate-container mb-2 d-flex flex-row">
          <div>
            <span className="jobDetails-dueDate" style={{fontWeight:"650"}}>Due Date</span>
            <br />
            <span className="jobDetails-dueDate-value">{viewJobData.jobs.duedate}</span>
          </div>
          <div className="mx-4">
            <span className="jobDetails-posted" style={{fontWeight:"650"}}>Posted</span>
            <br />
            <span className="jobDetails-posted-value">{viewJobData.jobs.posteddate}</span>
          </div>
        </div>
        <div className="jobDetails-description-container d-flex flex-column mb-2">
          <span className="jobDetails-description" style={{fontWeight:"650"}}>Description</span>
          <span className="jobDetails-description-value">
          {viewJobData.jobs.jobdescription}
          </span>
        </div>
        <div className="jobDetails-images-container">
          <span className="jobDetails-images" style={{fontWeight:"650"}}>Images</span>
          
          <div className="jobDetails-images-container-box row mt-2">
            {allImages.map((image) => (
              <div className="col-6 col-md-4 col-lg-3">
                <img
                  src={`data:image/jpg;base64,${image}`}
                  alt={'job detail image'}
                  className="jobDetails-images-value-img"
                />
              </div>
            ))}
          </div>
        </div>
      </Col>
    </Row>
    <div className="d-flex flex-column col-12  justify-content-center align-items-center comment-section-start-div">
            <Col className="commentSection-col-container col-12 col-lg-10 col-md-10 col-sm-11 mt-3">
                <Row className="my-3 me-lg-1 ms-lg-1">
                  <Form className="mt-4" onSubmit={(e) => {
                      e.preventDefault(); 
                      handleAddReply(); 
                  }}>
                      <Form.Group className="mb-3" controlId="formBasicTitle">
                          <Form.Control 
                              type="text" 
                              name="replymessage" 
                              className="commentSection-comment-input" 
                              placeholder="Write a comment ..." 
                              value={addReplyData.replymessage}
                              onChange={handleInputChange}
                              style={{borderRadius:"10px",border:"1px solid black"}}
                              required
                          />
                      </Form.Group>
                      <div className="d-flex">
                          <Button className="commentSection-comment-btn btn-ServiceProvider-2 ms-auto" type="submit">Post</Button>
                      </div>
                  </Form>
                </Row>
                
                <Row>
                    <Col className="d-flex flex-column align-items-start">
                        <span className="commentSection-comment-title" style={{fontWeight:"650"}}>Comments</span>
                    </Col>
                    <Col className="commentSection-comment-count-container d-flex flex-column align-items-end">
                        <span className="commentSection-comment-count" style={{fontWeight:"650"}}>{singleJobReplies !== null ? singleJobReplies.length + ' comments' : 'Loading...'}</span>
                    </Col>
                </Row>

                {singleJobReplies !== null ? (
                    singleJobReplies.map((comment) => (
                    <Row key={comment.replyid}>
                        <div className="commentSection-comment-container mt-3 p-3" style={{border:"1px solid black",borderRadius:"15px"}}>
                            <div className="commentSection-comment-header d-flex flex-row">
                                <div className="commentSection-avatar-container">
                                    <img
                                    src={'data:image/jpeg;base64;' + comment.serviceproviders.profilePic}
                                    className="commentSection-avatar rounded-circle"
                                    style={{ width: "40px", height: "40px" }}
                                    />
                                </div>
                                <div className="commentSection-username-container ms-3">
                                    <span className="commentSection-username" style={{fontWeight:"650"}}>{comment.serviceproviders.firstname}</span>
                                </div>
                                <div className="commentSection-comment-date-container ms-auto ">
                                <span className="commentSection-comment-date" style={{fontWeight:"650"}}>{comment.replydate}</span>
                                </div>
                            </div>
                            <div className="commentSection-body mt-2">
                                <span className="commentSection-comment-body-text" style={{fontWeight:"500"}}>{comment.replymessage}</span>
                            </div>
                        </div>
                    </Row>
                  ))
                ):(
                  <div>0 comments</div>
                )}
            </Col>         
        </div>
    </>
  );
}

export default JobDetails;