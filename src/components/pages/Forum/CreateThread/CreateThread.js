import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import TextEditor from "../ViewThread/TextEditor";

import axios from "axios";

import backgroundImage from "../../../../assets/images/header/Background.png";

function ForumPopUp(props) {
   const response = sessionStorage.getItem("authenticatedUser");
   const userDetail = JSON.parse(response);

  const [selectedAdImages, setSelectedAdImages] = useState([]);


  const handleAdimages = (event) => {
    const selectedImages = Array.from(event.target.files);
    setAdImageInputErr(false);
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

  const [AdImageInputErr, setAdImageInputErr] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [catError, setCatError] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);

    if(description.length > 0){
    setDescriptionError(false);
    }
  };

  
   const handleCategoryChange = (event) => {
     setCategory(event.target.value);
     if (category != "Select Category") {
       setCatError(false);
     }
   };


  const handleSubmitFQ = (e) => {
    e.preventDefault();
    if (selectedAdImages.length === 0) {
      setAdImageInputErr(true);
    } else {
      setAdImageInputErr(false);
    }

    if(!titleError && !catError && !descriptionError){
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      // formData.append("role", userDetail.role);
      formData.append("role", "SERVICEPROVIDER");
      formData.append("userId", userDetail.userid);
      selectedAdImages.forEach((image) => {
        formData.append("images", image);
      });
      axios
        .post("http://localhost:8080/auth/forum/createQuestion", formData)
        .then((res) => {
          console.log("Forum Question Create Sucessfully" + res);
        })
        .catch((err) => console.log(err));
    }
  };


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ backgroundColor: "#292D32" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="AskQPop">Ask Your Question</p>
        </Modal.Title>
      </Modal.Header>

      <div
        className="InnerCreateForum"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <Form>
          <fieldset>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="disabledTextInput">Title</Form.Label>{" "}
              <sup>
                <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
              </sup>
              <Form.Control
                id="disabledTextInput"
                required
                placeholder="Title"
              />
              {titleError && (
                <p className="px-3 text-danger">
                  Please Enter The Question Title.
                </p>
              )}
            </Form.Group>

            <div className="mb-3">
              <p className="mb-0">Upload Item Images (Maximum 3 Images) </p>

              <input
                type="file"
                onChange={handleAdimages}
                multiple
                accept=".jpg, .jpeg, .png"
                className="BrowseImageInput form-control"
              />

              {AdImageInputErr && (
                <p className="px-3 text-danger">
                  Please select one or more files.
                </p>
              )}

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

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>{" "}
              <sup>
                <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
              </sup>
              <Form.Select required onChange={handleCategoryChange}>
                <option defaultValue disabled selected>
                  Select Category
                </option>
                <option> </option>
                <option>Spare Parts</option>
                <option>Equipment</option>
                <option>Others</option>
              </Form.Select>
              {catError && (
                <p className="px-3 text-danger">Please Select the Category.</p>
              )}
            </Form.Group>

            {/* Description */}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <TextEditor />
              {descriptionError && (
                <p className="px-3 text-danger">Please discribe your Question</p>
              )}
            </Form.Group>

            {/* Area */}

            <div className="d-flex justify-content-center">
              <button className="PostAd" onClick={handleSubmitFQ}>
                Post
              </button>
            </div>
          </fieldset>
        </Form>
      </div>
    </Modal>
  );
}

export default ForumPopUp;