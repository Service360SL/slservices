import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import cityData from './cities-by-district.json';

const StyledButton = styled.button`
    background-color: #292D32; 
    width: 30%;
    @media (max-width: 768px) {
      width: 50%; 
      margin-top: 1rem; 
    }
    &:hover {
      background: #fff;
      border-color: #2596be;
      color: #9f390d;
    }
  `;

const Step1 = ({
  data: {
    email,
    firstName,
    lastName,
    nicNumber,
    contactNumber,
    address,
    district,
    city,
    emailErrorMessage,
    firstNameErrorMessage,
    lastNameErrorMessage,
    nicNumberErrorMessage,
    contactNumberErrorMessage,
    addressErrorMessage,
    districtErrorMessage,
    cityErrorMessage,
  },
  handleChange,
  handleNextClick,
}) => {
  const { LoginLink } = '';

  const customFontStyle = {
    fontFamily: "Roboto",
    color: '#9F390D'
  };

  return (
    <form className="my-2 mx-4">
      <div className="mb-2">
        <p className="mb-0">Enter your email address<span style={{ color: 'red' }}>*</span></p>
        <div className="align-items-center">
          <input
            type="email"
            className="form-control"
            placeholder="Service360@gmail.com"
            value={email}
            onChange={(e) => handleChange('email', e.target.value)}
            autoFocus
            required
          />
          {emailErrorMessage && <p className="text-danger p-0 m-0">{emailErrorMessage}</p>}
        </div>
      </div>

      <div className="justify-content-between mb-3 d-flex">
        <div className='me-xs-3 col-xs-6 me-sm-0'>
          <p className="mb-0">First Name<span style={{ color: 'red' }}>*</span></p>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
          {firstNameErrorMessage && <p className="text-danger p-0 m-0">{firstNameErrorMessage}</p>}
        </div>

        <div className='col-xs-5'>
          <p className="mb-0">Last Name<span style={{ color: 'red' }}>*</span></p>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
          {lastNameErrorMessage && <p className="text-danger p-0 m-0">{lastNameErrorMessage}</p>}
        </div>
      </div>

      <div className="justify-content-between mb-3 d-flex ">
        <div className='me-0 col-xs-6'>
          <p className="mb-0">NIC Number<span style={{ color: 'red' }}>*</span></p>
          <input
            type="text"
            className="form-control"
            placeholder="Enter NIC number"
            value={nicNumber}
            onChange={(e) => handleChange('nicNumber', e.target.value)}
            required
          />
          {nicNumberErrorMessage && <p className="text-danger p-0 m-0">{nicNumberErrorMessage}</p>}
        </div>

        <div className='col-xs-5'>
          <p className="mb-0">Contact Number<span style={{ color: 'red' }}>*</span></p>
          <input
            type="text"
            className="form-control"
            placeholder="0771234567"
            value={contactNumber}
            onChange={(e) => handleChange('contactNumber', e.target.value)}
            required
            maxLength={10}
          />
          {contactNumberErrorMessage && <p className="text-danger p-0 m-0">{contactNumberErrorMessage}</p>}
        </div>
      </div>

      <div className="mb-3">
        <p className="mb-0">Enter your Residential Address<span style={{ color: 'red' }}>*</span></p>
        <div className="align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="No-06, Nelson Place, Colombo, Sri Lanka"
            value={address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
          />
          {addressErrorMessage && <p className="text-danger p-0 m-0">{addressErrorMessage}</p>}
        </div>
      </div>

      <div className="justify-content-between mb-3 d-flex">
        <div className='me-0 col-xs-6'>
          <p className="mb-0">Select the District<span style={{ color: 'red' }}>*</span></p>
          <select 
            className="form-select"
            value={district}
            onChange={(e) => handleChange('district', e.target.value)}
            required
          >
            <option value="">Select District</option>
            {Object.keys(cityData).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {districtErrorMessage && <p className="text-danger p-0 m-0">{districtErrorMessage}</p>}
        </div>

        <div className='col-xs-5'>
          <p className="mb-0">Select the city<span style={{ color: 'red' }}>*</span></p>
          <select
            className="form-select"
            value={city}
            onChange={(e) => handleChange('city', e.target.value)}
            required
          >
            <option value="">Select the corresponding City</option>
            {district && cityData[district].cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {cityErrorMessage && <p className="text-danger p-0 m-0">{cityErrorMessage}</p>}
        </div>
      </div>

      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center justify-content-xl-end pb-4">
          <StyledButton className="btn btn-dark btn-block" type="button" onClick={handleNextClick}>
            Next
          </StyledButton>
        </div>
        <p> Have an account? <Link className="text-primary" to="/login"> Login </Link> </p>
      </div>
    </form>
  );
};

export default Step1;