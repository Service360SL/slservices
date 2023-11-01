import React, { useState } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import BgImage from '../../../assets/images/header/Background.png';
import '../../../style/User/ViewServices.css';
import { Link } from 'react-router-dom';

import ACRepairImage from '../../../assets/images/home/AC-Repair.jpeg';
import ElectricalWiringImage from '../../../assets/images/home/ElectricalWiring.jpeg';
import PlumbingImage from '../../../assets/images/home/plumbing.jpeg';
import TilesFittingImage from '../../../assets/images/home/Tiles_Fitting.jpeg';
import CarpentryImage from '../../../assets/images/home/carpentry.jpeg';
import Painting from '../../../assets/images/home/painting.jpeg';
import Masonry from '../../../assets/images/home/masonry.jpeg';
import GlassAluminum from '../../../assets/images/home/Glass-Aluminum.jpeg';
import IronWork from '../../../assets/images/home/Iron-Work.jpeg';
import Cctv from '../../../assets/images/home/Cctv.jpeg';
import FireAlarm from '../../../assets/images/home/Fire-Alarm.jpeg';
import VideoSurvilence from '../../../assets/images/home/video-Sur.jpeg';
import SofaCleaning from '../../../assets/images/home/SofaCleaning.jpeg';
import CarpetCleaning from '../../../assets/images/home/CarpetCleaning.jpeg';

import InteriorImage from '../../../assets/images/home/interior.jpeg';
import ElectricalImage from '../../../assets/images/home/Electrical.jpeg';
import ConstructionImage from '../../../assets/images/home/construction.jpeg';
import SecurityImage from '../../../assets/images/home/security.jpeg';
import CleaningImage from '../../../assets/images/home/cleaning.jpeg';


export const serviceCategories = {
    "Interior Works": {
        image: InteriorImage,
        services: [
            { id: 1, image: CarpentryImage, service: 'Carpentry' },
            { id: 2, image: Painting, service: 'Painting' },
        ],
    },
    "Electrical & Plumbing": {
        image: ElectricalImage,
        services: [
            { id: 1, image: ACRepairImage, service: 'AC Repair' },
            { id: 2, image: ElectricalWiringImage, service: 'Electrical Wiring' },
            { id: 3, image: PlumbingImage, service: 'Plumbing' },
        ],
    },
    "Construction": {
        image: ConstructionImage,
        services: [
            { id: 1, image: Masonry, service: 'Masonry' },
            { id: 2, image: TilesFittingImage, service: 'Tiles Fitting' },
            { id: 3, image: IronWork, service: 'Iron Works' },
            { id: 4, image: GlassAluminum, service: 'Glass Aluminum' },
        ],
    },
    "Security": {
        image: SecurityImage,
        services: [
            { id: 1, image: Cctv, service: 'CCTV Repair' },
            { id: 2, image: FireAlarm, service: 'Fire Alarm' },
            { id: 3, image: VideoSurvilence, service: 'Video Surveillance' },
        ],
    },
    "Cleaning": {
        image: CleaningImage,
        services: [
            { id: 1, image: SofaCleaning, service: 'Sofa cleaning' },
            { id: 2, image: CarpetCleaning, service: 'Carpet cleaning' },
        ],
    },
};



function ViewServices() {
    return (
        <section id="service" className="block service" style={{ backgroundImage: `url(${BgImage})` }}>

            <div className="title-holder">
                <h2>What do you need to be done</h2>
                <div className="subtitle" style={{ color: "	#5A5A5A" }}>Need your services done quickly and efficiently ? <br></br>
                    Look no further! Explore a wide variety of services
                    offered by professionals who can deliver exceptional results. </div>
            </div>

            <Row className="cardflex">
                {Object.keys(serviceCategories).map((category) => (
                    <Col key={category} xs={5} sm={3} md={3} lg={3}>
                        <Link to={`/jobs/${category}`}>
                            <Card className="card d-flex flex-column justify-content-center">
                                <Card.Img src={serviceCategories[category].image} variant="top" alt={category} />
                                <Card.Body>
                                    <Card.Text>{category}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </section>
    );
}

export default ViewServices;