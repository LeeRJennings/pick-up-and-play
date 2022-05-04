import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { AllGames } from "./games/AllGames";
import { EditGameForm } from "./games/EditGameForm";
import { GameForm } from "./games/GameForm";
import { MyGames } from "./games/MyGames";
import { PreviousGames } from "./games/PreviousGames";
import { MyPreviousGames } from "./games/MyPreviousGames";

export const ApplicationViews = ({ isAuthenticated, setAuthUser }) => {
    const PrivateOutlet = () => {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateOutlet />} >
                    <Route path="/" element={<AllGames />} />
                    <Route path="/pastGames" element={<PreviousGames />} />
                    <Route path="/myGames" element={<MyGames />} />
                    <Route path="/myPastGames" element={<MyPreviousGames />} />
                    <Route path="/create" element={<GameForm />} />
                    <Route path="/:gameId/edit" element={<EditGameForm />} />
                </Route>

                <Route path="/login" element={<Login setAuthUser={setAuthUser}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}