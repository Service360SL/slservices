import React, { useEffect, useState } from 'react';
import '../../../style/ServiceProvider/TrainingSessionRegistration.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import verified from '../../../assets/images/ServiceProvider/verified.png';
import unverified from '../../../assets/images/ServiceProvider/unverified.png';

function TrainingSessionVerification() {
    const [isMobileNumberValid, setIsMobileNumberValid] = useState(false);

    const { mobilenumber } = useParams();
    const mobileNumber = mobilenumber; 

    console.log(mobileNumber);

    useEffect(() => {
        axios.get('http://localhost:8080/auth/verifyQR', {
                params: {
                    mobileNumber: mobileNumber
                }
        }).then((response) => {
            if (response.data) {
                setIsMobileNumberValid(true);
            } else {
                setIsMobileNumberValid(false);
            }
        })
    }, []);

    return (
        <div className='Training-Registration-Container index-container ms-lg-4 me-lg-5 p-sm-5 p-3 border rounded'>
            {isMobileNumberValid ? (
                <div className="Training-Registration-Inner-Container" style={{ textAlign: 'center' }}>
                    <img
                        src={verified}
                        alt="Valid Mobile Number"
                        style={{ width: '150px', height: '150px', padding: '30px' }}
                    />
                    <p className='Training-session-registration-body'>Entrance Granted: Customer Verified Successfully</p>
                </div>
            ) : (
                <div className="Training-Registration-Inner-Container" style={{ textAlign: 'center' }}>
                    <img
                        src={unverified}
                        alt="Invalid Mobile Number"
                        style={{ width: '150px', height: '150px', padding: '30px' }}
                    />
                    <p className='Training-session-registration-body'>Verification Unsuccessful: Customer Not Verified</p>
                </div>
            )}
        </div>
    );
}

export default TrainingSessionVerification;