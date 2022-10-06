import React, {useState} from "react";
import {
  NavLink,
  Link
} from "react-router-dom";
import LoginBtn from "./LoginBtn";
import "./Navbar.scss";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutBtn from "./LogoutBtn";


export default function Navbar() {

  const [mobileActivity, setMobileActivity] = useState("inactive");
  const {isAuthenticated } = useAuth0()

  function toggleMenu() {
    mobileActivity === "active" ? setMobileActivity("inactive") : setMobileActivity("active");
      
  }

  return (

    <div className="navbar-wrapper">
      <div className="navbar-content">

        <Link to="/"> 
            <h3 className="appName">Fitt-App</h3>
        </Link>

        
        
        <i className="fas fa-bars mobile-menu" onClick={toggleMenu}/>
        

          
        <ul className={`header ${mobileActivity}`} >
          
          <li><NavLink to="/" onClick={() => setMobileActivity("inactive")}>Home</NavLink></li>
            
          <li><NavLink to="/exercises" onClick={() => setMobileActivity("inactive")}>Exercises</NavLink></li>

          <li><NavLink to="/recipes" onClick={() => setMobileActivity("inactive")}>Recipes</NavLink></li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </>
        ) : (
          <li>
            <LoginBtn />
          </li>
        )}
        
        </ul>

      </div>

    </div>
  );


}