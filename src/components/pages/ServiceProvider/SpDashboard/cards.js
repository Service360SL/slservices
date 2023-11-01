import Card from 'react-bootstrap/Card';
import '../../../../style/ServiceProvider/Dashboard.css'
import schedule_event from '../../../../assets/images/ServiceProvider/schedule event.jpg'
import services_img from '../../../../assets/images/ServiceProvider/my_services.jpg'
import blog_img from '../../../../assets/images/ServiceProvider/my_blog.jpg'
import { Link } from 'react-router-dom';

function BasicExample() {
    return (
        <div className='dashboard-bottom-card-container d-flex flex-row ms-lg-4 me-lg-4 mt-3'>

            <Card className="dashboard-pages col-md-3 col-12">
                <img className="card-img-top" src={services_img} alt="my profile" />
                <Card.Body>
                    <Card.Text className='card-text-container d-flex align-items-center flex-row'>
                        <span>Ongoing Projects</span>
                        <span className="d-flex ms-auto">
                            <Link to="/ServiceProvider/MyProjectsJobs?tab=ongoing">
                                <i className="bi bi-arrow-right-circle" style={{ color: "black" }}></i>
                            </Link>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="dashboard-pages col-md-3 col-12">
                <img className="card-img-top" src={schedule_event} alt="my profile" />
                <Card.Body>
                    <Card.Text className='card-text-container d-flex align-items-center flex-row'>
                        <span>Schedule an event</span>
                        <span className="d-flex ms-auto">
                            <Link to="/ServiceProvider/AvailabilityCalendar" style={{ color: "black" }}>
                                <i className="bi bi-arrow-right-circle"></i>
                            </Link>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card className="dashboard-pages col-md-3 col-12">
                <img className="card-img-top" src={blog_img} alt="my profile" />
                <Card.Body>
                    <Card.Text className='card-text-container d-flex align-items-center flex-row'>
                        <span>My Training Sessions</span>
                        <span className="d-flex ms-auto">
                            <Link to="/ServiceProvider/MyTrainingSessions">
                                <i className="bi bi-arrow-right-circle" style={{ color: "black" }}></i>
                            </Link>
                        </span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

    );
}

export default BasicExample;