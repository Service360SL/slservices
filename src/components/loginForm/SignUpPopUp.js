import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function SignUpPopUp() {
    const [topRightModal, setTopRightModal] = useState(false);

    const toggleShow = () => setTopRightModal(!topRightModal);

    return (
        <>
            <Button onClick={toggleShow}>Top right</Button>

            <Modal show={topRightModal} onHide={toggleShow} dialogClassName="modal-top-right">
                <Modal.Header closeButton className="bg-info text-white">
                    <Modal.Title>Product in the cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-3 text-center'>
                            <i className='fas fa-shopping-cart fa-4x text-info'></i>
                        </div>

                        <div className='col-9'>
                            <p>Do you need more time to make a purchase decision?</p>
                            <p>No pressure, your product will be waiting for you in the cart.</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info">Go to the cart</Button>
                    <Button variant="outline-info" onClick={toggleShow}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}