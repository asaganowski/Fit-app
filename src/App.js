import React from "react";
import {
  Route,
  Routes,
  HashRouter  
} from "react-router-dom";
import Home from "./components/Home/Home";
import Recipes from "./components/Recipes/Recipes";
import Navbar from "./components/Navbar/Navbar";
import Exercises from "./components/Exercises/Exercises";
import './App.scss';
import Footer from "./components/Footer/Footer";
import RecipeDetail from "./components/Recipes/RecipeDetail"
import ScrollToTop from "./components/ScrollToTop";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  

    return (
      <div className="page">
      <HashRouter>
        
        <Navbar/>
        
        <div className="content">
        <ScrollToTop>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route path='/recipes' element={<Recipes />}/>
            <Route path='/exercises' element={<Exercises />}/>
            <Route path="/recipeDetails/:recipeId" element={<RecipeDetail />}/>
            
          </Routes>
        </ScrollToTop>
          
          </div>

          <Footer/>

      </HashRouter>
      
      </div>
    );
    
    
   }
  

