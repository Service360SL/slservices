import React, { useContext, useState } from "react";
import { ResetPasswordContext } from "../../ContextFiles/ResetPasswordContext";
import { useTimer } from 'use-timer'
import validator from "validator";
import format from 'format-duration' 

const ResetPasswordSendEmail = () => {

    const [isPasswordHidden, setIsPasswordHidden] = useState(true)

    const [passwordType, setPasswordType] = useState('password')

    const [password, setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    const [otp, setOtp] = useState('')

    const { addData } = useContext(ResetPasswordContext)

    const [isResendOtpDisabled, setIsResendOtpDisabled] = useState(true)

    const showHidePassword = () => {

        if (isPasswordHidden) {
            setPasswordType('text')
            setIsPasswordHidden(false)

        }
        else {

            setPasswordType('password')
            setIsPasswordHidden(true)

        }

    }

    const { time, start, pause, reset, status } = useTimer(

        {
            initialTime: 120,
            endTime: 0,
            timerType: 'DECREMENTAL',
            onTimeOver: () => {

                setIsResendOtpDisabled(false)

            },
            autostart: true

        }

    )

    const resendOtp = () => {

        setIsResendOtpDisabled(true)
        reset()
        start()

    }

    const [passwordErrorMessage, setPasswordErrorMessage] = useState(null)

    const [passwordValidationStyles, setPasswordValidationStyles] = useState("bg-warning my-0 p-2 mb-2 rounded")

    const validatePassword = (passwordInputValue) => {

        if (validator.isStrongPassword(passwordInputValue, {

            minLength: 8, minLowercase: 1, minUppercase: 1,
            minNumbers: 1, minSymbols: 1

        })) {

            setPasswordValidationStyles("bg-success my-0 p-2 mb-2 rounded")
            setPasswordErrorMessage('Valid password')

        }
        else {

            setPasswordValidationStyles("bg-info my-0 p-2 mb-2 rounded")
            setPasswordErrorMessage('Password requires to have one lower case, one uppercase, one number, one symbol and be minimum of 8 characters in lengths')

        }

        setPassword(passwordInputValue)

    }

    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState(null)

    const [confirmPasswordValidationStyles, setConfirmPasswordValidationStyles] = useState("bg-warning my-0 p-2 mb-2 rounded")

    const validateConfirmPassword = (confirmPasswordInputValue) => {

        if (password === confirmPasswordInputValue) {

            setConfirmPasswordValidationStyles("bg-success my-0 p-2 mb-2 rounded")
            setConfirmPasswordErrorMessage('Valid password')

        }
        else {

            setConfirmPasswordValidationStyles("bg-warning my-0 p-2 mb-2 rounded")
            setConfirmPasswordErrorMessage('Invalid password')

        }

        setConfirmPassword(confirmPasswordInputValue)

    }

    return (

        <div>

            <div className="mb-3">

                <h2 style={{ color: '#9f390d' }}>

                    Change Password

                </h2>

            </div>

            <form action="" className="my-4 mx-0">

                <div className="input-group mb-3">

                    <input type='text' className="form-control"
                        placeholder="Enter OTP code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        autoFocus
                    />

                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">

                        <i className="bi bi-lock-fill"></i>

                    </span>
                    <input type={passwordType} className="form-control"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                    />

                    <span className="input-group-text">

                        <button className="btn btn-outline-dark border-0"
                            type="button"
                            id="button-addon1" onClick={showHidePassword}>
                            {isPasswordHidden && <i className="bi bi-eye-slash-fill"></i>}
                            {!isPasswordHidden && <i className="bi bi-eye-fill"></i>}
                        </button>

                    </span>
                </div>

                {passwordErrorMessage && <div className={passwordValidationStyles}>

                    {passwordErrorMessage}

                </div>}

                <div className="input-group mb-3">
                    <span className="input-group-text">

                        <i className="bi bi-lock-fill"></i>

                    </span>
                    <input type={passwordType} className="form-control"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => validateConfirmPassword(e.target.value)}
                        required
                    />

                    <span className="input-group-text">

                        <button className="btn btn-outline-dark border-0"
                            type="button"
                            id="button-addon1" onClick={showHidePassword}>
                            {isPasswordHidden && <i className="bi bi-eye-slash-fill"></i>}
                            {!isPasswordHidden && <i className="bi bi-eye-fill"></i>}
                        </button>

                    </span>
                </div>

                {confirmPasswordErrorMessage && <div className={confirmPasswordValidationStyles}>

                    {confirmPasswordErrorMessage}

                </div>}

                <div className="text-center">

                    <div className="d-flex align-items-center justify-content-center pb-4">

                        <button className="btn btn-dark btn-block mx-2 w-50" type="button"
                            disabled={isResendOtpDisabled}
                            onClick={resendOtp}
                        >

                            <div className="flex-wrap">

                                Re-send OTP

                            </div>

                        </button>

                        <button className="btn btn-dark btn-block mx-2 w-50" type="button" onClick={() => { addData(otp, password) }}>

                            <div className="flex-wrap">

                                Reset Password

                            </div>

                        </button>

                    </div>


                </div>

                <div className="h6">

                    Didn't receive OTP? Resend Email after {format(time * 1000, { leading: true })}.

                </div>



            </form>

        </div>

    )


}

export default ResetPasswordSendEmail