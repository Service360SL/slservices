import React, { useState, useRef, useEffect, useContext } from 'react';
import image from '../../assets/images/header/Background.png';
import loginPhoto from '../../assets/images/home/Advertiser.jpeg';
import validator from 'validator';
import { AuthenticationContext } from "../../ContextFiles/Authentication/AuthenticationContextProvider";

import Step1 from './AdStep1';
import Step2 from './AdStep2';
import { set } from 'lodash';

const AdvertiserSignUP = () => {
    const [step, setStep] = useState(1);

    const { login } = useContext(AuthenticationContext);
    const { advertiserSignUp } = useContext(AuthenticationContext);

    // Step 1 state variables and handlers
    const [step1Data, setStep1Data] = useState({
        email: '',
        firstName: '',
        lastName: '',
        nicNumber: '',
        contactNumber: '',
        address: '',
        addressErrorMessage: '',
        emailStatus: false,
        emailErrorMessage: '',
        firstNameErrorMessage: '',
        lastNameErrorMessage: '',
        nicNumberErrorMessage: '',
        contactNumberErrorMessage: '',
    });

    const handleStep1Change = (field, value) => {
        setStep1Data((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // Step 2 state variables and handlers
    const [step2Data, setStep2Data] = useState({
        shopAddress: '',
        shopAddressErrorMessage: '',
        shopName: '',
        shopNameErrorMessage: '',
        password: '',
        confirmPassword: '',
        errorMessage: 'Password requires to have at least one lowercase, one uppercase, one number, one symbol, and be a minimum of 8 characters in length',
        isPasswordHidden: true,
        errorMessageStatus: false,
        confirmPasswordStatus: false,
        confirmPasswordErrorMessage: '',
        passwordType: 'password',
        passwordErrorMessage: '',
        selectedFiles: [],
        selectedFileCount: 0,
        fileErrorMessage: '',
        files: '',
    });

    const handleStep2Change = (field, value) => {

        setStep2Data((prevData) => ({
            ...prevData,
            [field]: value,
        }));

    };

    const handlePasswordValidation = (passwordInputValue) => {
        if (validator.isStrongPassword(passwordInputValue, {
            minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1
        })) {
            setStep2Data((prevData) => ({
                ...prevData,
                password: passwordInputValue,
                errorMessageStatus: false
            }));
        } else {
            setStep2Data((prevData) => ({
                ...prevData,
                password: passwordInputValue,
                errorMessageStatus: true
            }));
        }
    };

    const validateConfirmPassword = (confirmPasswordInputValue) => {
        const { password } = step2Data;

        if (password === confirmPasswordInputValue) {
            setStep2Data((prevData) => ({
                ...prevData,
                confirmPassword: confirmPasswordInputValue,
                confirmPasswordErrorMessage: '',
            }))
        } else {
            setStep2Data((prevData) => ({
                ...prevData,
                confirmPassword: confirmPasswordInputValue,
                confirmPasswordErrorMessage: 'Passwords do not match',
            }));
        }
    };

    const fileInputRef = useRef(null); // Ref to access the file input element

    useEffect(() => {
        // Update the input field value whenever the selectedFileCount changes
        if (fileInputRef.current) {
            fileInputRef.current.value = step2Data.selectedFileCount > 0 ? `${step2Data.selectedFileCount}` : '';
        }
    }, [step2Data.selectedFileCount]); // Update the dependency

    const handleStep2ShowHidePassword = () => {
        setStep2Data((prevData) => ({
            ...prevData,
            passwordType: prevData.isPasswordHidden ? 'text' : 'password',
            isPasswordHidden: !prevData.isPasswordHidden,
        }));
    };

    const setSelectedFileCount = (count) => {
        setStep2Data((prevData) => ({
            ...prevData,
            selectedFileCount: count,
        }));
    };

    const handleFileInputChange = (event) => {
        const files = event.target.files;

        setStep2Data((prevData) => ({
            ...prevData,
            selectedFiles: files,
            selectedFileCount: files.length,
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = `${files.length} files selected`;
        }
    };

    const handleRemoveFile = (index) => {
        setStep2Data((prevData) => ({
            ...prevData,
            selectedFiles: prevData.selectedFiles.filter((_, i) => i !== index),
            selectedFileCount: prevData.selectedFileCount - 1,
        }));

        if (fileInputRef.current) {
            if (step2Data.selectedFiles.length === 0) {
                fileInputRef.current.value = '';
            } else {
                fileInputRef.current.value = `${step2Data.selectedFiles.length} files selected`;
            }
        }
    };

    const handleStep2PreviousClick = () => {
        setStep(1);
    };

    const handleStep2Submit = () => {

        const { password, confirmPassword, selectedFileCount, shopAddress, shopName } = step2Data;

        let isError = false;
        let passwordErrorMessage = '';
        let confirmPasswordErrorMessage = '';
        let shopAddressErrorMessage = '';
        let shopNameErrorMessage = '';

        let fileErrorMessage = '';


        if (password.trim() === '') {
            isError = true;
            passwordErrorMessage = 'Password is required';
        }

        if (confirmPassword.trim() === '') {
            isError = true;
            confirmPasswordErrorMessage = 'Confirm password is required';
        }

        if (password !== confirmPassword) {
            isError = true;
            confirmPasswordErrorMessage = 'Passwords do not match';
        }

        if (selectedFileCount.length === 0) {
            isError = true;
            fileErrorMessage = 'Select at least one file';
        }

        if (shopAddress.trim() === '') {
            isError = true;
            shopAddressErrorMessage = 'Shop Address is required';
        }

        if (shopName.trim() === '') {
            isError = true;
            shopNameErrorMessage = 'Shop Name is required';
        }

        setStep2Data((prevData) => ({
            ...prevData,
            passwordErrorMessage,
            confirmPasswordErrorMessage,
            shopNameErrorMessage,
            fileErrorMessage,
            shopAddressErrorMessage,
        }));

        if (!isError) {
            advertiserSignUp({
                email: step1Data.email,
                password: step2Data.password,
                firstname: step1Data.firstName,
                lastname: step1Data.lastName,
                nic: step1Data.nicNumber,
                phonenumber: step1Data.contactNumber,
                address: step1Data.address,
                shopaddress: step2Data.shopAddress,
                shopname: step2Data.shopName,
                files: step2Data.selectedFiles,
            });

        }

    };

    const handleStep1NextClick = () => {
        const { email, firstName, lastName, nicNumber, contactNumber, address } = step1Data;

        let isError = false;
        let emailErrorMessage = '';
        let firstNameErrorMessage = '';
        let lastNameErrorMessage = '';
        let nicNumberErrorMessage = '';
        let contactNumberErrorMessage = '';
        let addressErrorMessage = '';

        if (!validator.isEmail(email)) {
            isError = true;
            emailErrorMessage = 'Invalid email';
        }

        if (email.trim() === '') {
            isError = true;
            emailErrorMessage = 'email is required';
        }

        if (!validator.isAlpha(firstName)) {
            isError = true;
            firstNameErrorMessage = 'Should contain only letters';
        }

        if (!validator.isAlpha(lastName)) {
            isError = true;
            lastNameErrorMessage = 'Should contain only letters';
        }

        if (!validator.isNumeric(contactNumber)) {
            isError = true;
            contactNumberErrorMessage = 'Should contain only digits';
        }

        if (address.trim() === '') {
            isError = true;
            addressErrorMessage = 'Residential Address required';
        }

        if (contactNumber.length !== 10) {
            isError = true;
            contactNumberErrorMessage = 'Invalid contact number';
        }

        if (!/^(\d{9}[vV]|\d{12})$/.test(nicNumber)) {
            isError = true;
            nicNumberErrorMessage = 'Invalid NIC number';
        }

        if (firstName.trim() === '') {
            isError = true;
            firstNameErrorMessage = 'First name is required';
        }

        if (lastName.trim() === '') {
            isError = true;
            lastNameErrorMessage = 'Last name is required';
        }

        if (nicNumber.trim() === '') {
            isError = true;
            nicNumberErrorMessage = 'NIC is required';
        }

        if (contactNumber.trim() === '') {
            isError = true;
            contactNumberErrorMessage = 'Contact number is required';
        }

        if (!isError) {
            setStep(2);
        }

        setStep1Data((prevData) => ({
            ...prevData,
            emailErrorMessage,
            firstNameErrorMessage,
            lastNameErrorMessage,
            nicNumberErrorMessage,
            contactNumberErrorMessage,
            addressErrorMessage,
        }));
    };

    return (
        <div className="h-100" style={{ backgroundImage: `url(${image})` }}>
            <section className="h-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10 offset-sm-2 offset-lg-4 offset-xl-0 my-lg-1 py-lg-1 my-xl-0 py-xl-0">
                            <div className="rounded-3 text-black my-lg my-xl-0 py-xl-0">
                                <div className="row g-0">

                                    <div className='col-xl-6'>
                                        <div className="p-md-1 mx-xs-2 my-5 bg-white rounded-lg justify-content-center align-items-center shadow-lg"
                                            style={{ backgroundColor: '#ffffff', maxWidth: '600px', borderRadius: '1rem', objectFit: 'cover' }}>
                                            <div className="mb-0 p-0">
                                                <div className="d-flex justify-content-between">
                                                    <p className='pt-4 px-4 flex-wrap fs-5'>
                                                        welcome to <span className="fs-2 fw-bold pb-2" style={{ fontFamily: 'Roboto', color: '#9F390D' }}>Service360</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex pb-1">
                                                    <h1 className="fw-bold px-4">SignUp</h1>
                                                </div>
                                            </div>
                                            {/* Step 1 */}
                                            {step === 1 && (
                                                <Step1
                                                    data={step1Data} // Change "data" to "step1Data"
                                                    handleChange={handleStep1Change}
                                                    handleNextClick={handleStep1NextClick}
                                                />
                                            )}
                                            {/* Step 2 */}
                                            {step === 2 && (
                                                <Step2
                                                    data={step2Data}
                                                    handleChange={handleStep2Change}
                                                    handleShowHidePassword={handleStep2ShowHidePassword}
                                                    handlePreviousClick={handleStep2PreviousClick}
                                                    handleSubmit={handleStep2Submit}
                                                    handlePasswordValidation={handlePasswordValidation}
                                                    validateConfirmPassword={validateConfirmPassword}
                                                    handleFileInputChange={handleFileInputChange}
                                                    handleRemoveFile={handleRemoveFile}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-xl-6 my-5 justify-content-center align-items-center rounded" style={{ background: `url(${loginPhoto})`, objectFit: 'cover' }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdvertiserSignUP;