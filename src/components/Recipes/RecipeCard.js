import React from "react";
import './RecipeCard.scss';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import  PieChart  from "./PieChart";



export default function RecipeCard({recipe}){


  //console.log(recipes)
 const color= recipe?.content?.reviews?.averageRating > 3.5 ? "rgb(58, 214, 84)" : "red" 
  
    
    return (
      

        <Link 
          to={`/recipeDetails/${recipe?.content.details.id}`}
          className="recipeCards"
          >
          <Card>
            <Card.Img variant="left" src={recipe?.display.images} alt="mealImage"/>
            <Card.Body >
              <Card.Title>{recipe?.display.displayName}</Card.Title>
              
              <div className="recipeCard-info">

                <div className="pieChart-side">

                    <PieChart recipe={recipe} legendDisplay={false} titleDisplay={true}/>

                </div>

                <div className="shortInfo-side">
                  <p>{recipe?.content?.details?.totalTime}</p>  
                  
                  {recipe?.content?.tags.cuisine!==undefined &&
                  <p>{recipe?.content?.tags?.cuisine[0]["display-name"]}</p>}

                  <p>Servings: {recipe?.content?.details?.numberOfServings}</p>

                  {recipe?.content?.reviews?.averageRating!==null &&
                  
                    <p className="ratings" style={{color: color}}>
                      <i className="ri-user-star-line"/> 
                      <span>{recipe?.content?.reviews?.averageRating?.toFixed(2)}/5</span></p>
                  }
                </div>

                    
              </div>
              
              
            </Card.Body>
          
          </Card>
        </Link>
        
      
    );
  }