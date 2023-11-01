import { createContext } from "react";

export const ReactLinkContext = createContext(undefined)

const ReactLinkContextProvider = (props) => {

    const LoginLink = '/login'
    const CustomerSignUpLink = '/signup/customer'
    const ServiceProviderSignUpLink = '/signup/serviceProvider'
    const AdvertiserSignUpLink = '/signup/advertiser'
    const ResetPasswordLink = '/ResetPassword'


    return (

        <ReactLinkContext.Provider value={{ LoginLink, CustomerSignUpLink, ServiceProviderSignUpLink, AdvertiserSignUpLink, ResetPasswordLink }}>

            {props.children}

        </ReactLinkContext.Provider>

    )

}

export default ReactLinkContextProvider