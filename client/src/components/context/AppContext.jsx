import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();


export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [userData, setUserData] = useState(false);

// ============= GetData =========

const getUserData = async() => {
    try {
        axios.defaults.withCredentials = true; 
        const {data} = await axios.get(backendUrl + '/api/user/data')
        
        if (data.success) {
            setUserData(data.userData)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        // ✅ Fixed - error.response?.data?.message instead of data.message
        toast.error(error.response?.data?.message || 'Failed to fetch user data');
        console.log(error); // For debugging
    }
}


    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>

    )

}