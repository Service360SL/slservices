import Card from "react-bootstrap/Card";
import { Col, Container, Row } from 'react-bootstrap';
import '../../../../style/ServiceProvider/Dashboard.css'
import { useState, useEffect } from "react";
import axios from "axios";

function Overview() {
    const response = sessionStorage.getItem('authenticatedUser');
    const userData = JSON.parse(response);
    const userId = userData.userid;

    const [viewHistoryJobsData, setViewHistoryJobsData] = useState([]);
    const [viewHistoryVacanciesData, setViewHistoryVacanciesData] = useState([]);

    const [viewOngoingJobsData, setViewOngoingJobsData] = useState([]);
    const [viewOngoingVacanciesData, setViewOngoingVacanciesData] = useState([]);

    const [viewPendingJobsData, setViewPendingJobsData] = useState([]);

    const [trainingsessionData, setTrainingsessionData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/viewHistoryJobs',{
          params: {
            serviceproviderid: userData.userid
          }
        }).then((res) => {
          console.log(res.data);
          setViewHistoryJobsData(res.data);
        });
  
        axios.get('http://localhost:8080/auth/viewHistoryVacancies',{
          params: {
            serviceproviderid: userData.userid
          }
        }).then((res) => {
          console.log(res.data);
          setViewHistoryVacanciesData(res.data);
        });

        axios.get('http://localhost:8080/auth/viewOngoingJobs',{
            params: {
              serviceproviderid: userData.userid
            }
          }).then((res) => {
            console.log(res.data);
            setViewOngoingJobsData(res.data);
          });
    
        axios.get('http://localhost:8080/auth/viewOngoingVacancies',{
        params: {
            serviceproviderid: userData.userid
        }
        }).then((res) => {
        console.log(res.data);
        setViewOngoingVacanciesData(res.data);
        });

        axios.get('http://localhost:8080/auth/viewPendingJobs',{
        params: {
            serviceproviderid: userData.userid
        }
        }).then((res) => {
        console.log(res.data);
        setViewPendingJobsData(res.data);
        });

        axios.get('http://localhost:8080/auth/viewMyTrainingSessions',{
        params: {
            serviceproviderid: userData.userid
        }
        }).then((res) => {
        console.log(res.data);
        setTrainingsessionData(res.data);
        });
    }, []);
    
    const allCompletedCards = [...viewHistoryJobsData, ...viewHistoryVacanciesData];
    const completedjobs_count = allCompletedCards.length;
    console.log(allCompletedCards);

    const allOngoingCards = [...viewOngoingJobsData, ...viewOngoingVacanciesData];
    const ongoingjobs_count = allOngoingCards.length;

    const pendingjobs_count = viewPendingJobsData.length;

    const trainingsession_count = trainingsessionData.length;

    return (
        <div className="dashboard-top-cards-container d-flex flex-row mt-3 ms-lg-4 me-lg-4">
            <Card className="card-sp-dashboard dashboard-button-sp-1 col-3">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="card-sp-dashboard-title">{completedjobs_count}</Card.Title>
                    <Card.Text className="card-body-container d-flex flex-row">
                        <span>Jobs Completed</span>
                        <i className="bi bi-tools ms-lg-auto"></i>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card-sp-dashboard dashboard-button-sp-2 col-3">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="card-sp-dashboard-title">{ongoingjobs_count}</Card.Title>
                    <Card.Text className="card-body-container d-flex flex-row">
                        <span>Ongoing job</span>
                        <i className="bi bi-rocket-takeoff ms-lg-auto"></i>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card-sp-dashboard dashboard-button-sp-3 col-3">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="card-sp-dashboard-title">{pendingjobs_count}</Card.Title>
                    <Card.Text className="card-body-container d-flex flex-row">
                        <span>Pending Jobs</span>
                        <i className="bi bi-hourglass-top ms-lg-auto"></i>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="card-sp-dashboard dashboard-button-sp-4 col-3">
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="card-sp-dashboard-title">{trainingsession_count}</Card.Title>
                    <Card.Text className="card-body-container d-flex flex-row">
                        <span>Training Sessions</span>
                        <i className="bi bi-pass ms-lg-auto"></i>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Overview;