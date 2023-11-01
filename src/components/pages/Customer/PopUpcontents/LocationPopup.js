import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../../../style/Customer/Popup.css';
import citiesByDistrict from '../../../loginForm/cities-by-district.json';
import { NavDropdown } from 'react-bootstrap';

const LocationPopup = ({ isOpen, onClose, onSearchLocation, onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (selectedLocation) {
      setSearchQuery(selectedLocation);
    }
  }, [selectedLocation]);

  const handleSearchChange = (event) => {
    const location = event.target.value;
    setSearchQuery(location);
    onSearchLocation(location);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    if (typeof onSelectLocation === 'function') {
      onSelectLocation(location);
    }
    onClose();
  };

  // Extract and sort all cities from your JSON data
  const allCities = Object.values(citiesByDistrict).reduce(
    (cities, location) => cities.concat(location.cities),
    []
  );

  const sortedCities = allCities.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

  const filteredCities = sortedCities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal className show={isOpen} onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header className="cuslocpopup" closeButton>
        <Modal.Title>Search Location</Modal.Title>
      </Modal.Header>
      <Modal.Body className="cusmodalcontent">
        <div className="scrollable-content">
          <input
            className="cuslocsearch"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Enter Your Location"
          />
          <ul className="PlaceList">
            {filteredCities.map((city) => (
              <li
                key={city}
                onClick={() => handleLocationSelect(city)}
                className={selectedLocation === city ? 'selected' : ''}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LocationPopup;
