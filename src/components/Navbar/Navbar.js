import React, {useState} from "react";
import {
  NavLink,
  Link
} from "react-router-dom";
import "./Navbar.scss";



export default function Navbar() {

  const [mobileActivity, setMobileActivity] = useState("inactive");

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
        
        </ul>

      </div>

    </div>
  );


}