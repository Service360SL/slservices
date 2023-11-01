import React from 'react'
import ReactLinkContextProvider from '../../ContextFiles/ReactLinkContext'
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider'
import AdvertiserSignUp from './AdvertiserSignUP'

const advertiserSignupContextProviderInterface = () => {

    return (

        <>

            <AuthenticationContextProvider>

                <ReactLinkContextProvider>

                    <AdvertiserSignUp />

                </ReactLinkContextProvider>

            </AuthenticationContextProvider>

        </>

    )

}

export default advertiserSignupContextProviderInterface