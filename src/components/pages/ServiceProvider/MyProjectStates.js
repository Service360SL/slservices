import React, { useState } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import '../../../style/ServiceProvider/MyProjectStates.css';
import { Link } from 'react-router-dom';

import Pending from '../../../assets/images/ServiceProvider/pending2.jpg';
import Invites_img from '../../../assets/images/ServiceProvider/invite-2.png';
import Pending_img from '../../../assets/images/ServiceProvider/pending.png';
import Ongoing_img from '../../../assets/images/ServiceProvider/ongoing.png';
import Rejected_img from '../../../assets/images/ServiceProvider/rejected.png';

const serviceCategories = {
    jobInvites: {
        image: Invites_img,
        title: "Job Invites",
    },
    pendingJobs: {
        image: Pending_img,
        title: "Pending Jobs",
    },
    processingJobs: {
        image: Ongoing_img,
        title: "On Going Jobs",
    },
    rejectedJobs: {
        image: Rejected_img,
        title: "Rejected Jobs",
    },
    VacancyInvites: {
        image: Pending,
        title: "Vacancy Invites",
    },
    processingVacancies: {
        image: Pending,
        title: "On Going Vacancies",
    },
    rejectedVacancies: {
        image: Pending,
        title: "Rejected Vacancies",
    },
};

function MyProjectsJobsStates() {
    return (
        <div className='MyProjectsStates-Container index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            <Row className='mb-3 ms-lg-2 me-lg-2'>
                <span className="ms-1 align-self-start" style={{ fontSize: "24px", fontWeight: "600" }}>Jobs</span>
            </Row>
            <Row className='MyProjectsStates-Job-Container d-flex flex-row ms-lg-2 me-lg-2'>
                <div className='col-lg-3 col-sm-6 col-12'>
                    <Link to="/ServiceProvider/MyProjectsJobs?tab=invite">
                        <Card className="MyProjectsStates-card mb-3" >
                            <Card.Img className="MyProjectsStates-card-img" src={serviceCategories.jobInvites.image} style={{ maxHeight: '150px', objectFit: 'contain', padding: '18px' }}/>
                            <Card.Body>
                                <span style={{fontWeight:"bold"}}>{serviceCategories.jobInvites.title}</span>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                    <Link to="/ServiceProvider/MyProjectsJobs?tab=pending">
                        <Card className="MyProjectsStates-card mb-3" >
                            <Card.Img className="MyProjectsStates-card-img" src={serviceCategories.pendingJobs.image} style={{ maxHeight: '150px', objectFit: 'contain', padding: '24px' }}/>
                            <Card.Body>
                                <span style={{fontWeight:"bold"}}>{serviceCategories.pendingJobs.title}</span>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                    <Link to="/ServiceProvider/MyProjectsJobs?tab=ongoing">
                        <Card className="MyProjectsStates-card mb-3">
                            <Card.Img className="MyProjectsStates-card-img" src={serviceCategories.processingJobs.image} style={{ maxHeight: '150px', objectFit: 'contain', padding: '24px'  }}/>
                            <Card.Body>
                                <span style={{fontWeight:"bold"}}>{serviceCategories.processingJobs.title}</span>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className='col-lg-3 col-sm-6 col-12'>
                    <Link to="/ServiceProvider/MyProjectsJobs?tab=rejected">
                        <Card className="MyProjectsStates-card">
                            <Card.Img className="MyProjectsStates-card-img" src={serviceCategories.rejectedJobs.image} style={{ maxHeight: '150px', objectFit: 'contain', padding: '24px'  }}/>
                            <Card.Body>
                                <span style={{fontWeight:"bold"}}>{serviceCategories.rejectedJobs.title}</span>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            </Row>
        </div>
    );
}

export default MyProjectsJobsStates;