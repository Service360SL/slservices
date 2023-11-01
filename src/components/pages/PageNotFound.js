import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Layout404 from '../layout/Layout404';

function PageNotFound() {
    return (
        <Layout404>
            <Container className="text-center mt-5">
                <h1>404 Page Not Found</h1>
                <p style={{ color: 'grey' }}>
                    Go to <Link to="/">Home Page</Link>
                </p>
            </Container>
        </Layout404>
    );
}

export default PageNotFound;