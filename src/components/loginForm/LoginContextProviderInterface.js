import React from 'react'
import Login from "./Login";
import ReactLinkContextProvider from '../../ContextFiles/ReactLinkContext'
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider'

const LoginContextProviderInterface = () => {

    return (

        <>

            <AuthenticationContextProvider>

                <ReactLinkContextProvider>

                    <Login />

                </ReactLinkContextProvider>

            </AuthenticationContextProvider>

        </>

    )

}

export default LoginContextProviderInterface