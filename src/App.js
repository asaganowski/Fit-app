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
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./components/Profile/Profile";


export default function App() {

  const {isAuthenticated} = useAuth0()

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
            {isAuthenticated && <Route path="/profile" element={<Profile />}/>}
            
          </Routes>
        </ScrollToTop>
          
          </div>

          <Footer/>

      </HashRouter>
      
      </div>
    );
    
    
   }
  

