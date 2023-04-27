import { createContext, useEffect, useState } from 'react';
import Axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const signup = async(username, password) => {
        const res = Axios.post("/signup", {
            username,
            password
            });
            setCurrentUser(res.data);
    };

    const login = async(username, password) => {
        const res = await Axios.post("/login", {
            username,
            password,
          });
        setCurrentUser(res.data);
    };

    const logout = async(username, password) => {
        await Axios.post("/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, signup, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};