import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import '../../../../style/Customer/Popup.css';
import axios from 'axios';

const CategoryPopup = ({ isOpen, onClose, onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [servicesData, setServicesData] = useState({}); // Store data as an object

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (typeof onSelectService === 'function') {
      onSelectService(service);
    }
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/services");
        const data = response.data;
        setServicesData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Convert the object into an array of categories
  const categories = Object.keys(servicesData);

  return (
    <Modal className show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header className='cuslocpopup' closeButton>
        <Modal.Title>Search Service</Modal.Title>
      </Modal.Header>
      <Modal.Body className='cusmodalcontent'>
        <div className='scrollable-content'>
          <input
            className='cuslocsearch'
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder='Search Service'
          />
          {categories.map((category) => (
            <div key={category}>
              <ul className='PlaceList'>
                {servicesData[category].map((service) => (
                  <li
                    key={service}
                    onClick={() => handleServiceSelect(service)}
                    className={selectedService === service ? 'selected' : ''}
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CategoryPopup;
