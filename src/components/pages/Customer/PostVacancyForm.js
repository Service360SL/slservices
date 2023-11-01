import React from 'react';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../../../style/Customer/PostVacancyForm.css';
import BgImage from '../../../assets/images/header/Background.png';


function PostVacancyForm() {
    return (
        <div className='card2' >

            <div className="VacancyForm-container" style={{ backgroundImage: `url(${BgImage})` }}>

                <h3>Vacancy Creation Form</h3>

                <form className="vacancy-form">
                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="title">Company Name <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6"><input type="text" name="company_name" className="form-control" id="company_name" placeholder="Enter the company name" /></Col>
                        </Row>
                    </div>
                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="Service_name ">Service Name <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Select id="disabledSelect" className="select-small-text">
                                        <option value="Carpentry">Carpentry</option>
                                        <option value="Painting">Painting</option>
                                        <option value="AC_Repair">AC Repair</option>
                                        <option value="Electrical_Wiring">Electrical Wiring</option>
                                        <option value="Plumbing">Plumbing</option>
                                        <option value="Masonry">Masonry</option>
                                        <option value="Tiles_Fitting">Tiles Fitting</option>
                                        <option value="Iron_Works">Iron Works</option>
                                        <option value="Glass_Aluminum">Glass Aluminum</option>
                                        <option value="CCTV_Repair">CCTV Repair</option>
                                        <option value="Fire_Alarm">Fire Alarm</option>
                                        <option value="Video_Surveillance">Video Surveillance</option>
                                        <option value="Sofa_cleaning">Sofa cleaning</option>
                                        <option value="Carpet_cleaning">Carpet cleaning</option>
                                        <option value="none">None</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col></Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="location">Location <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            {/* <input type="text" name="location" className="form-control" id="location" /> */}
                            <Col className="col-6">
                                <Form.Group className="mb-3">
                                    <Form.Select id="disabledSelect" className="select-small-text">
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
                                </Form.Group>
                            </Col></Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="duedate">Due Date <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6">  <input type="date" name="duedate" className="form-control" id="duedate" />
                            </Col></Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="category">Employment Type<span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6">
                                <select className="form-control" id="category" name="category">
                                    <option value="Full_Time">Full Time</option>
                                    <option value="Hours_based">Hours based</option>
                                    <option value="none">None</option>
                                </select></Col> </Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="title">Salary <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6"><input type="text" name="salary" className="form-control" id="salary" placeholder="Enter the salary" /></Col>
                        </Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="title">Skill & Qualification Expect <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6"><input type="text" name="qualification" className="form-control" id="qualification" placeholder="Type here" /></Col>
                        </Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="title">Responsibilities Expect <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6"><input type="text" name="responsibilities" className="form-control" id="responsibilities" placeholder="Type here" /></Col>
                        </Row>
                    </div>

                    <div className="vacancy-form-group">
                        <Row><Col className="col-4">
                            <label for="title">Any Information <span style={{ color: "red" }}>&nbsp;*</span> </label></Col>
                            <Col className="col-6"><input type="text" name="information" className="form-control" id="information" placeholder="Type here" /></Col>
                        </Row>
                    </div>

                    <div className="vacancy-form-group">
                        <label for="file" >Upload image of need</label>
                        <input type="file" name="file" className="form-control" id="file" />
                    </div>
                    <Row className="vacancy-form-group-buttons mt-3">
                        <Col>
                            <input type="Submit" value="Create" className="btn btn-vacancy-form-k" />
                        </Col>
                        <Col>
                            <a id="cancel-link" href="#"><button>Cancel</button></a>
                        </Col>
                    </Row>
                </form>
            </div></div>
    );




};

export default PostVacancyForm;

