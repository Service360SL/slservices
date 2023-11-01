import React, { useContext } from "react";
import { Link } from "react-router-dom";
import loginPhoto from '../../assets/images/home/login.png'
import ResetPasswordSendEmail from './ResetPasswordSendEmail'
import ReactLinkContextProvider from '../../ContextFiles/ReactLinkContext'
import ChangePassword from "./ChangePassword";
import { ResetPasswordContext } from "../../ContextFiles/ResetPasswordContext";
import image from '../../assets/images/header/Background.png'

const ResetPassword = () => {

    const { email } = useContext(ResetPasswordContext)

    return (

        <div className="h-100" style={{ backgroundImage: `url(${image})` }}>

            <section className="h-100">

                <div className="container py-5 h-100">

                    <div className="row d-flex justify-content-center align-items-center h-100">

                        <div className="col-xl-10 my-5 py-2 my-lg-1 py-lg-1 my-xl-0 py-xl-0">

                            <div className="card rounded-3 text-black my-lg-1 my-xl-0 py-xl-0" style={{ backgroundColor: '#d7d7d7' }}>

                                <div className="row g-0">

                                    <div className="col-lg-6 my-lg-5">

                                        <div className="card-body  p-md-1 p-lg-5 mx-md-4 mt-5">

                                            <ReactLinkContextProvider>

                                                {!email && <ResetPasswordSendEmail />}
                                                {email && <ChangePassword />}


                                            </ReactLinkContextProvider>

                                        </div>

                                    </div>

                                    <div className="col-lg-6 d-lg-flex d-none">

                                        <div className="d-lg-flex d-none">

                                            <div className="text-center">

                                                <img className="img-fluid rounded-3 h-100" src={loginPhoto} alt="Login Image" />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


        </div>


    )

}

export default ResetPassword