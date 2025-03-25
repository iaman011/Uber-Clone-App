// to make it authorize to only only login for captain

import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)  // Access captain context to store authenticated user data
    const [ isLoading, setIsLoading ] = useState(true)  // Loading state to indicate authentication in progress




         // Function to validate the token and fetch captain profile
    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
        }

        // ham 2ono case mein user nd captain ke authentication ke liye token ka use kr rhe hai while login as captain they still generate tokem and make us login but as a user we are not authorise to login so for that ,

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {  
                setCaptain(response.data.captain)   // Store authenticated captain's data
                setIsLoading(false)
            }
        })
        .catch((error) => {  
            // Jab bhi API request fail hogi (jaise token invalid hai ya expire ho gaya hai), ye block execute hoga
            console.error('Authentication failed:', error.message); // Error ko console par print karna helpful hoga debugging ke liye
        
            localStorage.removeItem('token'); // Agar token invalid hai, use storage se hata dena chahiye
        
            navigate('/captain-login'); // Captain user authorized nahi hai, isliye login page par redirect kar do
        });
        
    })

    
    
    // Show a loading message while authentication is being verified
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        // Render children if authentication is successful
        <>
            {children}   
        </>
    )
}

export default CaptainProtectWrapper