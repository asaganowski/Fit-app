import React,{useState} from "react";

import './RecipeDetail.scss';
import {Button} from 'react-bootstrap';
import { useGetRecipesByIdQuery, useGetTagsQuery, useGetSimilarRecipesByIdQuery } from "../../services/getRecipes";
import ListGroup from 'react-bootstrap/ListGroup';
import PieChart from "./PieChart";
import Loading from "../Loading/Loading"
import ShortVersionCard from "./ShortVersionCard"
import { useParams } from "react-router-dom";
import{
    FaUsers,
    FaTwitter,
    FaTelegram,
    FaFacebook,
} from "react-icons/fa"
import { 
    RiRestaurant2Fill,
    RiMailLine,
    RiUserStarLine,
    RiTimeLine
} from "react-icons/ri";




export default function RecipeDetail(){

    let {recipeId} = useParams();
    const [readMore,setReadMore]=useState(false);
    //console.log(recipeId)
    const {data:tags}=useGetTagsQuery()
    const {data, isFetching} = useGetRecipesByIdQuery(recipeId)
    const {data:similarRecipes, isFetching: fetching} = useGetSimilarRecipesByIdQuery(recipeId)


    console.log(tags)

    
    if (isFetching || fetching) return <Loading />;

    const recipe = data?.feed[0]
    
  const linkName=readMore ? 'Read Less << ':' Read More >> '
  const moreIngredients=<ListGroup>{recipe?.content?.ingredientLines.slice(7).map((ingredients,index) => {
               
               return (
           
                       <ListGroup.Item key={index}><input type="checkbox"/>{ingredients.ingredient.toString().charAt(0).toUpperCase()+ingredients.ingredient.slice(1)}</ListGroup.Item>
   
                   
                   )
           })}
  </ListGroup>

    const rand=Math.floor(Math.random() * 11);//to avoid showing same, similar recipes, all the time :/


  const cuisineIcon = tags?.["en-US"]?.cuisine?.find((data)=>{
    return data?.description===recipe?.content?.tags?.cuisine?.[0]?.["display-name"]
    })?.imageUrl

  const cuisine = cuisineIcon ? 
    <img src={cuisineIcon} alt="cuisine" className="cusinePhoto"/>  
    : <RiRestaurant2Fill/>

    const color= recipe?.content?.reviews?.averageRating > 3.5 ? "green" : "red";



    const URL = recipe?.content?.details?.attribution?.url

    const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${URL}` 

    const telegramURL = `https://telegram.me/share/url?url=${URL}&text=Check out this awesome recipe! Thank me later ;)`

    const twitterURL = `https://twitter.com/share?url=${URL}&text=Check out this awesome recipe! Thank me later ;)`
  
  
  console.log(recipe)

    return (
        <div className="recipeDetail-wrapper">
            <div className="recipeDetail-content">
                
                <h1 className="title special-text"> {recipe?.display.displayName}</h1>

                <div className="image-and-info">
                    
                    <div className="meal-image">
                        <img src={recipe?.display?.images} alt="meal"/>
                    </div>
                    <div className="info-and-share">

                        <div className="info">
                            <div className="quick-info">
                                <FaUsers/>
                                <p className="text">{recipe?.content?.details?.numberOfServings}</p>
                            </div>

                            <div className="quick-info">
                                <RiTimeLine/>
                                <p className="text">{recipe?.content?.details?.totalTime}</p>

                            </div>

                            {recipe?.content?.tags.cuisine!==undefined && 
                                <div className="quick-info">
                                    {cuisine}
                                    <p className="text">{recipe?.content?.tags?.cuisine[0]["display-name"]}</p>
                                </div>
                            }

                            {recipe?.content?.reviews?.averageRating!==null &&
                                <div className="quick-info" style={{color:color}}>
                                    <RiUserStarLine/>
                                    <p className="text">{recipe?.content?.reviews?.averageRating?.toFixed(2)}/5</p>
                                </div>
                            }

                        </div>

                        <div className="shareVia">
                            <h5 className="special-text">Share via:</h5>
                            <div className="share-links">

                                <a href={twitterURL} className="shareBtn twitter">
                                    <FaTwitter/> Twitter
                                </a>

                                <a href={facebookURL} className="shareBtn facebook">
                                    <FaFacebook/> Facebook
                                </a>

                                <a href={telegramURL} className="shareBtn telegram">
                                    <FaTelegram/> Telegram
                                </a>

                                <a href="mailto:?subject=Great Recipe!&body=Check out this awesome recipe! Thank me later ;)" className="shareBtn mail">
                                    <RiMailLine/> Email
                                </a>
                            </div>

                        </div>

                    </div>
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
                                            key={index}
                                            >
                                
                                            <ListGroup.Item><input type="checkbox"/>&emsp;
                                                {ingredients.ingredient.toString().charAt(0).toUpperCase()+ingredients.ingredient.slice(1)}
                                            </ListGroup.Item>
                        
                                        </ListGroup>
                                        )
                                })}
                                
                                {readMore && moreIngredients}

                                {recipe?.content?.ingredientLines.length>8 &&
                                    <button 
                                        type="button"
                                        onClick={()=>{setReadMore(!readMore)}}
                                        >{linkName}
                                    </button>
                                }
      
                                                 
            
                            </div>

                        </div>

                        
                    
                </div> 

                <a 
                    href={recipe?.content?.details?.attribution?.url}
                    target="_blank" 
                    rel="noreferrer"
                    className="link-to-page"
                    >   
                        <Button variant="warning">Did you like it? Click to see full recipe and instructions!</Button>
                </a>
                
            </div>  
            <div className="similarRecipesCards-wrapper" >

                <h2 className="similarRecipesCards-header" >Check out some other, similar recipes: </h2>

                <div className="similarRecipesCards-content">

                    {similarRecipes?.feed?.slice(rand,rand+4).map((recipes, index) => {
                        
                        return(
                            <ShortVersionCard recipe={recipes} key={index}/>
                        )})}
                </div>
                
            </div>

        </div>
        
    )
}