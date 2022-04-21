import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AllGames } from "./games/AllGames";

export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {
    const PrivateOutlet = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                    <Route path="/" element={<AllGames />} />
                </Route>
                <Route path="/login" element={<Login setAuthUser={setAuthUser}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}