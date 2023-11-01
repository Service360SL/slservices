import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import Alert from 'react-bootstrap/Alert';

function CreateBlogForm() {

    const [blogFormData, setBlogFormData] = useState({
        servicename: "",
        blogtitle: "",
        blogdescription: "",
    });

    const [myservicesData, setMyservicesData] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState(''); 

    const [alertMessageRed, setAlertMessageRed] = useState(''); 
    const [showAlertRed, setShowAlertRed] = useState(false);

    const [selectedFiles, setSelectedFiles] = useState([]);

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);
    console.log(userData.userid);

    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewMyServices/${userData.userid}`).then((res) => {
            console.log(res.data);
            setMyservicesData(res.data);
        });
    }, []);

    const handleFileInputChange = (e) => {
        const selectedFilesArray = Array.from(e.target.files);

            
        if (selectedFilesArray.length + selectedFiles.length > 5) {
            handleShowAlertRed('you can select a maximum of 5 images');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogFormData({
            ...blogFormData,
            [name]: value,
        });
    };

    const handleCreateBlog = (event) => {
        event.preventDefault();

        // Create a FormData object to send the data
        const formData = new FormData();

        // Append the training session data to the FormData object
        for (const key in blogFormData) {
            formData.append(key, blogFormData[key]);
        }
    
        // Append each selected file to the FormData object    
        selectedFiles.map((file) => {
            formData.append("images", file);
        });

        formData.append("serviceproviderid", userData.userid);
     
        axios
            .post('http://localhost:8080/auth/createBlog', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log('Blog created successfully:', response.data);

            // Reset the form data to its initial empty values
            setBlogFormData({
                servicename: "",
                blogtitle: "",
                blogdescription: "",
            });

            // Clear the selected files
            setSelectedFiles([]);

            handleShowAlert('your blog has been created successfully!');

            })
            .catch((error) => {
                console.error('Error creating blog:', error);
            });
    };

    const handleShowAlert = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
    
        // Automatically hide the alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 3500); // 3500 milliseconds (5 seconds)
    };

    const handleShowAlertRed = (message) => {
        setAlertMessageRed(message);
        setShowAlertRed(true);
    
        // Automatically hide the alert after 5 seconds
        setTimeout(() => {
          setShowAlertRed(false);
        }, 3500); // 3500 milliseconds (5 seconds)
    };

    return (
        <div className="ms-lg-4 me-lg-4">
            <span style={{ fontSize: "28px", fontWeight: "bold" }}>Create a Blog</span>

            <Form className="mt-4" method="post">
                <Form.Group className="mb-3" controlId="formBasicJobCategory">
                    <Form.Control 
                        as="select" 
                        name="servicename"
                        value={blogFormData.servicename}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select the service category</option>
                        {myservicesData.map((category) => (
                            <option key={category.serviceId} value={category.serviceName}>
                                {category.serviceName}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter the Title" 
                        name="blogtitle"
                        value={blogFormData.blogtitle}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        placeholder="Provide a detailed description of the work experience" 
                        name="blogdescription"
                        value={blogFormData.blogdescription}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFiles">
                    <Form.Label>Upload Relevant Media</Form.Label><Form.Text className="text-muted">&nbsp;&nbsp;( Please upload images that showcase your work experience and accomplishments )</Form.Text><br />
                    <Button className="btn-ServiceProvider-1" onClick={() => document.getElementById('fileInput').click()}>Select Images</Button>
                    <input
                        type="file"
                        accept="image/*"
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

                <div className="CreateBlog-button-container d-flex flex-row">
                    <Button className="btn-ServiceProvider-1" onClick={handleCreateBlog}>Publish</Button>
                </div>
            </Form>

            
            <Alert
                show={showAlertRed}
                    variant="danger"
                    onClose={() => setShowAlertRed(false)}
                    dismissible
                    style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999, // Adjust the z-index as needed
                    }}
                >
                {alertMessageRed}
            </Alert>   
            <Alert
                show={showAlert}
                    variant="info"
                    onClose={() => setShowAlert(false)}
                    dismissible
                    style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 9999, // Adjust the z-index as needed
                    }}
                >
                {alertMessage}
            </Alert>  
        </div>
    );
}

export default CreateBlogForm;