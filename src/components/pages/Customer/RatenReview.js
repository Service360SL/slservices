import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../style/Customer/RatenReview.css';
import ServiceProvideimg from '../../../assets/images/Customer/ServiceProvider1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';

function RatenReview() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);


  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
      <Modal.Dialog className='rnrmodaldialog'>
        <Modal.Header className='rnrheader'>
          <Modal.Title className='rnrtitle'> Rate & Review </Modal.Title>
        </Modal.Header>

        <Modal.Body className='rnrbody'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={ServiceProvideimg}
              alt="profile-image"
              style={{
                height: 'auto',
                maxWidth: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div className='rnrcontent'>
            <p> Alex </p>
            <p> Rate your Experience </p>
            <div className="rnrrating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={star <= rating ? solidStar : regularStar}
                  onClick={() => handleRatingClick(star)}
                  className={star <= rating ? 'solid-star' : 'regular-star'}
                />
              ))}
            </div>
            <p> Give us your feedback and leave us review</p>
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Enter your rating"
              className='rnrtextarea'
            />
          </div>

        </Modal.Body>
        <Modal.Footer className='rnrfooter'>
          <Button className="rnrbtn1">
            Post
          </Button>
          <Button className="rnrbtn2" >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default RatenReview;