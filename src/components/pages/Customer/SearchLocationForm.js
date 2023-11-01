// SearchLocationForm.js
import React, { useState } from 'react';

const SearchLocationForm = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search or other actions with the 'location' state
    console.log('Search location:', location);
    onClose(); // Close the popup after performing the action
  };

  if (!isOpen) return null;

  return (
    <div className="search-location-form-overlay">
      <div className="search-location-form-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default SearchLocationForm;