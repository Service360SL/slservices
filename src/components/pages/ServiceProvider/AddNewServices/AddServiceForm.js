import React from "react";
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";

function AddServiceForm() {
    const [serviceFormData, setServiceFormData] = useState({
        qualificationcertificate: null,
        services: [],
        serviceproviderid: null,
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    // Define a state variable to store the response data
    const [responseData, setResponseData] = useState([]);

    const [serviceCategories, setServiceCategories] = useState({
    });

    // Initialize a state to track selected checkboxes
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});

    const[alreadyAddedServices, setAlreadyAddedServices] = useState([]);

    const[countOfAlreadyAddedServices, setCountOfAlreadyAddedServices] = useState(0);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const [userDetail, setUserDetail] = useState([]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setServiceFormData({
    //         ...serviceFormData,
    //         [name]: value,
    //     });
    // };

    const handleCategoryChange = (e) => {
        const { name, checked, value } = e.target;
    
        const selectedCount = Object.values(selectedCheckboxes).filter(Boolean).length+countOfAlreadyAddedServices;
    
        if (!checked || (checked && selectedCount < 5)) {
            setSelectedCheckboxes((prevSelectedCheckboxes) => ({
                ...prevSelectedCheckboxes,
                [name]: checked,
            }));
    
            setServiceFormData((prevFormData) => {
                if (checked) {
                    // If the checkbox is checked, add the service to the array
                    return {
                        ...prevFormData,
                        services: [...prevFormData.services, value],
                    };
                } else {
                    // If the checkbox is unchecked, remove the service from the array
                    return {
                        ...prevFormData,
                        services: prevFormData.services.filter((service) => service !== value),
                    };
                }
            });
        } else if (checked && selectedCount >= 5) {
            showAlertWithMessage("Maximum 5 services can be selected.");
        }
    
        // console.log("Checkbox value:", value);
        // console.log(serviceFormData.services)
    };
    
    const handleFileInputChange = (e) => {
        const selectedFilesArray = Array.from(e.target.files);
    
        if (selectedFilesArray.length + selectedFiles.length > 5) {
            showAlertWithMessage('You can select a maximum of 5 files.')
            return;
        }

        const selectedFileNames = selectedFilesArray.map((file) => file);
    
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...selectedFileNames]);
    
    };  

    const handleRemoveFile = (indexToRemove) => {
        setSelectedFiles((prevSelectedFiles) =>
            prevSelectedFiles.filter((_, index) => index !== indexToRemove)
        );
    };

    //GETTING LOGGED IN SERVICEPROVIDER ID

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    useEffect(() => {
        const serverLink = 'http://localhost:8080';
    
        const fetchUserData = async () => {
            try {
                const response = await axios.get(serverLink + '/auth/getUserById/' + userData.userid);
                if (response.data) {
                    // setUserDetail(response.data);
                    console.log(userData.userid)
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [userData.userid]);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`).then((res) => {

            const AlreadyAddedServices = res.data.map((service) => service.serviceId);
            console.log(AlreadyAddedServices);

            setAlreadyAddedServices(AlreadyAddedServices);
            setCountOfAlreadyAddedServices(AlreadyAddedServices.length);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewAllServices`).then((res) => {
            setResponseData(res.data);

            const categories = {};

            // Use a Set to store unique serviceCategoryId values
            const uniqueServiceCategories = new Set();
            
            // Iterate through the response data and add serviceCategoryId to the Set
            res.data.forEach((service) => {
                uniqueServiceCategories.add(service.serviceCategoryId);
            });
            
            // Convert the Set to an array
            const serviceCategories = [...uniqueServiceCategories];

            const services = res.data.map((service) => service.serviceId);

            // Group services by category
            res.data.forEach((service) => {
                if (!categories[service.serviceCategoryName]) {
                    categories[service.serviceCategoryName] = [];
                }
                categories[service.serviceCategoryName].push(service.serviceName);
            });

            setServiceCategories(categories);
        });
    }, []);

    const handleAddService = (event) => {
        event.preventDefault();

        // Create a FormData object to send the data
        const formData = new FormData();

        // Append the data to the FormData object
        selectedFiles.map((file) => {
            formData.append("files", file);
        });

        serviceFormData.services.forEach((serviceId, index) => {
            formData.append("services", serviceId);
        });

        formData.append('serviceproviderid', userData.userid);

        axios
            .post('http://localhost:8080/auth/addNewServicesSp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log('Service added successfully:', response.data);
                // window.location.reload();
            })
            .catch((error) => {
                console.error('Error adding service:', error);
            });
            window.location.reload();
    };
    
    const showAlertWithMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
          }, 2000);
      };
    
    return (
        <div className="AddServiceForm-container ms-lg-4 me-lg-5">
            <Row className="AddServiceForm-Head">
                <Col className="col-xl-6 col-12 d-flex align-items-center mb-2">
                    <span className="AddServiceForm-Head-Title">
                        Add New Service(s)
                    </span>
                </Col>
                <Col className="col-xl-6 col-12 d-flex align-items-center">
                    <span className="AddServiceForm-Head-SubTitle p-2 ms-xl-auto">
                        Select your services (maximum 5)
                    </span>
                </Col>
            </Row>
            <Row className="AddServiceForm-Body">
                <Form method="post">
                    <Form.Group className="mt-4 mb-3 custom-checkbox" controlId="formBasicCheckbox">
                    {/* {console.log(serviceCategories)} */}
                        {Object.keys(serviceCategories).map((category, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col className="col-md-2 col-12 mb-2">
                                        {category}
                                    </Col>
                                    <Col className="col-md-10 col-12">
                                    {serviceCategories[category].map((subcategory, subIndex) => {
                                        const service = responseData.find((service) => service.serviceName === subcategory);
                                        return (
                                            <Form.Check
                                                key={subIndex}
                                                className="me-3 custom-font"
                                                type="checkbox"
                                                label={subcategory}
                                                name={`subcategories-${index}-${subIndex}`}
                                                checked={selectedCheckboxes[`subcategories-${index}-${subIndex}`] ||  alreadyAddedServices.includes(service.serviceId)}
                                                onChange={handleCategoryChange}
                                                value={service.serviceId} // Use serviceId as the value
                                                disabled={alreadyAddedServices.includes(service.serviceId)}
                                                
                                            />
                                        );
                                    })}
                                    </Col>
                                </Row>
                                {index < Object.keys(serviceCategories).length - 1 && <hr className="AddServiceForm-hr" />}
                            </React.Fragment>
                        ))}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label className="custom-font">Add Qualification Certificate(s)</Form.Label><br/>
                        <Button className="btn-ServiceProvider-1" onClick={() => document.getElementById('fileInput').click()}>Select File</Button>
                        <input
                            type="file"
                            multiple
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <div className="selected-images">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="selected-image">
                                    <span>{file.name}</span>
                                    <Button variant="link" onClick={() => handleRemoveFile(index)}><i class="bi bi-x bi-lg" style={{ color: 'black' }}></i></Button>
                                </div>
                            ))}
                        </div>
                    </Form.Group>

                    <div className="AddNewService-button-container d-flex flex-row">
                        <Button className="btn-ServiceProvider-1" onClick={handleAddService}>Submit</Button>
                        <Link to="../MyServices" className=" ms-auto">
                            <Button className="btn-ServiceProvider-2 AddServiceForm-cancel">Back</Button>
                        </Link>
                    </div>
                </Form>
            </Row>

            <Alert
                show={showAlert}
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
                style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                }}
            >
                {alertMessage}
            </Alert>
        </div>
    );
}

export default AddServiceForm;