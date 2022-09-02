import React from "react";

import './RecipeDetail.scss';
import {Button} from 'react-bootstrap';
import { useGetRecipesByIdQuery, useGetSimilarRecipesByIdQuery } from "../../services/getRecipes";
import ListGroup from 'react-bootstrap/ListGroup';
import PieChart from "./PieChart";
import Loading from "../Loading/Loading"
import SimilarRecipesCard from "./SimilarRecipesCard"
import { useParams } from "react-router-dom";


export default function RecipeDetail(){

    let {recipeId} = useParams();

    //console.log(recipeId)

    const {data, isFetching} = useGetRecipesByIdQuery(recipeId)
    const {data:recipes, isFetching: fetching} = useGetSimilarRecipesByIdQuery(recipeId)

    console.log(data)

    
    if (isFetching) return <Loading />;
    if (fetching) return <Loading />;

    const recipe = data?.feed[0]


  const rand=Math.floor(Math.random() * 15) - 4;//to avoid showing same, similar recipes, all the time :/
    
   
    return (
        <div className="recipeDetail-wrapper">
            <div className="recipeDetail-content">

                <div className="mealImage-side">
                    <img src={recipe?.display?.images} className="mealImage" alt="meal"/>

                    <a 
                        href={recipe?.display?.source?.sourceRecipeUrl}
                        target="_blank" 
                        rel="noreferrer"
                    >   
                        <Button variant="link">Did you like it? Click to see full recipe and instructions!</Button>
                    </a>
                    
                </div>

                
                <div className="recipe-info">

                <h1 className="title special-text"> {recipe?.display.displayName}</h1>

                    <div className="shortInfo">
                            <span>Servings: {recipe?.content?.details?.numberOfServings} </span>
                        &emsp; 
                            <span>Total Time: {recipe?.content?.details?.totalTime}</span> 
                        &emsp; 
                            {recipe?.content?.tags.cuisine!==undefined &&
                                <span>Cuisine: {recipe?.content?.tags?.cuisine[0]["display-name"]}</span>}
                    </div>
                    <div className="chart-and-ingredients">    

                        <div className="chart-side">
                            <div className="chart">

                                <PieChart recipe={recipe} legendDisplay={true} titleDisplay={false}/>
                                
                            </div>
                    
                        </div>

                        <div className="ingredients-side">
                            
                            <div className="ingredientsList">
                                <h4 className="ingredients-title  special-text">Ingredients:</h4>
                                {recipe?.content?.ingredientLines.slice(0,7).map((ingredients, index) => {
                    
                                    return (
                                        <ListGroup 
                                            className="list-group"
                                            key={index}
                                            >
                                
                                            <ListGroup.Item>
                                                {ingredients.ingredient.toString().charAt(0).toUpperCase()+ingredients.ingredient.slice(1)}
                                            </ListGroup.Item>
                        
                                        </ListGroup>
                                        )
                                })}
                                
                                
                                {recipe?.content?.ingredientLines.length>8 &&
                                    <p className="extraIngredients">And {recipe?.content?.ingredientLines.length-7} more</p>
                                }                  
            
                            </div>

                        </div>

                        
                    </div>
                </div> 
            </div>  
            <div className="similarRecipesCard-wrapper" >

                <h2 className="similarRecipesCard-header" >Check out some other, similar recipes: </h2>

                <div className="similarRecipesCard-content">

                    {recipes?.feed?.slice(rand,rand+4).map((recipes, index) => {
                        
                        return(
                            <SimilarRecipesCard recipe={recipes} key={index}/>
                    )})}
                </div>
            </div>
        </div>
        
    )
}