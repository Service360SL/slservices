import react, { createContext, useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Route } from 'react-router-dom';
import axios from "axios";


export const AuthenticationContext = createContext(undefined)


const AuthenticationContextProvider = (props) => {

    const navigate = useNavigate()

    const serverLink = 'http://localhost:8080'

    const [authenticated, setAuthenticated] = useState(false);


    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const customerSignUp = (data) => {
        setLoading(true);

        axios
            .post(serverLink + "/auth/signup/customer", data)
            .then((response) => {
                console.log(response.data);
                alert("Please verify your email!!!");
                window.location.href = "http://localhost:3000/login";
            })
            .catch(() => {
                alert("Check the credentials for the customers!!!");
            })
            .finally(() => {
                setLoading(false); // Set loading to false whether the request succeeds or fails.
            });
    }

    const serviceProviderSignUp = (data) => {

        setLoading3(true);

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('nic', data.nic);
        formData.append('address', data.address);
        formData.append('phonenumber', data.phonenumber);
        formData.append('district', data.district);
        formData.append('city', data.city);
        formData.append('categories', data.categories);
        formData.append('services', data.services);

        console.log(data.files);

        for (let i = 0; i < data.files.length; i++) {
            formData.append('files', data.files[i]);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.post(serverLink + '/auth/signup/serviceprovider', formData).then(

            (response) => {

                console.log(response.data);
                alert("Please verify your email!!!")
                window.location.href = "http://localhost:3000/login"

            }

        ).catch(

            () => { alert("Check the Credentials For ServiceProvider!!!") }

        )
        .finally(() => {
            setLoading3(false); 
        });

    }

    const advertiserSignUp = (data) => {

        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('firstname', data.firstname);
        formData.append('lastname', data.lastname);
        formData.append('nic', data.nic);
        formData.append('address', data.address);
        formData.append('phonenumber', data.phonenumber);
        formData.append('shopaddress', data.shopaddress);
        formData.append('shopname', data.shopname);

        console.log(data.files);

        for (let i = 0; i < data.files.length; i++) {
            formData.append('files', data.files[i]);
        }

        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        setLoading2(true);

        axios.post(serverLink + '/auth/signup/advertiser', formData).then(

            (response) => {

                console.log(response.data);
                alert("Please verify your email!!!")
                window.location.href = "http://localhost:3000/login"
            }

        ).catch(

            () => { alert("Check the Credentials For Advertiser!!!") }

        ).finally(() => {
            setLoading2(false);
        });

    }

    const login = (email, password) => {
        axios.post(serverLink + '/auth/login', { email: email, password: password })
            .then((response) => {
                const token = response.data.token;
                getUserDetailsAfterAuthenticated(email, token);

            })
            .catch((error) => {
                if (error.response) {
                    console.error(error.response.data.message);
                    alert("Invalid Credentials!!! OR Please Verify Your Email!!!");
                } else if (error.request) {
                    console.error(error.request);
                    console.log("hello Hi")
                    alert(error.request);
                } else {
                    console.error('Error', error.message);
                    console.log("hello Hi Hello")
                    alert(error.message);
                }
            });
    }


    const getUserDetailsAfterAuthenticated = async (email, token) => {

        axios.get(serverLink + '/auth/login/' + email).then(

            (response) => {
                // authenticated = true;
                setAuthenticated(true);
                storeSessionJWT(response.data, token);
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('role', response.data.role);
                // console.log(authenticated);
                if (response.data.role === 'CUSTOMER') navigate("/customer");
                else if (response.data.role === 'ADMIN') navigate("/admin");
                else if (response.data.role === 'SERVICEPROVIDER') navigate("/ServiceProvider");
                else if (response.data.role === 'ADVERTISER') navigate("/Advertiser");

            }

        ).catch(

            () => {

                alert("User Not Found!!!")

            }

        )

    }

    const setupAxiosInterceptors = (token) => {

        axios.interceptors.request.use(

            (config) => {

                if (authenticated) {

                    config.headers.authorization = token;

                }
                return config;

            }

        )

    }

    const storeSessionJWT = (userdetails, token) => {

        sessionStorage.setItem('authenticatedUser', JSON.stringify(userdetails));
        setupAxiosInterceptors(createJWTToken(token));
    }

    const createJWTToken = (token) => {
        return 'Bearer ' + token;
    }

    const logout = () => {
        navigate("/login");
        sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('role');
        // authenticated = false;
        setAuthenticated(false);
        console.log("Logged out successfully!!!")

    }

    return (

        <AuthenticationContext.Provider value={{ authenticated, login, logout, customerSignUp, advertiserSignUp, serviceProviderSignUp, loading, loading2, loading3 }}>
            {props.children}
        </AuthenticationContext.Provider>

    );
};

export default AuthenticationContextProvider
