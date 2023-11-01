import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import { AuthenticationContext } from "../../ContextFiles/Authentication/AuthenticationContextProvider";

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

const StyledButton2 = styled.button`
    background-color: #292D32;
    width: 30%;
    @media (max-width: 768px) {
        width: 100%; 
        margin-top: 1rem; 
    }
    &:hover {
        background: #fff;
        border-color: #2596be;
        color: #9f390d;
    }
  `;


const AdStep2 = ({
    data: {
        shopAddress,
        shopAddressErrorMessage,
        shopName,
        shopNameErrorMessage,
        password,
        passwordType,
        isPasswordHidden,
        errorMessageStatus,
        confirmPasswordErrorMessage,
        confirmPassword,
        errorMessage,
        passwordErrorMessage,
        selectedFiles,
        fileErrorMessage,
    },
    handleChange,
    handleShowHidePassword,
    handlePreviousClick,
    handleSubmit,
    handlePasswordValidation,
    validateConfirmPassword,
    handleFileInputChange,
    handleRemoveFile,
}) => {

    const getFileNameFromPath = (path) => {
        const parts = path.split('/');
        return parts[parts.length - 1];
    };

    const { loading2 } = useContext(AuthenticationContext);

    return (

        <div>
            {loading2 && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            <form className="my-2 mx-4">

                <div className="mb-3">
                    <p className="mb-0">Shop Name<span style={{ color: 'red' }}>*</span></p>
                    <div className="align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your shop name"
                            value={shopName}
                            onChange={(e) => handleChange('shopName', e.target.value)}
                            required
                        />
                        {shopNameErrorMessage && <p className="text-danger p-0 m-0">{shopNameErrorMessage}</p>}
                    </div>
                </div>

                <div className="mb-3">
                    <p className="mb-0">Enter your shop Address<span style={{ color: 'red' }}>*</span></p>
                    <div className="align-items-center">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="No-06, Nelson Place, Colombo, Sri Lanka"
                            value={shopAddress}
                            onChange={(e) => handleChange('shopAddress', e.target.value)}
                            required
                        />
                        {shopAddressErrorMessage && <p className="text-danger p-0 m-0">{shopAddressErrorMessage}</p>}
                    </div>
                </div>


                <div className="mb-3">
                    <label className="mb-0">Upload Business Registration and Municipal Licenses<span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileInputChange}
                        multiple
                        required
                    />
                    {fileErrorMessage && <p className="text-danger p-0 m-0">{fileErrorMessage}</p>}
                    {Array.isArray(selectedFiles) && selectedFiles.length > 0 && (
                        <>
                            <ul className="list-group mt-2">
                                {selectedFiles.map((file, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        <span>{file.name}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="btn-close"
                                            aria-label="Remove"
                                        ></button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>


                <div className="mb-3 d-flex justify-content-between">
                    <div className='me-3'>
                        <p className="mb-0">Enter your Password<span style={{ color: 'red' }}>*</span></p>
                        <div className="input-group">
                            <input
                                type={passwordType}
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => handlePasswordValidation(e.target.value)}
                                required
                            />
                            <span className="input-group-text">
                                <button
                                    className="btn btn-outline-dark border-0"
                                    type="button"
                                    id="button-addon1"
                                    onClick={handleShowHidePassword}
                                >
                                    {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                </button>
                            </span>
                        </div>
                        {passwordErrorMessage && <p className="text-danger p-0 m-0">{passwordErrorMessage}</p>}
                    </div>

                    <div>
                        <p className="mb-0">Confirm Password<span style={{ color: 'red' }}>*</span></p>
                        <div className="input-group">
                            <input
                                type={passwordType}
                                className="form-control"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => validateConfirmPassword(e.target.value)}
                                required
                            />
                            <span className="input-group-text">
                                <button
                                    className="btn btn-outline-dark border-0"
                                    type="button"
                                    id="button-addon2"
                                    onClick={handleShowHidePassword}
                                >
                                    {isPasswordHidden ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill"></i>}
                                </button>
                            </span>
                        </div>
                        {confirmPasswordErrorMessage && <p className="text-danger p-0 m-0">{confirmPasswordErrorMessage}</p>}
                    </div>
                </div>

                {errorMessageStatus && (
                    <Alert variant="info" className="my-0 p-2 mb-2 rounded" dismissible>
                        <strong>info</strong>
                        <p className="d-flex justify-content-center"></p>{errorMessage}
                    </Alert>
                )}

                <div className="text-center">
                    <div className="d-flex align-items-center justify-content-between pb-4">
                        <StyledButton2 className="btn btn-dark btn-block" type="button" onClick={handlePreviousClick}>
                            Previous
                        </StyledButton2>
                        <StyledButton className="btn btn-dark btn-block" type="button" onClick={handleSubmit}>
                            Submit
                        </StyledButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdStep2;