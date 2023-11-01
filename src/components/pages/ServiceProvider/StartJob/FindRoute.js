import React from "react";
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../../../../style/ServiceProvider/StartJob.css";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Routing from "./Routing";

function FindRoute() {
    const [viewJobData, setViewJobData] = useState(null);
    const [userDetail, setUserDetail] = useState([]);

    const { id } = useParams();
    const jobId = parseInt(id, 10);

    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);

    // FETCHING LOGGED IN USER DATA
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/getUserById/' + userData.userid);      
            if (response.data) {
                setUserDetail(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/auth/viewNewJobs/${jobId}`).then((res) => {
            console.log(res.data);
            setViewJobData(res.data);
        });
    }, []);

    if (!viewJobData) return 'No jobs sessions found!';

    const position = [16.902, 79.859];

    const cus_location = viewJobData.jobs.customer.address;
    const sp_location = userDetail.address;

    return (
        <div className="ms-lg-4 me-lg-4">
            <div className="FindRoute-location-info">
                <span style={{ fontSize: "28px", fontWeight: "bold" }}>Route Details</span>

                <Form className="mt-4">
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>My Location</Form.Label>
                        <Form.Control type="text" value={sp_location} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Customer's Location</Form.Label>
                        <Form.Control type="text" value={cus_location} />
                    </Form.Group>
                </Form>

            </div>
            <div className="FindRoute-map mt-5 border" style={{ width: "100%", height: "600px" }}>
                <div id="map">
                    <MapContainer center={position} zoom={14} style={{ height: "82vh" }}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Routing spLocation={sp_location} cusLocation={cus_location}/>
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}

export default FindRoute;