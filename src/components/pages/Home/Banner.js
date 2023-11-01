import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
// import { AuthenticationContext } from "../../ContextFiles/Authentication/AuthenticationContextProvider";
import { Link } from 'react-router-dom';

var heroData = [
    {
        id: 1,
        image: require('../../../assets/images/home/Banner-9_9.jpeg'),
        title: 'Get Your Services Done Faster',
        description: `Looking for efficient and reliable service providers? We've got you covered! Discover a diverse range of skilled professionals who are ready to deliver exceptional results.
        Say goodbye to delays and hassle - hire the right service provider today and experience the convenience of swift, top-notch services at your doorstep.`,
        buttonTitle: 'I WANT TO HIRE',
        link: 'https://localhost:3000/login'
    },
    {
        id: 2,
        image: require('../../../assets/images/home/Banner-10_10.jpeg'),
        title: 'Join Our Service Provider Network',
        description: `Are you a skilled professional seeking new opportunities? Join our service provider network and showcase your expertise to a wide range of potential clients.
        Don't miss out on the chance to connect with like-minded professionals, collaborate on exciting projects, and build a thriving business.`,
        buttonTitle: 'I WANT TO WORK',
        link: 'https://localhost:3000/login'
    },
    {
        id: 3,
        image: require('../../../assets/images/home/Banner-11_11.jpeg'),
        title: 'Advertise Your Business to a Wide Audience',
        description: 'Boost your business visibility by reaching a large audience through our platform. Advertise your products and services to potential customers who are actively seeking solutions. Our advertising options allow you to target specific demographics, maximize exposure, and increase brand awareness. Drive traffic to your business and achieve your marketing goals.',
        buttonTitle: 'ADD ADVERTISEMENTS',
        link: 'https://localhost:3000/login'
    }
]

function AppHero() {
    // const { login } = useContext(AuthenticationContext)

    return (
        <section id='home' className="hero-block mt-0">
            <Carousel>
                {
                    heroData.map((item) => {
                        return (
                            <Carousel.Item key={item.id}>
                                <img
                                    className="d-block w-100"
                                    src={item.image}
                                    alt={"Slide " + item.id}
                                />
                                <Carousel.Caption>
                                    <h1 style={{ fontSize: '3.5em' }}>{item.title}</h1>
                                    <p>{item.description}</p>
                                    <Link className='btn btn-primary d-none d-sm-inline' to="/login">{item.buttonTitle} <i className="fas fa-chevron-right"></i></Link>
                                </Carousel.Caption>
                            </Carousel.Item>
                        );

                    })
                }

            </Carousel>
        </section>
    );
}

export default AppHero;