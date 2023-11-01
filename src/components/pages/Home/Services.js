import React, { useState, useEffect } from 'react';
import { Row, Card } from 'react-bootstrap';
// import image1 from './../../../assets/images/home/AC-Repair.jpeg';
// import image2 from './../../../assets/images/home/ElectricalWiring.jpeg';
// import image3 from './../../../assets/images/home/plumbing.jpeg';
// import image4 from './../../../assets/images/home/Tiles_Fitting.jpeg';
// import image5 from './../../../assets/images/home/carpentry.jpeg';
// import image6 from './../../../assets/images/home/painting.jpeg';
// import image7 from './../../../assets/images/home/masonry.jpeg';
// import image8 from './../../../assets/images/home/Glass-Aluminum.jpeg';
// import image9 from './../../../assets/images/home/Iron-Work.jpeg';
// import image10 from './../../../assets/images/home/Cctv.jpeg';
// import image11 from './../../../assets/images/home/Fire-Alarm.jpeg';
// import image12 from './../../../assets/images/home/video-Sur.jpeg';
import axios from 'axios';

import BgImage from './../../../assets/images/header/Background.png';

// const servicesData = [
//     { id: 1, image: image1, text: 'AC Repair' },
//     { id: 2, image: image2, text: 'Electrical Wiring' },
//     { id: 3, image: image3, text: 'Plumbing' },
//     { id: 4, image: image4, text: 'Tiles Fitting' },
//     { id: 5, image: image5, text: 'Carpentry' },
//     { id: 6, image: image6, text: 'Painting' },
//     { id: 7, image: image7, text: 'Masonry' },
//     { id: 8, image: image8, text: 'Glass&Aluminum' },
//     { id: 9, image: image9, text: 'Iron Works' },
//     { id: 10, image: image10, text: 'CCTV Repair' },
//     { id: 11, image: image11, text: 'Fire Alarm' },
//     { id: 12, image: image12, text: 'VideoSurveillance' },
// ];

const serverLink = 'http://localhost:8080';

function AppServices() {

    const [data, setData] = useState({
        servicesData: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesResponse = await axios.get(serverLink + '/auth/allServices');
                const fetchedServicesData = servicesResponse.data;

                setData({
                    ...data,
                    servicesData: fetchedServicesData,
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section id="service" className="block service-block m-5" style={{ backgroundImage: `url(${BgImage})` }}>
            <div className="title-holder">
                <h2>What do you need to be done</h2>
                <div className="subtitle">Connect with Trusted Service Providers</div>
            </div>

            <Row className="cardflex">
                {data.servicesData.slice(0, 6).map((service) => (
                    <Card className="card" key={service.id}>
                        <Card.Img src={'data:image/png;base64,' + service.serviceImage} variant="top" alt="home" />
                        <Card.Body>
                            <Card.Text>{service.service}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>

            <Row className="cardflex">
                {data.servicesData.slice(6, 12).map((service) => (
                    <Card className="card" key={service.id}>
                        <Card.Img src={'data:image/png;base64,' + service.serviceImage} variant="top" alt="home" />
                        <Card.Body>
                            <Card.Text>{service.service}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Row>

        </section>
    );
}

export default AppServices;