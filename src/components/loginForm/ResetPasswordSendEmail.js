import React, { useState, useContext } from "react";
import { ReactLinkContext } from "../../ContextFiles/ReactLinkContext";
import { Link } from "react-router-dom";
import { ResetPasswordContext } from "../../ContextFiles/ResetPasswordContext";
import validator from "validator";

const ResetPasswordSendEmail = () => {


    const [email, setEmail] = useState('')

    const { LoginLink } = useContext(ReactLinkContext)

    const { addEmail } = useContext(ResetPasswordContext)

    const [isEmailValid, setIsEmailValid] = useState(null)

    const submitButton = () => {

        if (validator.isEmail(email)) {

            addEmail(email)
            setIsEmailValid(null)

        } else {

            setIsEmailValid('Email not valid')

        }


    }

    return (

        <div>

            <div className="mb-3">

                <div>

                    <h2 style={{ color: '#9f390d' }}>

                        Don't worry

                    </h2>

                    <p>

                        We are here to help you to recover your password. Enter the email address you used when you joined and we'll send you an OTP to your email.

                    </p>

                </div>

            </div>

            <div className="my-4 mx-0">

                <div className="input-group mb-3">

                    <span className="input-group-text">

                        <i className="bi bi-envelope-fill"></i>

                    </span>

                    <input type="email" className="form-control"
                        placeholder="service.360.50@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        required
                    />

                </div>

                {isEmailValid && <p className="text-center text-danger p-0 mb-3"> Email not valid </p>}

                <div className="text-center">

                    <div className="d-flex align-items-center justify-content-center pb-4">

                        
                            <button className="btn btn-dark btn-block mx-2 w-50 justify-content-center" type="button">

                            <div className="flex-wrap">
                                
                                <Link to={LoginLink} className="button-link" style={{ color: '#fff' }}>

                                    <i className="bi bi-arrow-left-short"></i>Close
                                </Link>

                                </div>

                            </button>
                        

                        <button className="btn btn-dark mx-2 w-50 justify-content-center" type="button" onClick={submitButton}>

                            <div className="flex-wrap">

                                Continue <i className="bi bi-arrow-right-short"></i>

                            </div>

                        </button>

                    </div>


                </div>



            </div>

        </div>

    )


}

export default ResetPasswordSendEmail