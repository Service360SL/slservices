import React from 'react'
import ReactLinkContextProvider from '../../ContextFiles/ReactLinkContext'
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider'
import SpSignUP from './ServiceProviderSignUP'

function ServiceProviderSignupContextProviderInterface() {
    return (
        <>

            <AuthenticationContextProvider>

                <ReactLinkContextProvider>

                    <SpSignUP />

                </ReactLinkContextProvider>

            </AuthenticationContextProvider>

        </>
    )
}

export default ServiceProviderSignupContextProviderInterface