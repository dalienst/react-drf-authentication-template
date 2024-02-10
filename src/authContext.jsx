/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import axios from "./api/axios";
import { publicLinks, urls } from "./constants/links";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const tokensLocalStorage = JSON.parse(localStorage.getItem("tokens"));
    const onLoadTokens = tokensLocalStorage ? tokensLocalStorage : null;
    const decodedToken = tokensLocalStorage
        ? jwtDecode(tokensLocalStorage.access)
        : null;
    const [user, setUser] = useState(() => decodedToken);
    const [tokens, setTokens] = useState(() => onLoadTokens);


    const loginUser = async (inputs) => {
        const response = await axios.post(urls.LOGIN, inputs)
        setTokens(response.data);
        const userID = jwtDecode(response.data.access);
        setUser(userID);
        localStorage.setItem("tokens", JSON.stringify(response.data));
    }

    const logout = () => {
        localStorage.removeItem("tokens");
        setTokens(null);
        setUser(null);
    }

    const updateUser = async () => {
        try {
            const response = await axios.post(urls.REFRESH, {
                refresh: tokens.refresh,
            });
            setTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem("tokens", JSON.stringify(response.data));
        } catch (error) {
            // Handle errors, e.g., redirect to login page
            <Navigate to={publicLinks.Login} replace />
        }
    };

    useEffect(() => {
        if (tokens) {
            updateUser();
        }
    }, [tokens]);

    return (
        <AuthContext.Provider value={{ user, loginUser, tokens, logout }}>{children}</AuthContext.Provider>
    )
}