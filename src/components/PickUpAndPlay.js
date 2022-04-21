import React, {useState} from "react"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"

export const PickUpAndPlay = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("puap_user") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("puap_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("puap_user") !== null)
    }
    
    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("puap_user") !== null)
      }
    
return (
  <>
  <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
  <ApplicationViews setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}/>
  </>
)}