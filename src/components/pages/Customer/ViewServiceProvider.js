import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ServiceProvideimg from '../../../assets/images/Customer/ServiceProvider1.png';
import img1 from '../../../assets/images/Customer/sofaclean1.jpg';
import img2 from '../../../assets/images/Customer/sofaclean2.jpg';
import img3 from '../../../assets/images/Customer/sofaclean3.jpeg';
import '../../../style/Customer/ViewServiceProvider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faComment, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { error } from 'jquery';
// import { Link } from 'react-router-dom';
// import { useEffect } from 'react';
// import axios from 'axios';

function ViewServiceProvider() {
  const [viewSpBlogs, setViewSpBlogs] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); 

  const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

  const rating = 4;
  const { id } = useParams();

  const { serviceproviderid } = useParams();
  const serviceProviderId = parseInt(id, 10);

  // const ViewServiceProvider = ({ match }) => {
  //   const rating = 4; 

  //   const serviceproviderid = match.params.id;

  //   useEffect(() => {
  //     axios.get('http://localhost:8080/auth/details/${serviceproviderid}')
  //       .then((response) => {
  //           setServiceProvider(response.data);

  //       })
  //       .catch((error) => {
  //         console.error(error);
  //     });
  //   }, [serviceproviderid]);

  const [serviceProvider, setServiceProvider] = useState({});

  const getServiceProvider=async()=>{
    const data=await axios.get("http://localhost:8080/auth/details")
    const filteredData = data.data.filter(item => item.userid == id);
    setServiceProvider(filteredData[0])

  }

  useEffect(() => {
    getServiceProvider();
  });

  useEffect(() => {
    axios.get('http://localhost:8080/auth/viewServiceProviderBlogs',{
      params:{
        serviceproviderid:serviceProviderId
      }
    }).then((res) => {
        console.log(res.data);
        setViewSpBlogs(res.data);
    });
  }, []);

  if (!viewSpBlogs) return 'No jobs found!';

  const handlePrev = () => {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : viewSpBlogs.blogs.length - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex < viewSpBlogs.blogs.length - 1 ? activeIndex + 1 : 0);
  };

  // Get all images from the training sessions
  const blogImagesArray = viewSpBlogs.blogimages;

  // Initialize an empty array to store all images
  const allImages = [];

  // Iterate through trainingSessionImagesArray
  blogImagesArray.forEach((sessionImages) => {
  // Check if the current object has an 'images' property
  if (sessionImages.hasOwnProperty('images') && Array.isArray(sessionImages.images)) {
      // Concatenate the 'images' array to the 'allImages' array
      allImages.push(...sessionImages.images);
  }
  });

  return (
    <div>
    <div className="back-button" onClick={handleBackClick}>
                <div className="back-icon">
                    <i className="bi bi-arrow-left-circle-fill fs-3"></i>
                </div>
                <div className="back-text">
                    <p className="m-0 p-0">Back</p>
                </div>
            </div>
            

    <div className="SPBox ">
      <img className='SPImg' src={serviceProvider.profilePic} alt="profile-image" />
      <div className='SPProfile'>
        <span className='SPname'>{serviceProvider.firstname} {" "} {serviceProvider.lastname}</span>
        {/* <span className='SPActive'> Last Active 5 days ago </span> */}
        <div class="SPDetail">
          <p className='p1'> Member Since {serviceProvider.registrationdate} </p>
          <p className='p1'> Service : {serviceProvider.serviceCategories.map((category, categoryIndex) => (
              <span key={categoryIndex}>
                {category.services.map((service, serviceIndex) => (
                  <span key={serviceIndex}>
                    {service}
                    {serviceIndex < category.services.length - 1 && ', '}
                  </span>
                ))}
                {categoryIndex < serviceProvider.serviceCategories.length - 1 && ', '}
              </span>
            ))}  &nbsp; 
          | &nbsp; Location : {serviceProvider.district}</p>
          <p className='p1'> </p>
          {/* <p className='Des border p-3' >{serviceProvider.description}</p> */}
        </div>

        <div className='SPContact'>
          <div className='contacticon'>
            <a href="#getcall" className='SPNo'>
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; &nbsp; {serviceProvider.phonenumber}
            </a>
          </div>
        </div> 

        <hr className='line'></hr>

        <div className='SPReqButtons'>
          <Link to={`/customer/JobRequest`}>
            <button className='SPRequestjob'> Request for job </button>
          </Link>


          {/* <Link to={`/customer/Quotation`}>
            <button className='SPRequestquotation'> Request for quotation</button>
          </Link>  */}
        </div>

         <div className='SPRatings'>
          <p className='ratereview'> Ratings and Reviews </p>
          <div className='rating'>
            <span className={`star ${rating >= 1 ? 'filled' : ''}`}>&#9733;</span>
            <span className={`star ${rating >= 2 ? 'filled' : ''}`}>&#9733;</span>
            <span className={`star ${rating >= 3 ? 'filled' : ''}`}>&#9733;</span>
            <span className={`star ${rating >= 4 ? 'filled' : ''}`}>&#9733;</span>
            <span className={`star ${rating >= 5 ? 'filled' : ''}`}>&#9733;</span>
          </div>

          <Card style={{ width: 'auto' }}>
            <Card.Body>
              <Card.Title>Diana</Card.Title>
              <div className='rating'>
                <span className={`star ${rating >= 1 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 2 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 3 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 4 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 5 ? 'filled' : ''}`}>&#9733;</span>
              </div>
              <Card.Text>
                Nice experience 👍
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br> <br></br>

          <Card style={{ width: 'auto' }}>
            <Card.Body>
              <Card.Title>Diana</Card.Title>
              <div className='rating'>
                <span className={`star ${rating >= 1 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 2 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 3 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 4 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 5 ? 'filled' : ''}`}>&#9733;</span>
              </div>
              <Card.Text>
                Nice experience 👍
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br> <br></br>
          <Card style={{ width: 'auto' }}>
            <Card.Body>
              <Card.Title>Diana</Card.Title>
              <div className='rating'>
                <span className={`star ${rating >= 1 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 2 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 3 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 4 ? 'filled' : ''}`}>&#9733;</span>
                <span className={`star ${rating >= 5 ? 'filled' : ''}`}>&#9733;</span>
              </div>
              <Card.Text>
                Nice experience 👍
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        
        {/* BLOGS SECTION */}
        <br />
        <div className='SPblogs'>
          <p className='blogstitle fs-5'> Blogs </p>

    
          {viewSpBlogs.blogs.map((Blog, index) => {
              // Find the matching training session images
              const matchingSessionImages = blogImagesArray.find(sessionImages => sessionImages.id === Blog.blogid);

              // Extract the images array if found, or provide an empty array as a default value
              const imagesArray = matchingSessionImages ? matchingSessionImages.images : [];

              return(
                <div
                  key={index}
                  className={`blogs-container border border-secondary p-4 ${index !== activeIndex ? 'd-none' : ''}`}
                  style={{ borderRadius: "5px" }}
                >
                    <div className='SPImageCarousel'>

                    <Carousel interval={null}>
                        {imagesArray.map((image, imgIndex) => (
                          <Carousel.Item key={imgIndex}>
                            <img
                              className='d-block w-100 img-fluid'
                              src={`data:image/jpg;base64,${image}`}
                              alt={`Blog Image ${imgIndex + 1}`}
                              style={{ maxHeight: '300px', objectFit: 'cover' }}
                            />
                          </Carousel.Item>
                        ))}
                    </Carousel>
                    </div><br/>

                    <div className="d-flex flex-row">
                      <div>
                        <p className='blogtitle' style={{ fontWeight: "600" }}> {Blog.blogtitle} </p>
                      </div>
                      <div className='ms-auto'>
                        <span className='blog-service'>{Blog.servicename}</span>
                      </div>
                    </div>
                    <p className='blogdescription'> {Blog.blogdescription} </p>
                </div>
            );
         })}

          <div className="d-flex blog-bt-container justify-content-center">
            <div className="blog-bt-left me-3">
              <Button className='btn-ServiceProvider-2' onClick={handlePrev}>&lt;</Button>
            </div>
            <div className="blog-bt-right ms-3">
              <Button className='btn-ServiceProvider-2' onClick={handleNext}>&gt;</Button>
            </div>
          </div>
          
        </div>
      {/* </div> */}
    </div>
    </div>
  </div>
    

  );
};

export default ViewServiceProvider;