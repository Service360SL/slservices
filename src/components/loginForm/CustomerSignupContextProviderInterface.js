import React from 'react'
import ReactLinkContextProvider from '../../ContextFiles/ReactLinkContext'
import AuthenticationContextProvider from '../../ContextFiles/Authentication/AuthenticationContextProvider'
import CustomerSignUP from './CustomerSignUP'

const CustomerSignupContextProviderInterface = () => {

    return (

        <>

            <AuthenticationContextProvider>

                <ReactLinkContextProvider>

                    <CustomerSignUP />

                </ReactLinkContextProvider>

            </AuthenticationContextProvider>

        </>

    )

}

export default CustomerSignupContextProviderInterface