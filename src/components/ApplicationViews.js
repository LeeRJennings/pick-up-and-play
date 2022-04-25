import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AllGames } from "./games/AllGames";
import { GameForm } from "./games/GameForm";
import { MyGames } from "./games/MyGames";

export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {
    const PrivateOutlet = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                    <Route path="/" element={<AllGames />} />
                    <Route path="/create" element={<GameForm />} />
                    <Route path="/myGames" element={<MyGames />} />
                </Route>

                <Route path="/login" element={<Login setAuthUser={setAuthUser}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}