import React, { useState , useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../../../style/advertiser/AdIndex.css";

import profileIcon from "./../../../../assets/images/advertiser/Adam.jpg";
import adImage from "./../../../../assets/images/advertiser/41CKlQ1b08S.jpg";

import backgroundImage from "../../../../assets/images/header/Background.png";




const EditAd = () => {
  // Get Id from parameter
  

  const { id } = useParams();
  console.log("id:" + id);

  // ........................

const [ads, setAds] = useState([]);
const [imageUrls, setImageUrls] = useState([]);

useEffect(() => {
  const apiUrl = `http://localhost:8080/auth/getAd/${id}`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => setAds(data))
    .catch((error) => console.error("Error fetching data:", error));
}, []);

   useEffect(() => {
     if (ads.adsId) {
       // Check if id is available
       const adId = `http://localhost:8080/auth/getAdImages/${id}`;

       fetch(adId)
         .then((response) => {
           if (!response.ok) {
             throw new Error(
               `Error fetching image for ad ${ads.adsId}: ${response.status}`
             );
           }
           return response.blob(); // Fetch image as a blob
         })
         .then((imageBlob) => {
           const imageUrl = URL.createObjectURL(imageBlob);
           setImageUrls(imageUrl); // Set the imageUrl in the state
         })
         .catch((error) => {
           console.error(`Error fetching image for ad ${ads.adsId}:`, error);
           setImageUrls(null); // Set imageUrl to null on error
         });
     }
   }, [id]);

   console.log(ads);


  // ................................................................................................

  
  const response = sessionStorage.getItem("authenticatedUser");
  const userDetail = JSON.parse(response);

  // Ad Image useState

  const [selectedAdImages, setSelectedAdImages] = useState(imageUrls);
  const [previewImage, setPreviewImage] = useState(adImage);




  // Ad Image

  const PreviewAdImage = (selectedImages) => {
    if (selectedImages.length === 0) {
      setPreviewImage(adImage);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImages[0]);
    }
  };

  const handleAdimages = (event) => {
    const selectedImages = Array.from(event.target.files);
    setAdImageInputErr(false);
    if (selectedAdImages.length + selectedImages.length <= 3) {
      setSelectedAdImages((prevSelectedAdImages) => [
        ...prevSelectedAdImages,
        ...selectedImages,
      ]);

      PreviewAdImage([...selectedAdImages, ...selectedImages]);
    } else {
      alert("You can only select up to 3 files.");
    }
  };

  const handleRemoveAdImages = (index) => {
    const updatedAdImages = selectedAdImages.filter((_, i) => i !== index);
    setSelectedAdImages(updatedAdImages);
    PreviewAdImage(updatedAdImages);
  };

  // .........................................................................
  const [AdImageInputErr, setAdImageInputErr] = useState(false);
  const [AdNameInputErr, setAdNameInputErr] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [CatError, setCatError] = useState(false);
  const [PriceError, setPriceError] = useState(false);
  const [warrantyProvided, setWarrantyProvided] = useState("select");
  const [warrentyError, setWarrentyError] = useState(false);
  const [warentyMonth, setWarentyMonth] = useState(0);
  const [warentyMonthErr, setWarentyMonthErr] = useState(false);
  const [AreaError, setAreaError] = useState(false);
  const [DeliveryError, setdDeliveryError] = useState(false);
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [policyErr, setPolicyErr] = useState(false);

  const [adName, setAdName] = useState("");
  const handleAdNameChange = (event) => {
    setAds({ ...ads, adsName: event.target.value });
    setAdName(event.target.value);
    setAdNameInputErr(false);
  };

  const [adPrice, setAdPrice] = useState("");
  const handleAdPriceChange = (event) => {
    setAds({ ...ads, price: event.target.value });
    setAdPrice(event.target.value);
    setPriceError(false);
  };

  const [adLocation, setAdLocation] = useState("Area");
  const handleAdLocationChange = (event) => {
    setAds({ ...ads, area: event.target.value });
    setAdLocation(event.target.value);
    setAreaError(false);
  };

  const [adDelivery, setAdDelivery] = useState("Delivery");
  const handleAdDeliveryChange = (event) => {
    setAds({ ...ads, delivery: event.target.value });
    setAdDelivery(event.target.value);
    setdDeliveryError(false);
  };

    const handleDescriptionChange = (event) => {
      // Update the ads state when the textarea value changes
      setAds({ ...ads, description: event.target.value });
    };

  // Validation
  // ........................................................................................................................................

  const handleCategoryChange = (event) => {
    setAds({ ...ads, category: event.target.value }); 
    const newCategory = event.target.value;
    setCategory(newCategory);
    setCatError(false);
  };

  const handleWarrantyChange = (event) => {
    setAds({ ...ads, warrantyMonths: event.target.value });
    setWarrantyProvided(event.target.value);
    setWarrentyError(false);
  };

  const handleWarrentyMonths = (event) => {
    setAds({ ...ads, warrantyMonths: event.target.value });
    setWarentyMonth(event.target.value);
    setWarentyMonthErr(false);
  };

  const handleCheckboxChange = (event) => {
    setIsPolicyAccepted(event.target.checked);
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // event.preventDefault();
    if (selectedAdImages.length === 0) {
      setAdImageInputErr(true);
    }

    if (adName.length === 0) {
      setAdNameInputErr(true);
    }

    if (category === "Select Category") {
      setCatError(true);
    }

    if (adPrice < 1) {
      setPriceError(true);
    }

    if (warrantyProvided === "select") {
      setWarrentyError(true);
    } else if (warrantyProvided === "yes") {
      if (warentyMonth < 1) {
        setWarentyMonthErr(true);
      }
    }

    if (adLocation === "Area") {
      setAreaError(true);
    }

    if (adDelivery === "Delivery") {
      setdDeliveryError(true);
    }

    if (isPolicyAccepted) {
      setPolicyErr(false);
    } else {
      setPolicyErr(true);
    }

    event.preventDefault();
    const formData = new FormData();

    formData.append("adsId", id);
    formData.append("adsName", ads.adsName);
    formData.append("price", ads.price);
    formData.append("category", ads.category);
    formData.append("warrantyMonths", ads.warrantyMonths);
    formData.append("description", ads.description);
    formData.append("area", ads.area);
    formData.append("delivery", ads.delivery);
    formData.append("role", userDetail.role);
    formData.append("userId", userDetail.userid);

    // Append each selected image file to the FormData object
    for (const imageFile of selectedAdImages) {
      formData.append("adsImages", imageFile);
    }

    // Send a POST request to your Spring Boot backend
    axios
      .put(`http://localhost:8080/auth/updateAd`, formData)
      .then((response) => {
        console.log("Ad Updated successfully!", response.data);
        navigate(`/Advertiser/Ads`);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Failed to Update ad", error);
      });
  };


  return (
    <Container>
      <h2>Edit Your Ad</h2>
      <Row className="AdsHome-mainCont">
        {/* <Col className="AdsHome-left-cont d-flex justify-content-center align-items-center">
          <Row>
            <div className="AdSampleCont">
              <Row>
                <Col md="auto" className="d-flex align-items-center ">
                  <div>
                    <img
                      src={profileIcon}
                      alt="Profile of Advertiser"
                      className="AdProfilePic"
                    />
                  </div>
                  <div className="namediv">
                    <p>Adam</p>
                  </div>
                </Col>
              </Row>

              <Row>
                <h3 className="adname"> {adName ? adName : "Ad Name"}</h3>
              </Row>

              <Row className="d-flex justify-content-center">
                <Image src={previewImage} fluid alt="Item" />
              </Row>

              <Row>
                <h3 className="Adprice "> {adPrice ? adPrice : "16000"} LKR</h3>
              </Row>

              <Row>
                <Col sm={4} className="d-flex gap-1">
                  <div>
                    <i className="fa-solid fa-location-dot"></i>
                  </div>

                  <p>{adLocation ? adLocation : "Colombo"}</p>
                </Col>
                <Col sm={8} className="d-flex justify-content-end gap-1">
                  <div>
                    <i className="fa-solid fa-truck-front"></i>
                  </div>
                  <p>{adDelivery ? adDelivery : "Free Delivery"}</p>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center ">
                <button className="AdViewButton mb-3">View</button>
              </Row>
            </div>
          </Row>
        </Col> */}

        <Col
          className="AdsHome-right-cont"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <Form>
            <fieldset>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Ad Name{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                  </sup>
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  className="CreateAdInput"
                  // placeholder={ads.adsName}
                  value={ads.adsName}
                  onChange={handleAdNameChange}
                />
                {AdNameInputErr && (
                  <p className="px-3 text-danger">
                    Please Enter The Item Name.
                  </p>
                )}
              </Form.Group>

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
                  value={imageUrls}
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
                <Form.Label>
                  Category{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric" />
                  </sup>
                </Form.Label>
                <Form.Select
                  className="CreateAdInput"
                  value={ads.category}
                  onChange={handleCategoryChange}
                >
                  <option defaultValue disabled selected>
                    {" "}
                    Select Category{" "}
                  </option>
                  <option>Tools</option>
                  <option>Spare Parts</option>
                  <option>Equipment</option>
                  <option>Others</option>
                </Form.Select>
                {CatError && (
                  <p className="px-3 text-danger">Please Select Category.</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="disabledTextInput">
                  Price{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                  </sup>
                </Form.Label>
                <Form.Control
                  id="disabledTextInput"
                  // placeholder={ads.price}
                  className="CreateAdInput"
                  type="number"
                  value={ads.price}
                  onChange={handleAdPriceChange}
                />
                {PriceError && (
                  <p className="px-3 text-danger">
                    Please Enter A Valid Number.
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Are you providing Warranty?{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                  </sup>
                </Form.Label>
                <Form.Select
                  className="CreateAdInput"
                  onChange={handleWarrantyChange}
                  value={ads.warrantyMonths === 0 ? "no" : "yes"}
                >
                  <option defaultValue disabled selected>
                    Select Yes/No
                  </option>

                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Select>
                {warrentyError && (
                  <p className="px-3 text-danger">Please Select Yes or No.</p>
                )}
              </Form.Group>
              {warrantyProvided === "yes" && (
                <Form.Group className="mb-3">
                  <Form.Label>Warranty Months</Form.Label>
                  <Form.Control
                    type="number"
                    className="CreateAdInput"
                    placeholder="Enter warranty months"
                    value={ads.warrantyMonths}
                    onChange={handleWarrentyMonths}
                  />
                  {warentyMonthErr && (
                    <p className="px-3 text-danger">
                      Please Enter Number of Months.
                    </p>
                  )}
                </Form.Group>
              )}

              {/* Description */}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description/Specification</Form.Label>
                <Form.Control
                  className="CreateAdInput"
                  as="textarea"
                  value={ads.description}
                  onChange={handleDescriptionChange}
                  rows={3}
                />
              </Form.Group>

              {/* Area */}
              <Form.Group className="mb-3">
                <Form.Label htmlFor="area">
                  Area{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                  </sup>
                </Form.Label>
                <Form.Select
                  className="CreateAdInput"
                  value={adLocation}
                  onChange={handleAdLocationChange}
                  value={ads.area}
                >
                  <option value="Area" selected disabled>
                    Select Area
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
                {AreaError && (
                  <p className="px-3 text-danger">Please Select Area.</p>
                )}
              </Form.Group>

              {/* Delivery Option */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Delivery Option{" "}
                  <sup>
                    <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
                  </sup>
                </Form.Label>
                <Form.Select
                  className="CreateAdInput"
                  value={ads.delivery}
                  onChange={handleAdDeliveryChange}
                >
                  <option value="" disabled selected>
                    Select Delivery Option
                  </option>
                  <option value="Free Delivery">Free Delivery</option>
                  <option value="Need To Pay">Need to pay for Delivery</option>
                  <option value="Not Available">Not Available</option>
                </Form.Select>
                {DeliveryError && (
                  <p className="px-3 text-danger">
                    Please Select Delivery Option.
                  </p>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="disabledFieldsetCheck"
                  label="I accept the policy"
                  checked={isPolicyAccepted}
                  onChange={handleCheckboxChange}
                />
              </Form.Group>

              <Row className="d-flex justify-content-center ">
                <button
                  className="AdViewButton mb-3"
                  onClick={handleSubmit}
                  type="submit"
                >
                  Submit
                </button>
              </Row>
            </fieldset>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditAd;