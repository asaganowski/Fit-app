import React from "react";
import "./Home.scss"
import Recipes from "../Recipes/Recipes";
import ExercisesHome from "../Exercises/ExercisesHome"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home(){

    return (
      <div className="home-wrapper">

        <h2 className="header">Some interesting recipes:</h2>

        <Recipes homeView />

      
        <h2 className="header">Enjoy random exercises!</h2>
        
          
        <ExercisesHome />
          
        
      </div>
    );
  }

 