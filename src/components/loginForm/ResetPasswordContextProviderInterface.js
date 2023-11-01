import React from 'react'
import ResetPasswordContextProvider from "../../ContextFiles/ResetPasswordContext";
import ResetPassword from "./ResetPassword";

const ResetPasswordContextProviderInterface = () => {

    return (

        <div>

            <ResetPasswordContextProvider>

                <ResetPassword />

            </ResetPasswordContextProvider>

        </div>

    )

}

export default ResetPasswordContextProviderInterface