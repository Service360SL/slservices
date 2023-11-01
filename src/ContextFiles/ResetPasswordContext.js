import react, { createContext, useState } from "react";

export const ResetPasswordContext = createContext(undefined)

const ResetPasswordContextProvider = (props) => {

    const [email, setEmail] = useState(null)

    const [data, setData] = useState(null)

    const addData = (otp, newPassword) => {

        setData(

            {

                otp: otp,
                newPassword: newPassword

            }

        )

    }

    const addEmail = (email) => {

        setEmail(email)

    }

    return (

        <ResetPasswordContext.Provider value={{ email, addEmail, addData }}>

            {props.children}

        </ResetPasswordContext.Provider>

    )

}

export default ResetPasswordContextProvider